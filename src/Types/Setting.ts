export type Setting = {
    language: string;
    countryMode: CountryMode;
    listMode: ListMode;
    nextRoundMode: NextRoundMode;
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
export enum NextRoundMode {
    Manual = "Manual",
    Automatic = "Automatic"
}

export const defaultSetting: Setting = {
    language: "en",
    countryMode: CountryMode.Outline,
    listMode: ListMode.Country,
    nextRoundMode: NextRoundMode.Manual,
    excludedContinents: []
};