import { CircularProgress } from "@mui/material";
import { CountryContext } from "../../Providers/CountryProvider";
import React from "react";
import { Country } from "../../Types/Country";
import { isNil, toLower } from "lodash";
import FindByDisplay from "./FindByDisplay";
import CountryData from "../../Components/CountryData";
import CapitalData from "../../Components/CapitalData";
import { FindByRound } from "../../Types/Setting";

const rounds = Object.keys(FindByRound).length;

function App(){
    const [country, setCountry] = React.useState<Country>();
    const [round, setRound] = React.useState(0);

    const countries = React.useContext(CountryContext);

    const refetchCountry = React.useCallback(() => {
        setCountry(countries[~~(Math.random() * countries.length)]);
    }, [countries]);

    React.useEffect(() => {
        refetchCountry();
    }, [refetchCountry]);

    const label = React.useMemo(() => {
        switch(round){
            case 0:
                return "What country is this?";
            case 1:
                return `What is the capital of ${country!.name}?`;
            default:
                return "";
        }
    }, [country, round]);

    const solution = React.useMemo(() => {
        switch (round) {
            case 0:
                return country?.name;
            case 1:
                return country?.capital?.name;
        }
    }, [country, round]);

    const filterCountries = React.useCallback((guess: string, name?: string, alternativeNames?: string[]) => {
        const names = [];

        if (!isNil(name)) {
            names.push(name);
        }

        if (!isNil(alternativeNames)) {
            names.push(...alternativeNames);
        }

        return names.map(toLower).includes(guess.toLowerCase());
    }, []);

    const determineGuessedCountry = React.useCallback((guess: string, country: Country) => {
        let validCountries = [];

        switch (round) {
            case 0:
                validCountries = countries.filter(c => filterCountries(guess, c.name, c.alternativeNames));

                break;
            default:
                validCountries = countries.filter(c => filterCountries(guess, c.capital?.name, c.capital?.alternativeNames));

                break;
        }
        
        if (validCountries.length > 1) {
            return validCountries.find(c => c.name === country.name);
        }

        return validCountries[0];
    }, [countries, round]);

    const guessDisplayFormatter = React.useCallback((guessedCountries: Country[]) => {
        switch(round){
            case 0:
                return guessedCountries.map(c => <CountryData sourceCountry={ c } targetCountry={ country! } key={ c.countryCode } />);
            case 1:
                return guessedCountries.map(c => <CapitalData country={ c } key={ c.countryCode } />)
        }
    }, [country, round]);
    
    const nextRound = React.useCallback(() => {
        if(round === rounds - 1){
            refetchCountry();
            setRound(0);

            return;
        }
        
        setRound(round + 1);
    }, [round, refetchCountry]);

    if (isNil(country)) {
        return <CircularProgress />;
    }

    return (
        <FindByDisplay
            label={ label }
            solution={ solution }
            country={ country }
            determineGuessedCountry={ determineGuessedCountry }
            guessDisplayFormatter={ guessDisplayFormatter }
            round={ round }
            nextRound={ nextRound }
        />
    );
}

export default App;