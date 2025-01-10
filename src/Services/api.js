import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7253/api", // Replace with your API URL
});

export default api;
