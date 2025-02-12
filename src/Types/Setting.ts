import { isNil } from "lodash";

export type Setting = {
    language: string;
    countryMode: CountryMode;
    listMode: ListMode;
    nextRoundMode: NextRoundMode;
    excludedContinents: string[];
    excludedRounds: FindByRound[];
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
export enum FindByRound {
    Country = "Country",
    Capital = "Capital"
}

export const defaultSetting = function(): Setting {
    const settingJson = localStorage.getItem("setting");

    if(isNil(settingJson)){
        return {
            language: "en",
            countryMode: CountryMode.Outline,
            listMode: ListMode.Country,
            nextRoundMode: NextRoundMode.Manual,
            excludedContinents: [],
            excludedRounds: []
        };
    }

    return JSON.parse(settingJson);
}();