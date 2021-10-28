import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import { validator } from "../../utils/validator";

const UserEditForm = ({
    email,
    name,
    profession,
    allProfessions,
    sex,
    qualities,
    allQualities,
    onSubmit
}) => {
    const [data, setData] = useState({
        email: email,
        name: name,
        profession: profession,
        sex: sex,
        qualities: qualities
    });

    const [errors, setErrors] = useState({});
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        onSubmit(data);
        // console.log(data);
    };
    const validatorConfig = {
        name: {
            isRequired: { message: "Имя обязателено" }
        },
        email: {
            isRequired: { message: "Email обязателен" },
            isEmail: { message: "Email введен не корректно" }
        },
        profession: {
            isRequired: {
                message: "Обазательно выберите вашу профессию"
            }
        }
    };
    // console.log(qualities);
    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    // console.log({ allQualities });
    const isValid = Object.keys(errors).length === 0;

    return (
        <>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    error={errors.email}
                />

                <TextField
                    label="Email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                />

                <SelectField
                    label={"Выберете вашу профессию"}
                    value={data.profession}
                    onChange={handleChange}
                    defaultOption={"Выберите.."}
                    options={allProfessions}
                    error={errors.profession}
                />

                <RadioField
                    options={[
                        { name: "Male", value: "male" },
                        { name: "Female", value: "female" },
                        { name: "Other", value: "other" }
                    ]}
                    name="sex"
                    onChange={handleChange}
                    value={data.sex}
                    label="Выберете пол"
                />

                <MultiSelectField
                    options={allQualities}
                    defaultValue={data.qualities}
                    onChange={handleChange}
                    name="qualities"
                    label="Выберите качества"
                />

                <button
                    type="submit"
                    className="btn btn-primary w-100 mx-auto"
                    disabled={!isValid}
                >
                    Отправить
                </button>
            </form>
        </>
    );
};

UserEditForm.propTypes = {
    email: PropTypes.string,
    name: PropTypes.string,
    profession: PropTypes.array,
    allProfessions: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    sex: PropTypes.string,
    qualities: PropTypes.array,
    allQualities: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onSubmit: PropTypes.func
};
export default UserEditForm;
