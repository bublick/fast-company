import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../Components/page/usersListPage";
import UserPage from "../Components/page/userPage";
import UserEditPage from "../Components/page/userPage/userEditPage";

const UsersPage = () => {
    const { userId, edit } = useParams();

    return (
        <>
            {userId ? (
                edit ? (
                    <UserEditPage userId={userId} />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    );
};

export default UsersPage;
