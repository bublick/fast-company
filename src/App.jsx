import React, { useState } from "react";
import Users from "./Components/users";

import api from "./API";

const App = () => {
    const [users, setUsers] = useState(api.users.fetchAll());
    const handleUserRemove = (id) => {
        setUsers(users.filter((user) => user._id !== id));
    };
    const handleAddToFavorite = (id) => {
        setUsers(
            users.filter((user) => {
                if (user._id === id) {
                    user.bookmark = !user.bookmark;
                    return user;
                }
                return user;
            })
        );
    };

    return (
        <>
            <Users
                users={users}
                onRemove={handleUserRemove}
                onToogleBookmark={handleAddToFavorite}
            />
        </>
    );
};

export default App;
