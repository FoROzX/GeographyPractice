import { Button, CircularProgress, Table, TableBody, TextField } from "@mui/material";
import CountryData from "../Components/CountryData/CountryData";
import React from "react";
import { Country } from "../Types/Country";
import { isNil } from "lodash";
import { CountryContext } from "../Providers/CountryProvider";
import WinDialog, { WinDialogRef } from "../Components/WinDialog";
import { SettingsContext } from "../Providers/SettingsProvider";
import { CountryMode } from "../Types/Setting";

function Practice(){
    const [guess, setGuess] = React.useState<string>("");
    
    const settingsContext = React.useContext(SettingsContext);
    const [countriesLoaded, countries] = React.useContext(CountryContext);

    const [country, setCountry] = React.useState<Country>();
    
    const [guessedCountries, setGuessedCountries] = React.useState<Country[]>([]);
    const [gameOver, setGameOver] = React.useState(false);

    const ref = React.useRef<WinDialogRef>(null);

    const guessedCountry = React.useMemo(() => {
        return countries.find(country => {
            const translation = country.translations.find(translation => settingsContext.language === translation.language);

            const reference = isNil(translation) || isNil(translation.name) ? country : translation;

            return reference.name!.toLowerCase() === guess.toLowerCase() || reference.alternativeNames.map(n => n.toLowerCase()).includes(guess.toLowerCase());
        });
    }, [countries, guess]);

    const onGuess = React.useCallback(() => {
        if(isNil(guessedCountry)){
            // error, no country
            return;
        }

        if(guessedCountries.map(c => c.name).includes(guessedCountry.name)){
            // error, already guessed
            return;
        }

        setGuess("");

        setGuessedCountries([...guessedCountries, guessedCountry]);

        if(guessedCountry.name === country!.name){
            ref.current?.open();
            setGameOver(true);
        }
    }, [guessedCountry, guessedCountries, country]);
    const onGiveUp = React.useCallback(() => {
        ref.current?.open();
        setGameOver(true);
    }, []);
    const refetchCountry = React.useCallback(() => {
        setCountry(countries[~~(Math.random() * countries.length)]);
    }, [countries]);

    React.useEffect(() => {
        setGuess("");
        setGuessedCountries([]);
        setGameOver(false);
    }, [country]);

    React.useEffect(() => {
        refetchCountry();
    }, [refetchCountry]);

    if(isNil(country) || !countriesLoaded){
        return <CircularProgress />;
    }

    return (
        <>
            <WinDialog
                ref={ ref }
                country={ country }
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={
                        settingsContext.countryMode === CountryMode.Flag ?
                        `https://flagcdn.com/${country!.countryCode.toLowerCase()}.svg` :
                        `https://teuteuf-dashboard-assets.pages.dev/data/common/country-shapes/${country!.countryCode.toLowerCase()}.svg`
                    }
                    style={{ height: "30vh" }}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
                <TextField
                    value={ guess }
                    label="Country"
                    variant="outlined"
                    onInput={(e: any) => {
                        setGuess(e.target.value);
                    }}
                    onKeyDown={e => {
                        if(e.code === "Enter"){
                            onGuess();
                        }
                    }}
                    autoComplete="off"
                    disabled={ gameOver }
                />
                {
                    gameOver ?
                    <Button
                        sx={{ ml: 2 }}
                        onClick={() => refetchCountry()}
                        variant="outlined"
                    >
                        Play again
                    </Button> :
                    <>
                        <Button
                            variant="outlined"
                            sx={{ ml: 2 }}
                            onClick={ onGuess }
                        >
                            Guess
                        </Button>
                        <Button
                            variant="outlined"
                            sx={{ ml: 2 }}
                            onClick={ onGiveUp }
                        >
                            Give up
                        </Button>
                    </>
                }
            </div>

            <Table>
                <TableBody>
                    {
                        guessedCountries.map(c =>
                            <CountryData
                                sourceCountry={ c }
                                targetCountry={ country! }
                            />
                        )
                    }
                </TableBody>
            </Table>
        </>
    );
}

export default Practice;