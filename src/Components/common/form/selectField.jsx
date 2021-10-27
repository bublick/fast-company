import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    error
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: optionName,
                  value: options[optionName]._id
              }))
            : options;

    return (
        <>
            <div className="mb-4">
                <label htmlFor="validationCustom04" className="form-label">
                    {label}
                </label>
                <select
                    className={getInputClasses()}
                    id="validationCustom04"
                    name="profession"
                    value={value}
                    onChange={handleChange}
                >
                    <option disabled value="">
                        {defaultOption}
                    </option>
                    {optionsArray &&
                        optionsArray.map((option) => (
                            <option value={option.value} key={option.value}>
                                {option.name}
                            </option>
                        ))}
                </select>
                <div className="invalid-feedback">
                    Please select a valid state
                </div>
            </div>
        </>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
};

export default SelectField;
