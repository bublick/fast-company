import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    const renderPhrase = (number) => {
        let phraseClasses = "badge m-1 bg-";
        if (number === 1 || number >= 5) {
            phraseClasses += "primary";
            const phrase = number + " человек тусанет с тобой сегодня";
            return <div className={phraseClasses}>{phrase}</div>;
        } else if (number > 1 && number < 5) {
            phraseClasses += "primary";
            const phrase = number + " человека тусанет с тобой сегодня";
            return <div className={phraseClasses}>{phrase}</div>;
        } else {
            phraseClasses += "danger";
            const phrase = "Никто с тобой не тусанет";
            return <div className={phraseClasses}>{phrase}</div>;
        }
    };

    return (
        <>
            <h2>{renderPhrase(length)}</h2>
        </>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};
export default SearchStatus;
