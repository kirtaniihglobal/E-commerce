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