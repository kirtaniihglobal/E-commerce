import axios from "axios";
const baseURL = import.meta.env.VITE_BASEURL;
const api = axios.create({
  baseURL: `${baseURL}`,
});


//create a object for api//
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default api;



