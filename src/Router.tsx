import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import List from "./Pages/List";
import FindBy from "./Pages/FindBy/App";
import ListAll from "./Pages/ListAll";
import CountryProvider from "./Providers/CountryProvider";
import Layout from "./Layout/App";
import SettingsProvider from "./Providers/SettingsProvider";
import Settings from "./Pages/Settings";

function Router(){
    return (
        <BrowserRouter>
            <Layout>
                <SettingsProvider>
                    <CountryProvider>
                        <Routes>
                            <Route path="/" element={<Navigate to="/GeographyPractice" />} />
                            <Route path="/GeographyPractice">
                                <Route
                                    path=""
                                    element={
                                        <List />
                                    }
                                />
                                <Route
                                    path="findby"
                                    element={
                                        <FindBy />
                                    }
                                />
                                <Route
                                    path="list"
                                    element={
                                        <ListAll />
                                    }
                                />
                                <Route
                                    path="settings"
                                    element={
                                        <Settings />
                                    }
                                />
                            </Route>
                        </Routes>
                    </CountryProvider>
                </SettingsProvider>
            </Layout>
        </BrowserRouter>
    );
}

export default Router;