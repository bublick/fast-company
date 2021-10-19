import React, { useEffect, useState } from "react";
import TextField from "../Components/textField";
import { validator } from "../utils/validator";

const Login = () => {
    const [data, setData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({});

    const handleChange = ({ target }) => {
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
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const validate = () => {
        const errors = validator(data, validatorConfig);

        for (const fieldName in data) {
            if (data[fieldName].trim() === "") {
                errors[fieldName] = `${fieldName} обязательно для заполннения`;
            }
        }

        setErrors(errors);
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
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <h3 className="mb-4">Login</h3>
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
                        <button
                            type="submit"
                            className="btn btn-primary w-100 mx-auto"
                            disabled={isValid}
                        >
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
