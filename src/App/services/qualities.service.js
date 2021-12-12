import httpServices from "./http.services";

const qualitiesEndpoint = "quality/";

const qualitiesService = {
    fetchAll: async () => {
        const { data } = await httpServices.get(qualitiesEndpoint);
        return data;
    }
};

export default qualitiesService;
