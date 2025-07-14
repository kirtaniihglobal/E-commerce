import api from "../services/api";

export const addNewSletterAPI = async (email) => {
  console.log(email);
  const response = await api.post(`newSletter/addSletter`, email);
  return response.data;
};
