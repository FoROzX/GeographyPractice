import { City } from "./City";

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