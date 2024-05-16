import { CountryMode, Setting, defaultSetting } from "../Types/Setting";

export type ISettingsContext = Setting & {
    setLanguage: (language: string) => void;
    setCountryMode: (countryMode: CountryMode) => void;
    setExcludedContinents: (excludedContinents: string[]) => void;
};

export const defaultSettingsContext: ISettingsContext = {
    ...defaultSetting,
    setLanguage: () => {},
    setCountryMode: () => {},
    setExcludedContinents: () => {}
};