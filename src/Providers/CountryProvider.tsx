import React from "react";
import { Country } from "../Types/Country";
import { SettingsContext } from "./SettingsProvider";
import { Continent } from "../Types/Continent";
import continents from "../Assets/countries.json";
import { isNil, merge } from "lodash";

export const CountryContext = React.createContext<Country[]>([]);

type Props = {
    children: React.ReactNode;
};

function CountryProvider({ children }: Props){
    const { excludedContinents, language } = React.useContext(SettingsContext);

    const countries: Country[] = React.useMemo(() => {
        const filteredCountries = (continents as Continent[]).filter(c => !excludedContinents.includes(c.name)).flatMap(c => c.countries);

        return filteredCountries.map((country): Country => {
            if (isNil(country.translations) || !(language in country.translations)) {
                return country;
            }

            const translation = country.translations[language];

            return merge({}, country, translation);
        });
    }, [excludedContinents, language]);

    return (
        <CountryContext.Provider value={ countries }>
            { children }
        </CountryContext.Provider>
    );
}

export default CountryProvider;