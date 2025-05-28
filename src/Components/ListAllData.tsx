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
    validateGuess: (guess: string, country: Country) => boolean;
};

function ListAllData({ country, gameState, validateGuess }: Props){
    const [guess, setGuess] = React.useState("");
    const [error, setError] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const { listMode, countryMode } = React.useContext(SettingsContext);
    
    const solution = React.useMemo(() => listMode === ListMode.Country ? country.name : country.capital!.name, [listMode, country]);

    React.useEffect(() => {
        if (gameState === GameState.GaveUp && !disabled){
            setGuess(solution);
            setDisabled(true);
        }

        if (gameState === GameState.Searching) {
            setGuess("");
            setError(false);
            setDisabled(false);
        }
    }, [gameState]);

    const image = React.useMemo(() =>
        <img 
            src={
                countryMode === CountryMode.Flag ?
                `https://flagcdn.com/${country.countryCode.toLowerCase()}.svg` :
                `https://teuteuf-dashboard-assets.pages.dev/data/common/country-shapes/${country.countryCode.toLowerCase()}.svg`
            }
            style={{ height: 64 }}
        />
    , [countryMode, country.countryCode]);

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
                        if (isEmpty(guess)) {
                            setError(false);

                            return;
                        }

                        const isValid = validateGuess(guess, country);

                        if (!isValid) {
                            setError(true);

                            return;
                        }

                        setDisabled(true);
                        setGuess(solution);
                    }}
                />
            </TableCell>
            <TableCell>
                { image }
            </TableCell>
        </TableRow>
    );
}

export default ListAllData;