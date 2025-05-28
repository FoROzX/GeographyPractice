import { City } from "./City";

export type DatabaseCountry = Country & {
    translations?: {
        [language: string]: Partial<Country>;
    };
};

export type Country = {
    name: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    area: number;
    population: number;
    alternativeNames?: string[];
    capital?: City;
};