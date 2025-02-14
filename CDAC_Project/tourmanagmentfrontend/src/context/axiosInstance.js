import axios from "axios";
import { config } from "../services/config";
const token = sessionStorage.getItem("user");

const axiosInstance = axios.create({
  baseURL: `${config.serverUrl}/admin`, // Update this to your backend server URL
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default axiosInstance;
