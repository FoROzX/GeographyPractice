import { City } from "./City";
import { CountryTranslation } from "./Translation";

export type DatabaseCountry = Country & {
    translations: CountryTranslation[];
};
export type Country = {
    name: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    area: number;
    population: number;
    alternativeNames: string[];
    capital: City|null;
};