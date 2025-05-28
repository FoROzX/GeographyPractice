import DataTable from '../Components/DataTable';
import { CountryContext } from '../Providers/CountryProvider';
import { City } from '../Types/City';
import React from 'react';

function App() {
    const countries = React.useContext(CountryContext);

    const formatNumber = React.useCallback(new Intl.NumberFormat().format, []);

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
                        formatter: (capital?: City) => capital?.name ?? "Has no capital"
                    },
                    {
                        header: "Population",
                        accessor: "population",
                        formatter: formatNumber
                    },
                    {
                        header: "Size",
                        accessor: "area",
                        formatter: (area: number) => `${formatNumber(area)} km²`
                    },
                    {
                        header: "Flag",
                        accessor: "countryCode",
                        formatter: (countryCode: string) => <img
                            src={`https://flagcdn.com/${countryCode.toLowerCase()}.svg`}
                            style={{
                                height: "80px"
                            }}
                        />
                    },
                    {
                        header: "Outline",
                        accessor: "countryCode",
                        formatter: (countryCode: string) => <img
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