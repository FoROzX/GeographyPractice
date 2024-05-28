import React from "react";
import { SettingsContext } from "../../Providers/SettingsProvider";
import { Button, Table, TableBody, TextField, Typography } from "@mui/material";
import { CountryMode, FindByRound, NextRoundMode } from "../../Types/Setting";
import { GameState } from "../../Types/GameState";
import { Country } from "../../Types/Country";
import { isNil } from "lodash";
import Toast, { ToastRef } from "../../Components/Toast";

type Props = {
    label: string;
    solution?: string;
    country: Country;
    round: number;
    nextRound: () => void;
    determineGuessedCountry: (guess: string) => Country|undefined;
    guessDisplayFormatter: (guessedCountries: Country[]) => React.ReactNode;
};

function FindByDisplay({ label, solution, country, round, nextRound, determineGuessedCountry, guessDisplayFormatter }: Props){
    const [guess, setGuess] = React.useState("");
    const [gameState, setGameState] = React.useState(GameState.Searching);
    const [guessedCountries, setGuessedCountries] = React.useState<Country[]>([]);

    const settingsContext = React.useContext(SettingsContext);

    const toastRef = React.useRef<ToastRef>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    const onGuess = React.useCallback(() => {
        const guessedCountry = determineGuessedCountry(guess);

        if(isNil(guessedCountry)){
            // Display error here ig
            return;
        }
        if(guessedCountries.map(country => country.name).includes(guessedCountry.name)){
            // Display error here ig
            return;
        }

        setGuessedCountries([...guessedCountries, guessedCountry]);

        if(country.name === guessedCountry.name){
            setGameState(GameState.Found);
            toastRef.current?.open(`${solution} is correct!`, 2000);
        }

        setGuess("");
    }, [guess, country, solution, determineGuessedCountry]);
    const onGiveUp = React.useCallback(() => {
        setGameState(GameState.GaveUp);
        toastRef.current?.open(`The correct answer was ${solution}`, 5000);
    }, [solution]);

    React.useEffect(() => {
        setGuess("");
        setGuessedCountries([]);
        setGameState(GameState.Searching);

        const key = Object.keys(FindByRound)[round];

        if(settingsContext.excludedRounds?.includes(key as any)){
            nextRound();

            return;
        }
        if(isNil(solution) && settingsContext.nextRoundMode === NextRoundMode.Automatic){
            nextRound();
        }
    }, [round]);
    React.useEffect(() => {
        if(gameState === GameState.Searching){
            inputRef.current?.focus();

            return;
        }

        if(settingsContext.nextRoundMode === NextRoundMode.Automatic){
            nextRound();
        }
    }, [gameState]);

    return (
        <>
            <Toast
                ref={ toastRef }
            />

            <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                    src={
                        settingsContext.countryMode === CountryMode.Flag ?
                        `https://flagcdn.com/${country.countryCode.toLowerCase()}.svg` :
                        `https://teuteuf-dashboard-assets.pages.dev/data/common/country-shapes/${country.countryCode.toLowerCase()}.svg`
                    }
                    style={{ height: "30vh" }}
                />
            </div>

            <div style={{ display: "flex", justifyContent: "center", margin: "10px 0" }}>
                <Typography>
                    { label }
                </Typography>
            </div>

            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "20px 0" }}>
                <TextField
                    inputRef={ inputRef }
                    value={ guess }
                    label="Guess"
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
                    disabled={ gameState !== GameState.Searching }
                />

                {
                    gameState === GameState.Searching ?
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
                    </> :
                    <Button
                        variant="outlined"
                        sx={{ ml: 2 }}
                        onClick={ nextRound }
                    >
                        Next round
                    </Button>
                }
            </div>

            <Table>
                <TableBody>
                    {
                        guessDisplayFormatter(guessedCountries)
                    }
                </TableBody>
            </Table>
        </>
    );
}

export default FindByDisplay;