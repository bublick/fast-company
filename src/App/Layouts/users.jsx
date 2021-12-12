import React from "react";
import { useParams } from "react-router-dom";

import UsersListPage from "../Components/page/usersListPage";
import UserPage from "../Components/page/userPage";
import UserEditPage from "../Components/page/userPage/userEditPage";
import UserProvider from "../hooks/useUsers";

const UsersPage = () => {
    const { userId, edit } = useParams();

    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <UserEditPage userId={userId} />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default UsersPage;
