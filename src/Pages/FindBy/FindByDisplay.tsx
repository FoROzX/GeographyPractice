import React from "react";
import Dialog, { DialogRef } from "../../Components/Dialog";
import { SettingsContext } from "../../Providers/SettingsProvider";
import { Button, Table, TableBody, TextField, Typography } from "@mui/material";
import { CountryMode } from "../../Types/Setting";
import { GameState } from "../../Types/GameState";
import { Country } from "../../Types/Country";
import { isNil } from "lodash";

type Props = {
    label: string;
    solution?: string;
    country: Country;
    round: number;
    rounds: number;
    getNewCountry: () => void;
    nextRound: () => void;
    determineGuessedCountry: (guess: string) => Country|undefined;
    guessDisplayFormatter: (guessedCountries: Country[]) => React.ReactNode;
};

function FindByDisplay({ label, solution, country, round, rounds, getNewCountry, nextRound, determineGuessedCountry, guessDisplayFormatter }: Props){
    const [guess, setGuess] = React.useState("");
    const [gameState, setGameState] = React.useState(GameState.Searching);
    const [guessedCountries, setGuessedCountries] = React.useState<Country[]>([]);

    const settingsContext = React.useContext(SettingsContext);

    const ref = React.useRef<DialogRef>(null);

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
            ref.current?.open();
        }

        setGuess("");
    }, [guess]);
    const onGiveUp = React.useCallback(() => {
        setGameState(GameState.GaveUp);
        ref.current?.open();
    }, []);

    React.useEffect(() => {
        setGuess("");
        setGuessedCountries([]);
        setGameState(GameState.Searching);
    }, [country, round]);

    return (
        <>
            <Dialog
                ref={ ref }
                text={ gameState === GameState.Found ? `${solution} is correct!` : `The correct answer was ${solution}` }
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
                    rounds - 1 === round ?
                    <Button
                        variant="outlined"
                        sx={{ ml: 2 }}
                        onClick={ getNewCountry }
                    >
                        Play again
                    </Button> :
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