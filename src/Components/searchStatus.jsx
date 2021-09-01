import React from "react";

const SearchStatus = ({ length }) => {
  const renderPhrase = (number) => {
    let phraseClasses = "badge m-1 bg-";
    if (number === 1 || number >= 5) {
      phraseClasses += "primary";
      let phrase = number + " человек тусанет с тобой сегодня";
      return <div className={phraseClasses}>{phrase}</div>;
    } else if (number > 1 && number < 5) {
      phraseClasses += "primary";
      let phrase = number + " человека тусанет с тобой сегодня";
      return <div className={phraseClasses}>{phrase}</div>;
    } else {
      phraseClasses += "danger";
      let phrase = "Никто с тобой не тусанет";
      return <div className={phraseClasses}>{phrase}</div>;
    }
  };

  return (
    <>
      <h2>{renderPhrase(length)}</h2>
    </>
  );
};

export default SearchStatus;
