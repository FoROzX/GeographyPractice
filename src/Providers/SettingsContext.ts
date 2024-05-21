import { CountryMode, ListMode, NextRoundMode, Setting, defaultSetting } from "../Types/Setting";

export type ISettingsContext = Setting & {
    setLanguage: (language: string) => void;
    setCountryMode: (countryMode: CountryMode) => void;
    setListMode: (listMode: ListMode) => void;
    setNextRoundMode: (nextRoundMode: NextRoundMode) => void;
    setExcludedContinents: (excludedContinents: string[]) => void;
};

export const defaultSettingsContext: ISettingsContext = {
    ...defaultSetting,
    setLanguage: () => {},
    setCountryMode: () => {},
    setListMode: () => {},
    setNextRoundMode: () => {},
    setExcludedContinents: () => {}
};