import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
//  import { validator } from "../../utils/validator";
import CheckboxField from "../common/form/checkboxField";
import * as yup from "yup";

const LoginForm = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        stayOn: false
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const validateScheme = yup.object().shape({
        password: yup
            .string()
            .required("Поле пароль обязательно для заполнения")
            .matches(
                /^(?=.*[A-Z])/,
                "Поле должно содержать хотябы одну заглавнуб букву"
            )
            .matches(/(?=.*[0-9])/, "Поле должно содержать хотябы одну цифру")
            .matches(
                /(?=.*[!@#$%^&*])/,
                "Пароль должен содержать 1 из спец символов !@#$%^&*"
            )
            .matches(/(?=.{8,})/, "Поле должно содержать минимум 8 символов"),
        email: yup
            .string()
            .required("Электронная почта обязательна для заполнения")
            .email("Email введен некорректно")
    });

    // const validatorConfig = {
    //     email: {
    //         isRequired: {
    //             message: "Электронная почта обязательна для заполнения"
    //         },
    //         isEmail: {
    //             message: "Почта введена неверно"
    //         }
    //     },
    //     password: {
    //         isRequired: {
    //             message: "Поле пароль обязательно для заполнения"
    //         },
    //         isCapitalSymbol: {
    //             message: "Поле должно содержать хотябы одну заглавнуб букву"
    //         },
    //         isContainDigit: {
    //             message: "Поле должно содержать хотябы одну цифру"
    //         },
    //         min: {
    //             message: "Поле должно содержать минимум 8 символов",
    //             value: 8
    //         }
    //     }
    // };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        //  const errors = validator(data, validatorConfig);
        validateScheme
            .validate(data)
            .then(() => setErrors({}))
            .catch((err) => setErrors({ [err.path]: err.message }));
        //  setErrors(errors);
        return Object.keys(errors).length !== 0;
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
            <CheckboxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставатся в системе
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

export default LoginForm;
