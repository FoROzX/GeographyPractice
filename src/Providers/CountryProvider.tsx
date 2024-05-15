import React from "react";
import { Country } from "../Types/Country";
import useCountries from "../Hooks/useCountries";

export const CountryContext = React.createContext<[boolean, Country[], () => void]>([false, [], () => {}]);

type Props = {
    children: React.ReactNode;
};

function CountryProvider({ children }: Props){
    const [countriesLoaded, countries, refetchCountries] = useCountries();

    return (
        <CountryContext.Provider value={[ countriesLoaded, countries, refetchCountries ]}>
            { children }
        </CountryContext.Provider>
    );
}

export default CountryProvider;