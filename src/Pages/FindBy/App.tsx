import { CircularProgress } from "@mui/material";
import { CountryContext } from "../../Providers/CountryProvider";
import React from "react";
import { Country } from "../../Types/Country";
import { isNil } from "lodash";
import FindByDisplay from "./FindByDisplay";
import CountryData from "../../Components/CountryData";
import CapitalData from "../../Components/CapitalData";

function App(){
    const [country, setCountry] = React.useState<Country>();

    const countries = React.useContext(CountryContext);
    const [round, setRound] = React.useState(0);

    const refetchCountry = React.useCallback(() => {
        setCountry(countries[~~(Math.random() * countries.length)]);
    }, [countries]);

    React.useEffect(() => {
        refetchCountry();
    }, [refetchCountry]);

    React.useEffect(() => {
        setRound(0);
    }, [country]);

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
        if(isNil(country)){
            return "";
        }

        switch(round){
            case 0:
                return country.name;
            case 1:
                return country.capital?.name;
        }
    }, [country, round]);

    const determineGuessedCountry = React.useCallback((guess: string) => {
        switch(round){
            case 0:
                return countries.find(country => country.name!.toLowerCase() === guess.toLowerCase() || country.alternativeNames.map(n => n.toLowerCase()).includes(guess.toLowerCase()));
            case 1:
                return countries.find(country => country.capital!.name.toLowerCase() === guess.toLowerCase());
        }
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
        setRound(round + 1);
    }, [round]);

    if(isNil(country)){
        return <CircularProgress />;
    }

    return (
        <FindByDisplay
            label={ label }
            solution={ solution }
            country={ country }
            determineGuessedCountry={ determineGuessedCountry }
            getNewCountry={ refetchCountry }
            guessDisplayFormatter={ guessDisplayFormatter }
            round={ round }
            rounds={ 2 }
            nextRound={ nextRound }
        />
    );
}

export default App;