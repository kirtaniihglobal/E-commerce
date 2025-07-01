import api from "../services/api";


export const loginUserAPI = async (values) => {
    try {
        const response = await api.post(`auth/login`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const userDetailAPI = async () => {
    try {
        const response = await api.get(`auth/UserDetail`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const registerUserAPI = async (values) => {
    try {
        const response = await api.post(`auth/register`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateUserAPI = async (values) => {
    try {
        const response = await api.put(`auth/UserUpdate`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const addAddressAPI = async (values) => {
    try {
        const response = await api.post(`address/addAddress`, values);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const getAddressAPI = async () => {
    try {
        const response = await api.get(`address/getAddress`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteAddressAPI = async (id) => {
    try {
        const response = await api.delete(`address/deleteAddress/${id}`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateAddressAPI = async (id, values) => {
    try {
        const response = await api.put(`address/updateAddress/${id}`, values,);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const forgotPasswordAPI = async (email) => {
    try {
        console.log(email)
        const response = await api.post(`auth/forgotPassword`, email,);
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const resetPasswordAPI = async (values) => {
    try {
        console.log(values)
        const response = await api.post(`auth/resetPassword`, values,);
        return response.data;
    } catch (error) {
        throw error;
    }
}



