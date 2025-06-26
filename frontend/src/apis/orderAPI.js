import api from "../services/api";
export const addOrderAPI = async (values) => {
    try {
        const response = await api.post(`order/addOrder`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllOrderAPI = async () => {
    try {
        const response = await api.get(`order/getOrder`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const cancelOrderAPI = async (id) => {
    try {
        const response = await api.put(`order/cancelOrder/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}