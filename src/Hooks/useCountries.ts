import React from "react";
import { Country } from "../Types/Country";
import data from "../Assets/countries.json";
import { Continent } from "../Types/Continent";

const continents: Continent[] = data;

const useCountries = (continentFilter: string[] = []): [boolean, Country[], () => void] => {
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [countriesLoaded, setCountriesLoaded] = React.useState(false);

    const refetchCountries = React.useCallback(() => {
        setCountriesLoaded(false);

        setCountries(continents.filter(c => continentFilter.length === 0 || continentFilter.includes(c.name)).flatMap(c => c.countries));

        setCountriesLoaded(true);
    }, []);

    React.useEffect(() => {
        refetchCountries();
    }, [refetchCountries]);

    return [countriesLoaded, countries, refetchCountries];
};

export default useCountries;