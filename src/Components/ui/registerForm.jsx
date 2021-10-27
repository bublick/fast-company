import React, { useEffect, useState } from "react";
import TextField from "../common/textField";
import { validator } from "../../utils/validator";
import api from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/multiSelectField";
import CheckboxField from "../common/form/checkboxField";

const RegisterForm = () => {
    const [professions, setProfessions] = useState();
    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
        api.qualities.fetchAll().then((data) => setQualities(data));
    }, []);

    const [qualities, setQualities] = useState({});

    const [data, setData] = useState({
        email: "",
        password: "",
        profession: "",
        sex: "male",
        qualities: [],
        licence: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Почта введена неверно"
            }
        },
        password: {
            isRequired: {
                message: "Поле пароль обязательно для заполнения"
            },
            isCapitalSymbol: {
                message: "Поле должно содержать хотябы одну заглавнуб букву"
            },
            isContainDigit: {
                message: "Поле должно содержать хотябы одну цифру"
            },
            min: {
                message: "Поле должно содержать минимум 8 символов",
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: "Выберете профессию из списка"
            }
        },
        licence: {
            isRequired: {
                message: "Необходимо подтвердить"
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const isValid = Object.keys(errors).length !== 0;

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (isValid) return;
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Email"
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Password"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />

            <SelectField
                label={"Выберете вашу профессию"}
                value={data.profession}
                onChange={handleChange}
                defaultOption={"Выберите.."}
                options={professions}
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
                options={qualities}
                onChange={handleChange}
                name="qualities"
                label="Выберите качества"
            />
            <CheckboxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Я принимаю все правила
            </CheckboxField>
            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={isValid}
            >
                Отправить
            </button>
        </form>
    );
};

export default RegisterForm;
