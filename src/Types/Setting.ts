export type Setting = {
    language: string;
    countryMode: CountryMode;
    excludedContinents: string[];
};

export enum CountryMode {
    Flag = "Flag",
    Outline = "Outline"
}

export const defaultSetting: Setting = {
    language: "en",
    countryMode: CountryMode.Outline,
    excludedContinents: []
};