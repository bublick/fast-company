import React from "react";
import PropTypes from "prop-types";

const Quality = ({ key, ...quality }) => {
    let qualityClass = "badge m-1 bg-";
    qualityClass += quality.color;

    return (
        <>
            <li className={qualityClass} key={key}>
                {quality.name}
            </li>
        </>
    );
};

Quality.propTypes = {
    key: PropTypes.string.isRequired,
    quality: PropTypes.array.isRequired,
    qualityClass: PropTypes.string.isRequired
};
export default Quality;
