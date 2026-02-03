import axios from "axios";

const api = axios.create({
  baseURL: "https://bookstore.eraasoft.pro/api",
});

export const getHomeData = () => api.get("/home");
