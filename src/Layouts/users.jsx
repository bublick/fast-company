import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../Components/page/usersListPage";
import UserPage from "../Components/page/userPage";

const UsersPage = () => {
    const { userId } = useParams();

    return userId ? <UserPage id={userId} /> : <UsersListPage />;
};

export default UsersPage;
