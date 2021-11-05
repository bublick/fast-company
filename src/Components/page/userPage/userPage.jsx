import { React, useEffect, useState } from "react";
import { useHistory } from "react-router";
import PropTypes from "prop-types";
import api from "../../../API";
import UserCard from "./cards/userCard";
import QualitiesCard from "./cards/qualitiesCard";
import MeetingsCard from "./cards/meetingsCard";
import CommentList from "../../common/comments/commentList";

const User = ({ userId }) => {
    const history = useHistory();

    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => {
            setUser(data);
        });
    });

    // const handleMoveBack = () => {
    //     history.push("/users");
    // };

    const handleEditUser = () => {
        history.push(`/users/${userId}/edit`);
    };

    return (
        <div className="container">
            {user ? (
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard
                            id={user._id}
                            name={user.name}
                            profession={user.profession.name}
                            rate={user.rate}
                            onUserEdit={handleEditUser}
                        />
                        <QualitiesCard qualities={user.qualities} />
                        <MeetingsCard meetingCount={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentList userId={userId} />
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
