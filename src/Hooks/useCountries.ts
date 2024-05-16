import React from "react";
import { Country } from "../Types/Country";
import data from "../Assets/countries.json";
import { Continent } from "../Types/Continent";
import { SettingsContext } from "../Providers/SettingsProvider";

const continents: Continent[] = data;

const useCountries = (): [boolean, Country[], VoidFunction] => {
    const settingsContext = React.useContext(SettingsContext);
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [countriesLoaded, setCountriesLoaded] = React.useState(false);

    const refetchCountries = React.useCallback(() => {
        setCountriesLoaded(false);

        setCountries(continents.filter(c => !settingsContext.excludedContinents.includes(c.name)).flatMap(c => c.countries));

        setCountriesLoaded(true);
    }, [settingsContext.excludedContinents]);

    React.useEffect(() => {
        refetchCountries();
    }, [refetchCountries]);

    return [countriesLoaded, countries, refetchCountries];
};

export default useCountries;