import React from "react";
import { Country } from "../../Types/Country";
import { TableCell, TableRow } from "@mui/material";
import DirectionPointer from "../DirectionPointer";

type Props = {
    sourceCountry: Partial<Country>;
    targetCountry: Partial<Country>;
};

const conv = Math.PI / 180;
const R = 6371;

function CountryData({ sourceCountry, targetCountry }: Props){
    const lat1 = React.useMemo(() => sourceCountry.latitude! * conv, [sourceCountry.latitude]);
    const lon1 = React.useMemo(() => sourceCountry.longitude! * conv, [sourceCountry.longitude]);
    const lat2 = React.useMemo(() => targetCountry.latitude! * conv, [targetCountry.latitude]);
    const lon2 = React.useMemo(() => targetCountry.longitude! * conv, [targetCountry.longitude]);

    const distanceInKm = React.useMemo((): number => {
        const dLat = lat2 - lat1;
        const dLon = lon2 - lon1; 
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        
        return R * c;
    }, [lat1, lon1, lat2, lon2]);
    const direction = React.useMemo((): number => {
        const dLon = lon2 - lon1;
        const y = Math.sin(dLon) * Math.cos(lat2);
        const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

        return (Math.atan2(y, x) + 2 * Math.PI) % (2 * Math.PI);
    }, [lat1, lon1, lat2, lon2]);

    return (
        <TableRow>
            <TableCell>{ sourceCountry.name }</TableCell>
            <TableCell>{ Math.round(distanceInKm) }km</TableCell>
            <TableCell>
                <DirectionPointer
                    rotation={ direction }
                    isCorrect={ sourceCountry.name === targetCountry.name }
                />
            </TableCell>
        </TableRow>
    );
}

export default CountryData;