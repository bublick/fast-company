import React from "react";
import PropTypes from "prop-types";

const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemSelect,
    selectedItem
}) => {
    return (
        <ul className="list-group">
            {(typeof items === "object" ? Object.values(items) : items).map(
                (item) => (
                    <li
                        key={item[valueProperty]}
                        className={
                            "list-group-item" +
                            (item === selectedItem ? " active" : "")
                        }
                        onClick={() => onItemSelect(item)}
                        role="button"
                    >
                        {item[contentProperty]}
                    </li>
                )
            )}
        </ul>
    );
};

GroupList.defaultProps = {
    valueProperty: "_id",
    contentProperty: "name"
};

GroupList.propTypes = {
    items: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onItemSelect: PropTypes.func.isRequired,
    valueProperty: PropTypes.string.isRequired,
    contentProperty: PropTypes.string.isRequired,
    selectedItem: PropTypes.object
};

export default GroupList;
