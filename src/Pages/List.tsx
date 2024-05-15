import { CircularProgress } from '@mui/material';
import useCountries from '../Hooks/useCountries';
import DataTable from '../Components/DataTable';
import { City } from '../Types/City';

function App() {
    const [countriesLoaded, countries] = useCountries();

    if(!countriesLoaded){
        return <CircularProgress />
    }

    return (
        <DataTable
            columns={
                [
                    {
                        header: "Country code",
                        accessor: "countryCode"
                    },
                    {
                        header: "Name",
                        accessor: "name"
                    },
                    {
                        header: "Capital",
                        accessor: "capital",
                        formatter: (capital: City) => capital?.name ?? "Has no capital"
                    },
                    {
                        header: "Flag",
                        accessor: "countryCode",
                        formatter: (countryCode: string) => countryCode === "" ? "" : <img
                            src={`https://teuteuf-dashboard-assets.pages.dev/data/common/flags/${countryCode.toLowerCase()}.svg`}
                            style={{
                                height: "80px"
                            }}
                        />
                    },
                    {
                        header: "Outline",
                        accessor: "countryCode",
                        formatter: (countryCode: string) => countryCode === "" ? "" : <img
                            src={`https://teuteuf-dashboard-assets.pages.dev/data/common/country-shapes/${countryCode.toLowerCase()}.svg`}
                            style={{
                                height: "80px"
                            }}
                        />
                    }
                ]
            }
            data={ countries }
        />
    );
}

export default App;