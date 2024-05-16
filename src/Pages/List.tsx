import { CircularProgress } from '@mui/material';
import useCountries from '../Hooks/useCountries';
import DataTable from '../Components/DataTable';
import { City } from '../Types/City';
import React from 'react';
import { SettingsContext } from '../Providers/SettingsProvider';
import { isNil } from 'lodash';

function App() {
    const [countriesLoaded, countries] = useCountries();

    const settingsContext = React.useContext(SettingsContext);

    const formatNumber = React.useCallback((number: number) => {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }, []);

    const translatedCountries = React.useMemo(() => {
        return countries.map(country => {
            const translation = country.translations.find(translation => translation.language === settingsContext.language);

            const data = { ...country };

            if(isNil(translation)){
                return data;
            }
            if(!isNil(translation.name)){
                data.name = translation.name;
                data.alternativeNames = translation.alternativeNames;
            }
            if(!isNil(translation.capital)){
                data.capital!.name = translation.capital;
            }

            return data;
        });
    }, [countries]);

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
            data={ translatedCountries }
        />
    );
}

export default App;