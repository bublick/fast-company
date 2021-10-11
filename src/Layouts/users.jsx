import React from "react";
import { useParams } from "react-router-dom";
import Users from "../Components/users";
import User from "../Components/user";

const UsersPage = () => {
    const { userId } = useParams();

    return userId ? <User id={userId} /> : <Users />;
};

export default UsersPage;
