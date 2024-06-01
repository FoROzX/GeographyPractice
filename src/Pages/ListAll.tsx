import React from "react";
import { CountryContext } from "../Providers/CountryProvider";
import { Button, Table, TableBody } from "@mui/material";
import ListAllData from "../Components/ListAllData";
import { GameState } from "../Types/GameState";
import { Country } from "../Types/Country";
import { SettingsContext } from "../Providers/SettingsProvider";
import { ListMode } from "../Types/Setting";
import { isNil } from "lodash";

function ListAll(){
    const settingsContext = React.useContext(SettingsContext);
    const countries = React.useContext(CountryContext);

    const [gameState, setGameState] = React.useState(GameState.Searching);
    const [randomizedCountries, setRandomizedCountries] = React.useState<Country[]>([]);

    const randomizeCountries = React.useCallback(() => {
        const randomizedCountries = countries.sort(() => Math.random() - Math.random());

        if(settingsContext.listMode === ListMode.Country){
            setRandomizedCountries(randomizedCountries);

            return;
        }
        
        setRandomizedCountries(randomizedCountries.filter(country => !isNil(country.capital)));
    }, [countries, settingsContext.listMode]);
    
    const determineGuessedCountry = React.useCallback((guess: string) => {
        switch(settingsContext.listMode){
            case ListMode.Country:
                return countries.find(country => country.name!.toLowerCase() === guess.toLowerCase() || country.alternativeNames.map(n => n.toLowerCase()).includes(guess.toLowerCase()));
            case ListMode.Capital:
                return countries.find(country => country.capital?.name.toLowerCase() === guess.toLowerCase() || country.capital?.alternativeNames.map(n => n.toLocaleLowerCase()).includes(guess.toLowerCase()));
        }
    }, [countries, settingsContext.listMode]);

    React.useEffect(() => {
        randomizeCountries();
    }, [randomizeCountries]);

    return (
        <>
            <Table>
                <TableBody>
                    {
                        randomizedCountries.map(country => 
                            <ListAllData
                                country={ country }
                                gameState={ gameState }
                                determineGuessedCountry={ determineGuessedCountry }
                                key={ country.countryCode }
                            />
                        )
                    }
                </TableBody>
            </Table>
            
            <Button
                variant="outlined"
                onClick={() => {
                    if(gameState === GameState.Searching){
                        setGameState(GameState.GaveUp);
                    }
                    else{
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