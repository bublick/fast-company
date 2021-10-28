import { React, useState } from "react";
import PropTypes from "prop-types";
import { iconEye, iconEyeSlash } from "../../../utils/icons";

const TextField = ({
    label,
    type,
    name,
    value,
    onChange,
    error,
    placeholder
}) => {
    const handleChange = ({ target }) => {
        onChange({ name: [target.name], value: target.value });
    };
    const [showPassword, setShowPassword] = useState(false);

    const getInputClasses = () => {
        return "form-control" + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div className="mb-4">
            <label className="form-label">{label}</label>
            <div className="input-group has-validation">
                <input
                    type={showPassword ? "text" : type}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className={getInputClasses()}
                />
                {type === "password" && (
                    <button
                        className="btn btn-ouline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? iconEye : iconEyeSlash}
                    </button>
                )}
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    );
};

TextField.defaultProps = {
    type: "text"
};

TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    handleChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default TextField;
