// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? "https://healthybasket-backend-2.onrender.com"
      : "http://localhost:5000", // your dev backend
  withCredentials: true, // Optional: if you’re using cookies/auth
});

export default axiosInstance;
