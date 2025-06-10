import api from "../services/api";


export const getAllproductsAPI = async () => {
    try {
        const response = await api.get(`products/`);
        return response.data;
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
        console.log(values);
        const response = await api.put(`products/${id}`, values, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
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