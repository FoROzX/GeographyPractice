import { DatabaseCountry } from "./Country";

export type Continent = {
    name: string;
    countries: DatabaseCountry[];
};