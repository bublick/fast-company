import React from "react";
import TextField from "./textField";
import PropTypes from "prop-types";

const SearchBar = ({ onType, ...rest }) => {
    return <TextField placeholder="Search..." onChange={onType} {...rest} />;
};

export default SearchBar;

SearchBar.propTypes = {
    onType: PropTypes.func
};
