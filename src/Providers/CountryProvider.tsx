import React from "react";
import { Country } from "../Types/Country";
import useCountries from "../Hooks/useCountries";

export const CountryContext = React.createContext<Country[]>([]);

type Props = {
    children: React.ReactNode;
};

function CountryProvider({ children }: Props){
    const countries = useCountries();

    return (
        <CountryContext.Provider value={ countries }>
            { children }
        </CountryContext.Provider>
    );
}

export default CountryProvider;