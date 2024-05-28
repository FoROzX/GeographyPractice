import React from "react";
import { ISettingsContext, defaultSettingsContext } from "./SettingsContext";
import { CountryMode, FindByRound, ListMode, NextRoundMode, defaultSetting } from "../Types/Setting";
import { SettingOperation, settingReducer } from "../Types/SettingReducer";

export const SettingsContext = React.createContext<ISettingsContext>(defaultSettingsContext);

type Props = {
    children: React.ReactNode;
}

function SettingsProvider({ children }: Props){
    const [setting, dispatchSetting] = React.useReducer(settingReducer, defaultSetting);

    React.useEffect(() => {
        localStorage.setItem("setting", JSON.stringify(setting));
    }, [setting]);

    const setLanguage = React.useCallback((language: string) => {
        dispatchSetting({ type: SettingOperation.Language, payload: language });
    }, []);
    const setCountryMode = React.useCallback((countryMode: CountryMode) => {
        dispatchSetting({ type: SettingOperation.CountryMode, payload: countryMode });
    }, []);
    const setListMode = React.useCallback((listMode: ListMode) => {
        dispatchSetting({ type: SettingOperation.ListMode, payload: listMode });
    }, []);
    const setNextRoundMode = React.useCallback((nextRoundMode: NextRoundMode) => {
        dispatchSetting({ type: SettingOperation.NextRoundMode, payload: nextRoundMode });
    }, []);
    const setExcludedContinents = React.useCallback((excludedContinents: string[]) => {
        dispatchSetting({ type: SettingOperation.ExcludedContinents, payload: excludedContinents });
    }, []);
    const setExcludedRounds = React.useCallback((excludedRounds: FindByRound[]) => {
        dispatchSetting({ type: SettingOperation.ExcludedRounds, payload: excludedRounds });
    }, []);

    const settingsContext: ISettingsContext = React.useMemo(() => ({
        ...setting,
        setLanguage,
        setCountryMode,
        setListMode,
        setNextRoundMode,
        setExcludedContinents,
        setExcludedRounds
    }), [setting, setLanguage, setCountryMode, setListMode, setNextRoundMode, setExcludedContinents, setExcludedRounds]);

    return (
        <SettingsContext.Provider value={ settingsContext }>
            { children }
        </SettingsContext.Provider>
    );
}

export default SettingsProvider;