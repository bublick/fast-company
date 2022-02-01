import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import {
    getProfessionById,
    getProfessionLoadingStatus
} from "../../store/professions";

const Profession = ({ id }) => {
    // const { isLoading, getProfession } = useProfessions();
    const profession = useSelector(getProfessionById(id));
    const isLoading = useSelector(getProfessionLoadingStatus());

    if (!isLoading) {
        return <p>{profession.name}</p>;
    } else return "loading ...";
};
Profession.propTypes = {
    id: PropTypes.string
};
export default Profession;
