import api from "../services/api";


export const loginUserAPI = async (values) => {
    try {
        const response = await api.post(`auth/login`, values);
        // console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error;
    }
}
export const userDetailAPI = async () => {
    try {
        const response = await api.get(`auth/UserDetail`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const registerUserAPI = async (values) => {
    try {
        const response = await api.post(`auth/register`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
}


