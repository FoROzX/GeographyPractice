export type Setting = {
    language: string;
    countryMode: CountryMode;
    listMode: ListMode;
    excludedContinents: string[];
};

export enum CountryMode {
    Flag = "Flag",
    Outline = "Outline"
}
export enum ListMode {
    Country = "Country",
    Capital = "Capital"
}

export const defaultSetting: Setting = {
    language: "en",
    countryMode: CountryMode.Outline,
    listMode: ListMode.Country,
    excludedContinents: []
};