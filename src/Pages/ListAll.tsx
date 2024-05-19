import React from "react";
import { CountryContext } from "../Providers/CountryProvider";
import { CircularProgress, Table, TableBody } from "@mui/material";
import { GameState } from "../Types/GameState";
import ListAllData from "../Components/ListAllData";

function ListAllDisplay(){
    const [gameState, setGameState] = React.useState<GameState>(GameState.Searching);

    const [countriesLoaded, countries] = React.useContext(CountryContext);

    const randomizedCountries = React.useMemo(() => {
        return countries.sort(() => Math.random() - Math.random());
    }, [countries]);

    if(!countriesLoaded){
        return <CircularProgress />;
    }

    return (
        <Table>
            <TableBody>
                {
                    randomizedCountries.map(country => 
                        <ListAllData
                            country={ country }
                            gameState={ gameState }
                        />
                    )
                }
            </TableBody>
        </Table>
    );
}

export default ListAllDisplay;