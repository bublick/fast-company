import React from "react";
import { iconStar, iconStarFill } from "../../utils/icons";
import PropTypes from "prop-types";

const Bookmark = ({ status, ...rest }) => {
    return (
        <button {...rest}>{status === true ? iconStarFill : iconStar}</button>
    );
};

Bookmark.propTypes = {
    status: PropTypes.bool.isRequired
};
export default Bookmark;
