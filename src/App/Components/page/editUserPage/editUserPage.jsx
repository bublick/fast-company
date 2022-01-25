import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
// import api from "../../../api";
import TextField from "../../common/form/textField";
import SelectField from "../../common/form/selectField";
import RadioField from "../../common/form/radio.Field";
import MultiSelectField from "../../common/form/multiSelectField";
import BackHistoryButton from "../../common/backButton";
// import { useUser } from "../../../hooks/useUsers";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { userId } = useParams();
    const history = useHistory();
    const { currentUser, updateUserData } = useAuth();
    const { professions, isLoading: professionsLoading } = useProfessions();
    const { qualities, isLoading: qualitiesLoading } = useQualities();
    const [isUpdate, setIsUpdate] = useState();
    const [tData, setTData] = useState({});
    // const [isLoading, setIsLoading] = useState(false);

    // const { getUserById } = useUser();
    // const data = getUserById(userId);

    // data.qualities = transformData(data.qualities);
    const [errors, setErrors] = useState({});
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));

    const professionList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));

    useEffect(() => {
        if (!professionsLoading && !qualitiesLoading && currentUser & !tData) {
            setTData();
        }
        setTData({
            ...currentUser,
            qualities: transformData(currentUser.qualities)
        });
    }, []);

    // const [professions, setProfession] = useState([]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },

        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };

    useEffect(() => validate(), [tData]);

    useEffect(() => {
        if (tData && isUpdate) setIsUpdate(false);
    }, [tData]);

    const handleChange = (target) => {
        setTData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    const getQualitiesListByIds = (array) => {
        array = array.map((item) => item.value);
        return Object.values(qualities).filter((quality) => {
            return array.includes(quality._id);
        });
    };

    const transformData = (data) => {
        return getQualitiesListByIds(data).map((item) => ({
            label: item.name,
            value: item._id
        }));
    };

    const validate = () => {
        const errors = validator(tData, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;

        await updateUserData({
            ...tData,
            qualities: tData.qualities.map((q) => q.value)
        });
        history.push(`/users/${userId}`);
    };

    const isValid = Object.keys(errors).length === 0;
    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isUpdate ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                name="name"
                                value={tData.name}
                                onChange={handleChange}
                                error={errors.name}
                            />
                            <TextField
                                label="Электронная почта"
                                name="email"
                                value={tData.email}
                                onChange={handleChange}
                                error={errors.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                defaultOption="Choose..."
                                name="profession"
                                options={professionList}
                                onChange={handleChange}
                                value={tData.profession}
                                error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: "Male", value: "male" },
                                    { name: "Female", value: "female" },
                                    { name: "Other", value: "other" }
                                ]}
                                value={tData.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                defaultValue={tData.qualities}
                                options={qualitiesList}
                                onChange={handleChange}
                                name="qualities"
                                label="Выберите ваши качесвта"
                            />
                            <button
                                type="submit"
                                disabled={!isValid}
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    ) : (
                        <h1>Loading...</h1>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditUserPage;
