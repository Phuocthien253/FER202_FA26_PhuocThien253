
import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use(
  (config) => {
    console.log(
      "[Axios Request]",
      config.method?.toUpperCase(),
      config.baseURL + config.url
    );
    return config;
  },
  (error) => Promise.reject(error)
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("[Axios Error]", error.message);
    console.error("[Axios URL]", error.config?.baseURL, error.config?.url);
    return Promise.reject(error);
  }
);

export default axiosClient;
