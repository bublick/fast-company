import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import NavBar from "../Components/ui/navBar";
import HomePage from "../Layouts/main";
import LoginPage from "../Layouts/login";
import UsersPage from "../Layouts/users";
import NotFoundPage from "../Layouts/notFound";

const App = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route
                    path="/login"
                    render={(props) => <LoginPage {...props} />}
                />
                <Route
                    path="/users/:userId?/:edit?"
                    render={(props) => <UsersPage {...props} />}
                />

                <Route path="/404" component={NotFoundPage} />
                <Redirect to="/404" />
            </Switch>
        </>
    );
};

export default App;
