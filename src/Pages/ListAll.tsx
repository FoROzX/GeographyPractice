import React from "react";
import { CountryContext } from "../Providers/CountryProvider";
import { Button, Table, TableBody } from "@mui/material";
import ListAllData from "../Components/ListAllData";
import { GameState } from "../Types/GameState";
import { Country } from "../Types/Country";
import { SettingsContext } from "../Providers/SettingsProvider";
import { ListMode } from "../Types/Setting";
import { isNil, toLower } from "lodash";
import { City } from "../Types/City";

function ListAll(){
    const { listMode } = React.useContext(SettingsContext);
    const allCountries = React.useContext(CountryContext);

    const countries = React.useMemo(() => listMode === ListMode.Capital ? allCountries.filter(c => !isNil(c.capital)) : allCountries, [allCountries, listMode]);

    const [gameState, setGameState] = React.useState(GameState.Searching);
    const [randomizedCountries, setRandomizedCountries] = React.useState<Country[]>([]);

    const randomizeCountries = React.useCallback(() => setRandomizedCountries(countries.sort(() => 0.5 - Math.random())), [countries, listMode]);

    const getOptions = React.useCallback((value?: Country|City) => {
        if (isNil(value)) {
            return [];
        }

        return [value.name, ...value.alternativeNames ?? []].map(toLower);
    }, []);

    const validateGuess = React.useCallback((guess: string, country: Country) => {
        const options = listMode === ListMode.Capital ? getOptions(country.capital) : getOptions(country);

        return options.includes(guess.toLowerCase());
    }, [listMode]);

    const content = React.useMemo(() => randomizedCountries.map((country, index) =>
        <ListAllData
            country={ country }
            gameState={ gameState }
            validateGuess={ validateGuess }
            key={ index }
        />
    ), [randomizedCountries, gameState, validateGuess]);

    React.useEffect(() => {
        randomizeCountries();
    }, []);

    return (
        <>
            <Table>
                <TableBody>
                    { content }
                </TableBody>
            </Table>
            
            <Button
                variant="outlined"
                onClick={() => {
                    if (gameState === GameState.Searching) {
                        setGameState(GameState.GaveUp);
                    }
                    else {
                        setGameState(GameState.Searching);
                        randomizeCountries();
                    }
                }}
                sx={{ position: "fixed", right: 20, bottom: 10 }}
            >
                { gameState === GameState.Searching ? "Give up" : "Play again" }
            </Button>
        </>
    );
}

export default ListAll;