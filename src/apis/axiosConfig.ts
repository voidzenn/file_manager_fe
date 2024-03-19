import axios from "axios";
import { ENV_CONFIG } from "@/constants/envConfig";

const axiosConfig = axios.create({
  baseURL: ENV_CONFIG.base_url,
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: ENV_CONFIG.request_timeout,
});

export default axiosConfig;
