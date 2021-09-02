import React from "react";
import { iconStar, iconStarFill } from "../utils/icons";

const Bookmark = ({ status, ...rest }) => {
  return <button {...rest}>{status === true ? iconStarFill : iconStar}</button>;
};

export default Bookmark;
