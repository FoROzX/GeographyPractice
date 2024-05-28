import { SelectChangeEvent } from "@mui/material";
import React from "react";
import { SettingsContext } from "../Providers/SettingsProvider";
import SelectFormItem from "../Components/SelectFormItem";
import { CountryMode, FindByRound, ListMode, NextRoundMode } from "../Types/Setting";
import data from "../Assets/countries.json";

function Settings(){
    const settingsContext = React.useContext(SettingsContext);

    const onLanguageChange = React.useCallback((e: SelectChangeEvent<string>) => {
        settingsContext.setLanguage(e.target.value);
    }, [settingsContext.setLanguage]);
    const onCountryModeChange = React.useCallback((e: SelectChangeEvent<string>) => {
        if(e.target.value in CountryMode){
            settingsContext.setCountryMode(e.target.value as any);
        }
    }, [settingsContext.setCountryMode]);
    const onListModeChange = React.useCallback((e: SelectChangeEvent<string>) => {
        if(e.target.value in ListMode){
            settingsContext.setListMode(e.target.value as any);
        }
    }, [settingsContext.setListMode]);
    const onNextRoundModeChange = React.useCallback((e: SelectChangeEvent<string>) => {
        if(e.target.value in NextRoundMode){
            settingsContext.setNextRoundMode(e.target.value as any);
        }
    }, [settingsContext.setNextRoundMode]);
    const onExcludedContinentsChange = React.useCallback((e: SelectChangeEvent<any>) => {
        settingsContext.setExcludedContinents(e.target.value);
    }, [settingsContext.setExcludedContinents]);
    const onExcludedRoundsChange = React.useCallback((e: SelectChangeEvent<any>) => {
        settingsContext.setExcludedRounds(e.target.value);
    }, [settingsContext.setExcludedRounds]);

    return (
        <div style={{ margin: "20px", display: "flex", columnGap: "50px", rowGap: "20px", flexWrap: "wrap" }}>
            <SelectFormItem
                label="Language"
                name="language"
                onChange={ onLanguageChange }
                options={[{ displayMember: "English", valueMember: "en" }, { displayMember: "German", valueMember: "de" }]}
                value={ settingsContext.language }
            />
            <SelectFormItem
                label="Find country by"
                name="country-mode"
                onChange={ onCountryModeChange }
                options={ Object.keys(CountryMode).map(mode => ({ displayMember: mode, valueMember: mode })) }
                value={ settingsContext.countryMode }
            />
            <SelectFormItem
                label="Find all"
                name="list-mode"
                onChange={ onListModeChange }
                options={ Object.keys(ListMode).map(mode => ({ displayMember: mode, valueMember: mode })) }
                value={ settingsContext.listMode }
            />
            <SelectFormItem
                label="Start next round"
                name="next-round-mode"
                onChange={ onNextRoundModeChange }
                options={ Object.keys(NextRoundMode).map(mode => ({ displayMember: mode, valueMember: mode })) }
                value={ settingsContext.nextRoundMode }
            />
            <SelectFormItem
                label="Excluded rounds"
                name="excluded-rounds"
                onChange={ onExcludedRoundsChange }
                options={ Object.keys(FindByRound).map(round => ({ displayMember: round, valueMember: round })) }
                value={ settingsContext.excludedRounds }
                multiple
            />
            <SelectFormItem
                label="Excluded continents"
                name="excluded-continents"
                onChange={ onExcludedContinentsChange }
                options={ data.map(continent => ({ displayMember: continent.name, valueMember: continent.name })) }
                value={ settingsContext.excludedContinents }
                multiple
            />
        </div>
    );
}

export default Settings;