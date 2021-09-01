import React from "react";
const User = ({
  _id,
  name,
  qualities,
  profession,
  completedMeetings,
  rate,
  onRemove,
}) => {
  return (
    <>
      <tr key={_id}>
        <td>{name}</td>
        <td>
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
        </td>
        <td>{profession.name}</td>
        <td>{completedMeetings}</td>
        <td>{rate} / 5</td>
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
