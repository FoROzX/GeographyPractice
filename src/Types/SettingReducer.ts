import { Setting } from "./Setting";

export type SettingAction = {
    payload: any;
    type: SettingOperation;
};
export enum SettingOperation {
    CountryMode,
    ListMode,
    NextRoundMode,
    Language,
    ExcludedContinents
}

export const settingReducer = (state: Setting, action: SettingAction): Setting => {
    switch(action.type){
        case SettingOperation.CountryMode:
            return { ...state, countryMode: action.payload };
        case SettingOperation.ListMode:
            return { ...state, listMode: action.payload };
        case SettingOperation.NextRoundMode:
            return { ...state, nextRoundMode: action.payload };
        case SettingOperation.Language:
            return { ...state, language: action.payload };
        case SettingOperation.ExcludedContinents:
            return { ...state, excludedContinents: action.payload };
    }
};