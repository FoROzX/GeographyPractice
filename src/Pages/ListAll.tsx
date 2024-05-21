import React from "react";
import { CountryContext } from "../Providers/CountryProvider";
import { Table, TableBody } from "@mui/material";
import ListAllData from "../Components/ListAllData";
import { SettingsContext } from "../Providers/SettingsProvider";

function ListAll(){
    const { language } = React.useContext(SettingsContext);

    const countries = React.useContext(CountryContext);

    const randomizedCountries = React.useMemo(() => {
        return countries.sort(() => Math.random() - Math.random());
    }, [countries]);

    React.useEffect(() => {
        console.log(language);
    }, [language]);

    return (
        <Table>
            <TableBody>
                {
                    randomizedCountries.map(country => 
                        <ListAllData
                            country={ country }
                            key={ country.countryCode }
                        />
                    )
                }
            </TableBody>
        </Table>
    );
}

export default ListAll;