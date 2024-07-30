import axios from "axios";

const API_URL = "http://localhost:8081/api";

export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

export const loginUser = async (credentials) => {
  return await axios.post("http://localhost:8081/api/login", credentials);
};

export const validateToken = async (token) => {
  return await axios.post(
    `${API_URL}/validateToken`,
    { token },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
