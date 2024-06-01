import { City } from "./City";

export type CountryTranslation = {
    language: string;
    name: string|null;
    capital: Partial<City>|null;
    alternativeNames: string[];
};