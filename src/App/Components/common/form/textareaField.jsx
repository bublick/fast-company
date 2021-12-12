import React from "react";
import PropTypes from "prop-types";

const TextareaField = ({ label, name, value, onChange, error }) => {
    const handleChange = ({ target }) => {
        console.log(target.name, target.value);
        onChange({ name: [target.name], value: target.value });
    };

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };

    return (
        <div className="mb-4">
            <label htmlFor="commentTextarea">{label}</label>
            <div className="input-group has-validation">
                <textarea
                    id="commentTextarea"
                    rows="3"
                    name={name}
                    onChange={handleChange}
                    className={getInputClasses()}
                    value={value}
                ></textarea>

                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextareaField.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
};
export default TextareaField;
