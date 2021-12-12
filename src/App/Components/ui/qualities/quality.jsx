import React from "react";
import PropTypes from "prop-types";
import { useQualities } from "../../../hooks/useQualities";

const Quality = ({ id }) => {
    const { getQuality } = useQualities();

    console.log(getQuality(id));
    // const { _id, color, name } = getQuality(id);
    // console.log(_id, color, name);

    return <hr />;
};

Quality.propTypes = {
    id: PropTypes.string.isRequired
};
export default Quality;
