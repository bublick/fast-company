import React, { useState } from "react";
import Users from "./Components/users";

import api from "./api";
import SearchStatus from "./Components/searchStatus";

const App = () => {
  const [users, setUsers] = useState(api.users.fetchAll());
  const handleUserRemove = (id) => {
    setUsers(users.filter((user) => user._id !== id));
  };

  return (
    <>
      <SearchStatus length={users.length} />
      <Users users={users} onRemove={handleUserRemove} />
    </>
  );
};

export default App;
