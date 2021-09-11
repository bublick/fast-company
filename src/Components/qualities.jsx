import React from "react";
import PropTypes from "prop-types";

const Qualities = ({ qualities }) => {
    return (
        <>
            <ul className="p-0">
                {qualities.map((quality) => {
                    let qualityClass = "badge m-1 bg-";
                    qualityClass += quality.color;
                    return (
                        <li className={qualityClass} key={quality._id}>
                            {quality.name}
                        </li>
                    );
                })}
            </ul>
        </>
    );
};

Qualities.propTypes = {
    qualities: PropTypes.array.isRequired
};
export default Qualities;
