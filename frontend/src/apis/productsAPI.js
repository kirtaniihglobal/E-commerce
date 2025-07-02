import api from "../services/api";


export const getAllproductsAPI = async ({ skip, limit }) => {
    const response = await api.get(`products?skip=${skip}&limit=${limit}`);
    return response.data;
}
export const getNewArrivalproductsAPI = async () => {
    const response = await api.get(`products/new`);
    return response.data;
}
export const getTopSellingproductsAPI = async () => {
    const response = await api.get(`products/top`);
    return response.data;
}
export const getOneproductAPI = async (id) => {
    const response = await api.get(`products/${id}`);
    return response;
}
export const addProductAPI = async (values) => {
    const response = await api.post(`products/`, values);
    return response.data;
}
export const updateProductAPI = async (id, values) => {
    const response = await api.put(`products/${id}`, values,);
    return response.data;
}
export const deleteProductAPI = async (id) => {
    const response = await api.delete(`products/${id}`);
    return response.data;
}