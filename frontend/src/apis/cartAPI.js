import api from "../services/api";



export const addToCartAPI = async (values) => {
    try {
        const response = await api.post(`cart/add`, values);

        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllCartAPI = async () => {
    try {
        const response = await api.get(`cart/get`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response;
    } catch (error) {
        throw error;
    }
}
export const removeFromCartAPI = async (id) => {
    try {
        const response = await api.delete(`cart/delete/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const clearCartAPI = async () => {
    try {
        const response = await api.delete(`cart/clear`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const plusAPI = async (id) => {
    try {
        const response = await api.get(`cart/plus/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const minusAPI = async (id) => {
    try {
        const response = await api.get(`cart/minus/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
