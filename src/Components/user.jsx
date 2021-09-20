import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./qualities";
import PropTypes from "prop-types";

const User = ({ user, onRemove, onToogleBookmark }) => {
    return (
        <tr key={user._id}>
            <td>{user.name}</td>
            <td>
                <Qualities qualities={user.qualities} />
            </td>
            <td>{user.profession?.name}</td>
            <td>{user.completedMeetings}</td>
            <td>{user.rate} / 5</td>
            <td>
                <Bookmark
                    status={user.bookmark}
                    onClick={() => onToogleBookmark(user._id)}
                    className="btn"
                />
            </td>
            <td>
                <button
                    className="btn btn-danger"
                    onClick={() => onRemove(user._id)}
                >
                    delete
                </button>
            </td>
        </tr>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired,
    onToogleBookmark: PropTypes.func.isRequired
};
export default User;
