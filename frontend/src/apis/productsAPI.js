import api from "../services/api";


export const getAllproductsAPI = async () => {
    try {
        const response = await api.get(`products/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getNewArrivalproductsAPI = async () => {
    try {
        const response = await api.get(`products/new`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getTopSellingproductsAPI = async () => {
    try {
        const response = await api.get(`products/top`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getOneproductAPI = async (id) => {
    try {
        const response = await api.get(`products/${id}`);
        return response;
    } catch (error) {
        throw error;
    }
}
export const addProductAPI = async (values) => {
    try {
        const response = await api.post(`products/`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateProductAPI = async (id, values) => {
    try {
        const response = await api.put(`products/${id}`, values,);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteProductAPI = async (id) => {
    try {
        const response = await api.delete(`products/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}