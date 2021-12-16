import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import qualitiesService from "../services/qualities.service";

const QualitiesContext = React.createContext();

export const useQualities = () => {
    return useContext(QualitiesContext);
};

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true);
    const [qualities, setQualities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        getQualitiesList();
    }, []);

    useEffect(() => {
        if (error !== null) {
            toast(error);
            setError(null);
        }
    }, [error]);

    const getQualitiesList = async () => {
        try {
            const { content } = await qualitiesService.fetchAll();
            setQualities(content);
            setLoading(false);
        } catch (error) {
            errorCatcher(error);
        }
    };

    const getQuality = (id) => {
        qualities.forEach((qual) => {
            if (qual._id === id) {
                console.log("I need", qual);
            }
        });
        return qualities.find((q) => q._id === id);
    };

    function errorCatcher(error) {
        const { message } = error.response.data;
        setError(message);
        setLoading(false);
    }

    return (
        <QualitiesContext.Provider value={{ qualities, getQuality, isLoading }}>
            {children}
        </QualitiesContext.Provider>
    );
};

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
