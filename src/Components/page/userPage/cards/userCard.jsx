import React from "react";
import PropTypes from "prop-types";
import { biCaretDown, biCarretUpFill, iconGear } from "../../../../utils/icons";

const UserCard = ({ id, name, profession, rate, onUserEdit }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <button
                    className="position-absolute top-0 end-0 btn btn-light btn-sm"
                    onClick={onUserEdit}
                >
                    <i>{iconGear}</i>
                </button>
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={`https://avatars.dicebear.com/api/avataaars/123${id
                            .toString(36)
                            .substring(7)}.svg`}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="65"
                        height="65"
                    />
                    <div className="mt-3">
                        <h4>{name}</h4>
                        <p className="text-secondary mb-1">{profession}</p>
                        <div className="text-muted">
                            <i className="text-primary" role="button">
                                {biCarretUpFill}
                            </i>
                            <i className="text-secondary" role="button">
                                {biCaretDown}
                            </i>
                            <span className="ms-2">{rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

UserCard.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    profession: PropTypes.string,
    rate: PropTypes.number,
    onUserEdit: PropTypes.func
};

export default UserCard;
