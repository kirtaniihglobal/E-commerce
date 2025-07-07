import api from "../services/api";

export const addRatingAPI = async (values) => {
    const response = await api.post(`rating/`, values);
    return response.data;
}
export const getUserRatingAPI = async (id) => {
    const response = await api.get(`rating/getRate/${id}`);
    return response.data;
}
export const getOneProductRatingAPI = async (id) => {
    const response = await api.get(`rating/getProductRate/${id}`);
    return response.data;
}
export const updateUserRatingAPI = async (values) => {
    const response = await api.put(`rating/updateRate/${values.ratingId}`, values);
    return response.data;
}