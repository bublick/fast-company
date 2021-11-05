import React, { useEffect, useState } from "react";
import api from "../../../API";
import PropTypes from "prop-types";
import { iconBiX } from "../../../utils/icons";
import { timeFromTimestamp } from "../../../utils/timeFromTimestamp";

const Comment = ({ commentId, userId, publishedTime, commentContent }) => {
    const [user, setUser] = useState();

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const handleRemoveComment = (commentId) => {
        console.log(commentId);
        api.comments.remove(commentId);
    };

    return (
        <>
            {user && (
                <div className="bg-light card-body  mb-3">
                    <div className="row">
                        <div className="col">
                            <div className="d-flex flex-start ">
                                <img
                                    src={`https://avatars.dicebear.com/api/avataaars/123${userId
                                        .toString(36)
                                        .substring(7)}.svg`}
                                    className="rounded-circle shadow-1-strong me-3"
                                    alt="avatar"
                                    width="65"
                                    height="65"
                                />
                                <div className="flex-grow-1 flex-shrink-1">
                                    <div className="mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-1 ">
                                                {user.name + " "}
                                                <span className="small">
                                                    {timeFromTimestamp(
                                                        publishedTime
                                                    )}
                                                </span>
                                            </p>
                                            <button
                                                className="btn btn-sm text-primary d-flex align-items-center"
                                                onClick={() =>
                                                    handleRemoveComment(
                                                        commentId
                                                    )
                                                }
                                            >
                                                <i>{iconBiX}</i>
                                            </button>
                                        </div>
                                        <p className="small mb-0">
                                            {commentContent}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

Comment.propTypes = {
    commentId: PropTypes.string,
    userId: PropTypes.string,
    publishedTime: PropTypes.string,
    commentContent: PropTypes.string
};
export default Comment;
