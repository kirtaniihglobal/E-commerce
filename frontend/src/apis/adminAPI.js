import api from "../services/api";


export const getAllUsersAPI = async () => {
    try {
        const response = await api.get(`admin/AllUsers`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const blockUserAPI = async (id) => {
    try {
        const response = await api.put(`admin/blockUser/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateUserByAdminAPI = async (id, values) => {
    try {        
        const response = await api.put(`admin/updateUserByAdmin/${id}`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllCountByAdminAPI = async () => {
    try {
        const response = await api.get(`admin/getAllCount`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllOrderAdminAPI = async (status) => {
    try {
        const response = await api.get(`admin/getAllOrder?status=${status}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateOrderAdminAPI = async (id) => {
    try {
        const response = await api.put(`admin/updateOrder/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}