import { TableCell, TableRow } from "@mui/material";
import { Country } from "../Types/Country";

type Props = {
    country: Country;
};

function CapitalData({ country }: Props){
    return (
        <TableRow>
            <TableCell key="name">{ country.capital?.name }</TableCell>
            <TableCell key="country">
                <img
                    src={`https://flagcdn.com/${country.countryCode.toLowerCase()}.svg`}
                    style={{ height: 16 }}
                />
            </TableCell>
        </TableRow>
    );
}

export default CapitalData;