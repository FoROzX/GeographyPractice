import { TableCell, TableRow, TextField } from "@mui/material";
import { Country } from "../Types/Country";
import React from "react";
import { SettingsContext } from "../Providers/SettingsProvider";
import { CountryMode, ListMode } from "../Types/Setting";
import { isEmpty, isNil } from "lodash";
import { GameState } from "../Types/GameState";

type Props = {
    country: Country;
    gameState: GameState;
    determineGuessedCountry: (guess: string, context?: string) => Country|undefined;
};

function ListAllData({ country, gameState, determineGuessedCountry }: Props){
    const [guess, setGuess] = React.useState("");
    const [error, setError] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const settingsContext = React.useContext(SettingsContext);
    
    const solution = React.useMemo(() => {
        return settingsContext.listMode === ListMode.Country ? country.name : country.capital?.name as string;
    }, [settingsContext.listMode, country]);

    React.useEffect(() => {
        if(gameState === GameState.GaveUp && !disabled){
            setGuess(solution);
            setDisabled(true);
        }
        if(gameState === GameState.Searching){
            setGuess("");
            setError(false);
            setDisabled(false);
        }
    }, [gameState]);

    if(isNil(solution)){
        return <></>;
    }

    return (
        <TableRow>
            <TableCell>
                <TextField
                    value={ guess }
                    error={ error }
                    disabled={ disabled }
                    autoComplete="off"
                    sx={{ width: "20vw" }}
                    onChange={e => {
                        setError(false);
                        setGuess(e.target.value);
                    }}
                    onBlur={() => {
                        if(isEmpty(guess)){
                            setError(false);
                            return;
                        }

                        const guessedCountry = solution === "Kingston" ? determineGuessedCountry(guess, country.name) : determineGuessedCountry(guess);
                        
                        if(isNil(guessedCountry) || guessedCountry.name !== country.name){
                            setError(true);
                            return;
                        }

                        setDisabled(true);
                        setGuess(solution);
                    }}
                />
            </TableCell>
            <TableCell>
                {
                    settingsContext.listMode === ListMode.Country ?
                    <img 
                        src={
                            settingsContext.countryMode === CountryMode.Flag ?
                            `https://flagcdn.com/${country.countryCode.toLowerCase()}.svg` :
                            `https://teuteuf-dashboard-assets.pages.dev/data/common/country-shapes/${country.countryCode.toLowerCase()}.svg`
                        }
                        style={{ height: 64 }}
                    /> :
                    country.name
                }
            </TableCell>
        </TableRow>
    );
}

export default ListAllData;