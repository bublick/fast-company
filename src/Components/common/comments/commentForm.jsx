import React, { useEffect, useState } from "react";
import SelectField from "../form/selectField";
import TextareaField from "../form/textareaField";
import api from "../../../API";
import { validator } from "../../../utils/validator";
import PropTypes from "prop-types";

const CommentForm = ({ userId }) => {
    const [users, setUsers] = useState();
    const [data, setData] = useState({
        pageId: userId,
        userId: "",
        content: ""
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        api.users.fetchAll().then((userData) => {
            setUsers(
                userData.map((uD) => ({
                    name: uD.name,
                    value: uD._id
                }))
            );
        });
    });

    const validatorConfig = {
        userId: {
            isRequired: {
                message: "Необходимо выбрать комментатора"
            }
        },
        content: {
            isRequired: {
                message: "Поле комментария обязательно для заполнения"
            },
            min: {
                message: "Текст комментария должен быть длинее 10 символов",
                value: 10
            }
        }
    };

    useEffect(() => {
        validate();
    }, [data]);

    const isValid = Object.keys(errors).length !== 0;

    const validate = () => {
        const errors = validator(data, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();

        if (!isValid) return;

        api.comments.add(data);

        setData(() => ({ pageId: userId, userId: "", content: "" }));
    };

    const handleChange = (target) => {
        let value;
        if (target.name === "userId") {
            value = target.value.value;
        } else {
            value = target.value;
        }

        setData((prevState) => ({
            ...prevState,
            [target.name]: value
        }));
    };

    return users ? (
        <form onSubmit={handleSubmit}>
            <SelectField
                label={"Выберете пользователя"}
                value={data.userId}
                onChange={handleChange}
                defaultOption={"Выберите.."}
                options={users}
                name="userId"
                error={errors.userId}
            />

            <TextareaField
                label="Сообщение"
                name="content"
                value={data.content}
                onChange={handleChange}
                error={errors.content}
            />

            <button
                type="submit"
                className="btn btn-primary w-100 mx-auto"
                disabled={isValid}
            >
                Отправить
            </button>
        </form>
    ) : (
        ""
    );
};

CommentForm.propTypes = {
    userId: PropTypes.string
};

export default CommentForm;
