import api from "../services/api";


export const getAllproductsAPI = async () => {
    try {
        const response = await api.get(`products/`);
        return response.data;
    } catch (error) {
        throw error;
    }
}