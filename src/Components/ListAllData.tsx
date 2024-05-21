import { TableCell, TableRow, TextField } from "@mui/material";
import { Country } from "../Types/Country";
import React from "react";
import { SettingsContext } from "../Providers/SettingsProvider";
import { CountryMode, ListMode } from "../Types/Setting";

type Props = {
    country: Country;
};

function ListAllData({ country }: Props){
    const [error, setError] = React.useState(false);
    const [disabled, setDisabled] = React.useState(false);

    const settingsContext = React.useContext(SettingsContext);

    const determineCorrectGuess = React.useCallback((value: string) => {
        switch(settingsContext.listMode){
            case ListMode.Country:
                return value.toLowerCase() === country.name.toLowerCase() || country.alternativeNames.map(n => n.toLowerCase()).includes(value.toLowerCase());
            case ListMode.Capital:
                return value.toLowerCase() === country.capital?.name.toLowerCase();
        }
    }, [settingsContext, country]);

    return (
        <TableRow>
            <TableCell>
                <TextField
                    error={ error }
                    disabled={ disabled }
                    autoComplete="off"
                    sx={{ width: 400 }}
                    onChange={() => setError(false)}
                    onBlur={e => {
                        if(e.target.value.trim() === ""){
                            setError(false);
                            return;
                        }

                        const isCorrectGuess = determineCorrectGuess(e.target.value);

                        if(!isCorrectGuess){
                            setError(true);
                            return;
                        }

                        setDisabled(true);
                        e.target.value = settingsContext.listMode === ListMode.Country ? country.name : country.capital!.name;
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