import api from "../services/api";



export const addRatingAPI = async (values) => {
    console.log(values)
    const response = await api.post(`rating/`, values);
    return response.data;
}
export const getUserRatingAPI = async (id) => {
    console.log(id)
    const response = await api.get(`rating/getRate/${id}`);
    console.log(response.data)
    return response.data;
}
export const updateUserRatingAPI = async (values) => {
    // console.log(id)
    console.log(values.ratingId)
    const response = await api.put(`rating/updateRate/${values.ratingId}`, values);
    console.log(response.data)
    return response.data;
}