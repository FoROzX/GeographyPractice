import { Button, CircularProgress, FormControl, FormControlLabel, Switch, Table, TableBody, TextField } from "@mui/material";
import CountryData from "../Components/CountryData/CountryData";
import React from "react";
import { Country } from "../Types/Country";
import { isNil } from "lodash";
import { CountryContext } from "../Providers/CountryProvider";
import WinDialog, { WinDialogRef } from "../Components/WinDialog";

function Practice(){
    const [guess, setGuess] = React.useState<string>("");

    const [flagMode, setFlagMode] = React.useState<boolean>(false);

    const [countriesLoaded, countries] = React.useContext(CountryContext);

    const [country, setCountry] = React.useState<Country>();
    
    const [guessedCountries, setGuessedCountries] = React.useState<Country[]>([]);
    const [gameOver, setGameOver] = React.useState(false);

    const ref = React.useRef<WinDialogRef>(null);

    const guessedCountry = React.useMemo(() => {
        return countries.find(c => c.name.toLowerCase() === guess.toLowerCase() || c.alternativeNames.map(n => n.toLowerCase()).includes(guess.toLowerCase()));
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
        refetchCountry();
    }, [flagMode]);

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

            <FormControl>
                <FormControlLabel
                    control={
                        <Switch
                            color="primary"
                            onClick={() => setFlagMode(!flagMode)}
                            defaultChecked={ flagMode }
                        />
                    }
                    label="Find by flag"
                    labelPlacement="top"
                />
            </FormControl>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={
                        flagMode ?
                        `https://teuteuf-dashboard-assets.pages.dev/data/common/flags/${country!.countryCode.toLowerCase()}.svg` :
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