import { CountryMode, ListMode, Setting, defaultSetting } from "../Types/Setting";

export type ISettingsContext = Setting & {
    setLanguage: (language: string) => void;
    setCountryMode: (countryMode: CountryMode) => void;
    setListMode: (listMode: ListMode) => void;
    setExcludedContinents: (excludedContinents: string[]) => void;
};

export const defaultSettingsContext: ISettingsContext = {
    ...defaultSetting,
    setLanguage: () => {},
    setCountryMode: () => {},
    setListMode: () => {},
    setExcludedContinents: () => {}
};