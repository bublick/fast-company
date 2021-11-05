import React from "react";
import PropTypes from "prop-types";

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    name,
    error
}) => {
    const handleChange = ({ target }) => {
        const findObj = optionsArray.find((p) => p.value === target.value);
        onChange({ name: target.name, value: findObj || target.value });
    };

    const getInputClasses = () => {
        return "form-select" + (error ? " is-invalid" : "");
    };

    const optionsArray =
        !Array.isArray(options) && typeof options === "object"
            ? Object.keys(options).map((optionName) => ({
                  name: options[optionName].name,
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
                    name={name}
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
                <div className="invalid-feedback">{error}</div>
            </div>
        </>
    );
};

SelectField.propTypes = {
    label: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    name: PropTypes.string,
    defaultOption: PropTypes.string,
    options: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
    error: PropTypes.string
};

export default SelectField;
