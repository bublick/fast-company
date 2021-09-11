import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./qualities";
import PropTypes from "prop-types";

const User = ({
    _id,
    name,
    qualities,
    profession,
    completedMeetings,
    rate,
    onRemove,
    bookmark,
    onToogleBookmark
}) => {
    return (
        <>
            <tr key={_id}>
                <td>{name}</td>
                <td>
                    <Qualities qualities={qualities} />
                </td>
                <td>{profession.name}</td>
                <td>{completedMeetings}</td>
                <td>{rate} / 5</td>
                <td>
                    <Bookmark
                        status={bookmark}
                        onClick={() => onToogleBookmark(_id)}
                        className="btn"
                    />
                </td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => onRemove(_id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    _id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    qualities: PropTypes.array.isRequired,
    profession: PropTypes.string.isRequired,
    completedMeetings: PropTypes.number.isRequired,
    rate: PropTypes.number.isRequired,
    onRemove: PropTypes.func.isRequired,
    bookmark: PropTypes.bool.isRequired,
    onToogleBookmark: PropTypes.func.isRequired
};
export default User;
