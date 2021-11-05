import React from "react";
import PropTypes from "prop-types";
import Quality from "../../../ui/qualities/quality";

const QualitiesCard = ({ qualities }) => {
    return (
        <div className="card mb-3">
            <div className="card-body d-flex flex-column justify-content-center text-center">
                <h5 className="card-title">
                    <span>Qualities</span>
                </h5>
                <div>
                    {qualities.map((badge) => (
                        <Quality key={badge._id} {...badge} />
                    ))}
                </div>
            </div>
        </div>
    );
};

QualitiesCard.propTypes = {
    qualities: PropTypes.arrayOf()
};
export default QualitiesCard;
