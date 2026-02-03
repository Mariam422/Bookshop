import axios from "axios";

const api = axios.create({
  baseURL: "https://bookstore.eraasoft.pro/api",
});

export const addToCart = (bookId, quantity = 1) => {
  return api.post("/cart/store/5", { book_id: bookId, quantity });
};
