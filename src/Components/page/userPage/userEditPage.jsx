import React, { useState, useEffect } from "react";
import api from "../../../API";
import PropTypes from "prop-types";
import UserEditForm from "../../ui/userEditForm";

const UserEditPage = ({ userId }) => {
    const [user, setUser] = useState();
    const [allQualities, setAllQualities] = useState({});
    const [allProfessions, setAllProfessions] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
        api.professions.fetchAll().then((data) => {
            setAllProfessions(data);
        });
        api.qualities.fetchAll().then((data) => {
            setAllQualities(data);
        });
    }, []);

    const handleSubmit = (data) => {
        api.users.update(userId, data).then(() => {
            window.location.href = `/users/${userId}`;
        });
    };

    return user ? (
        <div className="container">
            <h1>Редактивнование пользователя {user.name}</h1>
            <UserEditForm
                userId={userId}
                email={user.email}
                name={user.name}
                profession={user.profession}
                allProfessions={allProfessions}
                sex={user.sex}
                qualities={user.qualities}
                allQualities={allQualities}
                onSubmit={handleSubmit}
            />
        </div>
    ) : (
        "Загрузка.."
    );
};

UserEditPage.propTypes = {
    userId: PropTypes.string
};
export default UserEditPage;
