import { BrowserRouter, Route, Routes } from "react-router-dom";
import List from "./Pages/List";
import FindBy from "./Pages/FindBy";
import ListAll from "./Pages/ListAll";
import CountryProvider from "./Providers/CountryProvider";
import Layout from "./Layout/App";

function Router(){
    return (
        <BrowserRouter>
            <Layout>
                <CountryProvider>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <List />
                            }
                        />
                        <Route
                            path="/findby"
                            element={
                                <FindBy />
                            }
                        />
                        <Route
                            path="/list"
                            element={
                                <ListAll />
                            }
                        />
                    </Routes>
                </CountryProvider>
            </Layout>
        </BrowserRouter>
    );
}

export default Router;