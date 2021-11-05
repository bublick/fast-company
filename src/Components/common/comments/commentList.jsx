import React, { useState, useEffect } from "react";
import api from "../../../API";
import PropTypes from "prop-types";
import Comment from "./comment";
import CommentForm from "./commentForm";

const CommentList = ({ userId }) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        api.comments
            .fetchCommentsForUser(userId)
            .then((data) => setComments(data));
    });

    return (
        <>
            <div className="card mb-2">
                {" "}
                <div className="card-body ">
                    <CommentForm userId={userId} />
                </div>
            </div>
            <div className="card mb-3">
                <div className="card-body ">
                    <h2>Comments</h2>
                    <hr />
                    {comments &&
                        comments.map((comment) => {
                            return (
                                <Comment
                                    key={comment._id}
                                    commentId={comment._id}
                                    userId={comment.userId}
                                    publishedTime={comment.created_at}
                                    commentContent={comment.content}
                                />
                            );
                        })}
                </div>
            </div>
        </>
    );
};

CommentList.propTypes = {
    userId: PropTypes.string
};
export default CommentList;
