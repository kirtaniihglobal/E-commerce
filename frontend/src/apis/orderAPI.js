import api from "../services/api";

export const addOrderAPI = async (values) => {
    try {
        const response = await api.post(`order/addOrder`, values);
        // console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllOrderAPI = async () => {
    try {
        const response = await api.get(`order/getOrder`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllOrderAdminAPI = async (status) => {
    try {
        console.log(status)
        const response = await api.get(`order/getAllOrder?status=${status}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateOrderAdminAPI = async (id) => {
    try {
        const response = await api.put(`order/updateOrder/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const cancelOrderAPI = async (id) => {
    try {
        const response = await api.put(`order/cancelOrder/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}