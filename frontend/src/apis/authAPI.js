import api from "../services/api";


export const loginUserAPI = async (values) => {
    try {
        const response = await api.post(`auth/login`, values);
        // console.log(response)
        return response.data;
    } catch (error) {
        console.log(error)
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
        // console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteAddressAPI = async (id) => {
    try {
        const response = await api.delete(`address/deleteAddress/${id}`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateAddressAPI = async (id, values) => {
    try {
        console.log(id)
        console.log(values)
        const response = await api.put(`address/updateAddress/${id}`, values,);
        console.log(response.data)
        return response.data;
    } catch (error) {
        throw error;
    }
}


