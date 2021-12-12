import React from "react";
import PropTypes from "prop-types";

const RadioField = ({ options, name, onChange, value, label }) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    return (
        <div className="mb-4">
            <label className="form-check-label">{label}</label>
            <div>
                {options.map((option) => (
                    <div
                        className="form-check form-check-inline"
                        key={option.name + "_" + option.value}
                    >
                        <input
                            type="radio"
                            className="form-check-input"
                            name={name}
                            id={option.name + "_" + option.value}
                            value={option.value}
                            checked={option.value === value}
                            onChange={handleChange}
                        />
                        <label
                            htmlFor={option.name + "_" + option.value}
                            className="form-check-label"
                        >
                            {option.name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

RadioField.propTypes = {
    options: PropTypes.array,
    name: PropTypes.string,
    onChange: PropTypes.func,
    value: PropTypes.string,
    label: PropTypes.string
};

export default RadioField;
