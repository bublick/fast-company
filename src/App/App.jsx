import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ProfessionProvider } from "./hooks/useProfession";

import NavBar from "./Components/ui/navBar";
import HomePage from "./Layouts/main";
import LoginPage from "./Layouts/login";
import UsersPage from "./Layouts/users";
import NotFoundPage from "./Layouts/notFound";
import { ToastContainer } from "react-toastify";
import { QualitiesProvider } from "./hooks/useQualities";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <QualitiesProvider>
                    <ProfessionProvider>
                        <Route
                            path="/login"
                            render={(props) => <LoginPage {...props} />}
                        />
                        <Route
                            path="/users/:userId?/:edit?"
                            render={(props) => <UsersPage {...props} />}
                        />
                    </ProfessionProvider>
                </QualitiesProvider>
                <Route path="/404" component={NotFoundPage} />
                <Redirect to="/404" />
            </Switch>
            <ToastContainer />
        </>
    );
};

export default App;
