import { TableCell, TableRow, TextField } from "@mui/material";
import { Country } from "../Types/Country";
import React from "react";
import { SettingsContext } from "../Providers/SettingsProvider";
import { CountryMode, ListMode } from "../Types/Setting";
import { GameState } from "../Types/GameState";

type Props = {
    country: Country;
    gameState: GameState;
};

function ListAllData({ country, gameState }: Props){
    const [guess, setGuess] = React.useState("");

    const settingsContext = React.useContext(SettingsContext);

    const determineCorrectGuess = React.useCallback((value: string) => {
        switch(settingsContext.listMode){
            case ListMode.Country:
                return value.toLowerCase() === country.name.toLowerCase();
            case ListMode.Capital:
                return value.toLowerCase() === country.capital?.name.toLowerCase();
        }
    }, [settingsContext.listMode, country]);

    React.useEffect(() => {
        if(gameState === GameState.Found){
            setGuess(settingsContext.listMode === ListMode.Country ? country.name : country.capital!.name);
        }
    }, [gameState, settingsContext]);

    return (
        <TableRow>
            <TableCell>
                <TextField
                    error={ gameState === GameState.GaveUp || (!determineCorrectGuess(guess) && guess !== "") }
                    disabled={ gameState === GameState.GaveUp || gameState === GameState.Found || determineCorrectGuess(guess) }
                    autoComplete="off"
                    value={ guess }
                    sx={{ width: 400 }}
                    onChange={e => setGuess(e.target.value)}
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