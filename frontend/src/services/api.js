import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BASEURL}/auth`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    localStorage.setItem("token", token);
  }
  return config;
});

export default api;
