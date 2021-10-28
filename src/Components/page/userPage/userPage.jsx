import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import api from "../../../API";
import Quality from "../../ui/qualities/quality";

const User = ({ userId }) => {
    const history = useHistory();

    const [user, setUser] = useState();

    useEffect(() => {
        console.log(userId);
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    });

    if (user) {
        console.log(user);
        console.log(user.profession);
    }

    const handleMoveBack = () => {
        history.push("/users");
    };

    const editUser = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        <div className="container">
            {user ? (
                <div>
                    <h1>{user.name}</h1>
                    <h2>Профессия: {user.profession.name}</h2>

                    <div>
                        {user.qualities.map((badge) => (
                            <Quality key={badge._id} {...badge} />
                        ))}
                    </div>
                    <div>completedMeetings: {user.completedMeetings}</div>
                    <div>Rate {user.rate}</div>

                    <div className="mt-4 d-grid gap-2 d-sm-flex">
                        <button
                            onClick={handleMoveBack}
                            className="btn btn-secondary"
                        >
                            Все пользователи
                        </button>
                        <button onClick={editUser} className="btn btn-primary">
                            Редактировать
                        </button>
                    </div>
                </div>
            ) : (
                <h2>Loading</h2>
            )}
        </div>
    );
};

User.propTypes = {
    userId: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToogleBookmark: PropTypes.func.isRequired
};

export default User;
