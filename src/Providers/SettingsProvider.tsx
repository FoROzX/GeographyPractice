import React from "react";
import { ISettingsContext, defaultSettingsContext } from "./SettingsContext";
import { CountryMode, Setting, defaultSetting } from "../Types/Setting";
import { isNil } from "lodash";

export const SettingsContext = React.createContext<ISettingsContext>(defaultSettingsContext);

type Props = {
    children: React.ReactNode;
}

function SettingsProvider({ children }: Props){
    const [setting, setSetting] = React.useState<Setting>(defaultSetting);

    const updateSetting = React.useCallback((setting: Setting) => {
        setSetting(setting);

        localStorage.setItem("setting", JSON.stringify(setting));
    }, []);

    const setLanguage = React.useCallback((language: string) => {
        updateSetting({ ...setting, language });
    }, [setting]);
    const setCountryMode = React.useCallback((countryMode: CountryMode) => {
        updateSetting({ ...setting, countryMode });
    }, [setting]);
    const setExcludedContinents = React.useCallback((excludedContinents: string[]) => {
        updateSetting({ ...setting, excludedContinents });
    }, [setting]);

    const settingsContext: ISettingsContext = React.useMemo(() => ({
        ...setting,
        setLanguage,
        setCountryMode,
        setExcludedContinents
    }), [setting]);

    React.useEffect(() => {
        const settingJson = localStorage.getItem("setting");

        if(isNil(settingJson)){
            return;
        }

        setSetting(JSON.parse(settingJson));
    }, []);

    return (
        <SettingsContext.Provider value={settingsContext}>
            { children }
        </SettingsContext.Provider>
    );
}

export default SettingsProvider;