import React from "react";
import { Country } from "../Types/Country";
import data from "../Assets/countries.json";
import { Continent } from "../Types/Continent";
import { SettingsContext } from "../Providers/SettingsProvider";
import { isNil } from "lodash";

const continents: Continent[] = data;

const useCountries = (): Country[] => {
    const settingsContext = React.useContext(SettingsContext);

    const countries = React.useMemo(() => {
        const filteredCountries = continents.filter(c => !settingsContext.excludedContinents.includes(c.name)).flatMap(c => c.countries);

        const translatedCountries = filteredCountries.map((c): Country => {
            const translation = c.translations.find(t => t.language === settingsContext.language);

            const country = { ...c };

            if(!isNil(translation)){
                if(!isNil(translation.name)){
                    c.name = translation.name;
                    c.alternativeNames = translation.alternativeNames;
                }
                if(!isNil(translation.capital)){
                    c.capital!.name = translation.capital;
                }
            }

            return country;
        });

        return translatedCountries;
    }, [settingsContext]);

    return countries;
};

export default useCountries;