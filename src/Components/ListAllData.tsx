import { TableCell, TableRow, TextField } from "@mui/material";
import { Country } from "../Types/Country";
import React from "react";
import { SettingsContext } from "../Providers/SettingsProvider";
import { CountryMode, ListMode } from "../Types/Setting";
import { isNil } from "lodash";
import { GameState } from "../Types/GameState";

type Props = {
    country: Country;
    gameState: GameState;
};

function ListAllData({ country, gameState }: Props){
    const [guess, setGuess] = React.useState("");
    const [error, setError] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const settingsContext = React.useContext(SettingsContext);

    const determineCorrectGuess = React.useCallback(() => {
        switch(settingsContext.listMode){
            case ListMode.Country:
                return guess.toLowerCase() === country.name.toLowerCase() || country.alternativeNames.map(n => n.toLowerCase()).includes(guess.toLowerCase());
            case ListMode.Capital:
                return guess.toLowerCase() === country.capital?.name.toLowerCase();
        }
    }, [settingsContext, country, guess]);
    
    const correctedValue = React.useMemo(() => {
        return settingsContext.listMode === ListMode.Country ? country.name : country.capital?.name as string;
    }, [settingsContext.listMode, country]);

    React.useEffect(() => {
        if(gameState === GameState.GaveUp && !determineCorrectGuess()){
            setGuess(correctedValue);
            setDisabled(true);
        }
        if(gameState === GameState.Searching){
            setGuess("");
            setError(false);
            setDisabled(false);
        }
    }, [gameState]);

    if(isNil(correctedValue)){
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
                        if(guess.trim() === ""){
                            setError(false);
                            return;
                        }

                        const isCorrectGuess = determineCorrectGuess();

                        if(!isCorrectGuess){
                            setError(true);
                            return;
                        }

                        setDisabled(true);
                        setGuess(correctedValue);
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