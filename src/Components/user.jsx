import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import api from "../API";
import Quality from "./quality";

const User = ({ id }) => {
    const history = useHistory();

    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getUserById(id).then((data) => setUser(data));
    }, []);
    if (user) {
        console.log(user);
        console.log(user.profession);
    }

    const handleMoveBack = () => {
        history.push("/users");
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

                    <button onClick={handleMoveBack}>Все пользователи</button>
                </div>
            ) : (
                <h2>Loading</h2>
            )}
        </div>
    );
};

User.propTypes = {
    id: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToogleBookmark: PropTypes.func.isRequired
};

export default User;
