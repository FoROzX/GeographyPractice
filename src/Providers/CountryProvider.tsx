import React from "react";
import { Country, DatabaseCountry } from "../Types/Country";
import { SettingsContext } from "./SettingsProvider";
import { Continent } from "../Types/Continent";
import continents from "../Assets/countries.json";
import { isNil } from "lodash";

export const CountryContext = React.createContext<Country[]>([]);

type Props = {
    children: React.ReactNode;
};

function CountryProvider({ children }: Props){
    const settingsContext = React.useContext(SettingsContext);

    const filteredCountries: DatabaseCountry[] = React.useMemo(() => {
        return (continents as Continent[]).filter(continent => !settingsContext.excludedContinents.includes(continent.name)).flatMap(continent => continent.countries);
    }, [continents, settingsContext.excludedContinents]);

    const translatedCountries: Country[] = React.useMemo(() => {
        return filteredCountries.map((country): Country => {
            const translation = country.translations.find(t => t.language === settingsContext.language);

            const translatedCountry = { ...country };

            if(!isNil(translation)){
                if(!isNil(translation.name)){
                    translatedCountry.name = translation.name;
                    translatedCountry.alternativeNames = translation.alternativeNames;
                }
                if(!isNil(translation.capital)){
                    translatedCountry.capital = { ...translatedCountry.capital!, ...translation.capital };
                }
            }

            return translatedCountry;
        });
    }, [filteredCountries, settingsContext.language]);

    return (
        <CountryContext.Provider value={ translatedCountries }>
            { children }
        </CountryContext.Provider>
    );
}

export default CountryProvider;