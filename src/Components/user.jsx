import React from "react";
import Bookmark from "./bookmark";
import Qualities from "./qualities";

const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onRemove,
  bookmark,
  onToogleBookmark,
}) => {
  return (
    <>
      <tr key={_id}>
        <td>{name}</td>
        <td>
          <Qualities qualities={qualities} />
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate} / 5</td>
        <td>
          <Bookmark
            status={bookmark}
            onClick={() => onToogleBookmark(_id)}
            className="btn"
          />
        </td>
        <td>
          <button className="btn btn-danger" onClick={() => onRemove(_id)}>
            delete
          </button>
        </td>
      </tr>
    </>
  );
};

export default User;
