import api from "../services/api";



export const addToCartAPI = async (values) => {
    try {
        const response = await api.post(`cart/add`, values);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAllCartAPI = async () => {
    try {
        // console.log("hello")
        // console.log(id)
        const response = await api.get(`cart/get`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        // console.log(response);
        return response;
    } catch (error) {
        throw error;
    }
}
export const removeFromCartAPI = async (id) => {
    try {
        // console.log("hello")
        // console.log(id)
        const response = await api.delete(`cart/delete/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const clearCartAPI = async () => {
    try {
        // console.log("hello")
        // console.log(id)
        const response = await api.delete(`cart/clear`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const plusAPI = async (id) => {
    try {
        // console.log("hello")
        // console.log(id)
        const response = await api.get(`cart/plus/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const minusAPI = async (id) => {
    try {
        // console.log("hello")
        // console.log(id)
        const response = await api.get(`cart/minus/${id}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
}
