import axios from "axios";

const BASE_URL = "http://127.0.0.1:5006/api/v1";

const axiosInstance = axios.create();
axiosInstance.defaults.baseURL = BASE_URL;
axiosInstance.defaults.withCredentials = true;

export default axiosInstance;