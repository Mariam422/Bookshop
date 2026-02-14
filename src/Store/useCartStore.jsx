// import { create } from "zustand";
// import axios from "axios";

// const token = localStorage.getItem("token"); // لازم يكون موجود من Login
// const api = axios.create({
//   baseURL: "https://bookstore.eraasoft.pro/api",
//   headers: { Authorization: `Bearer ${token}` },
// });

// export const useCartStore = create((set, get) => ({
//   cartItems: [],
//   loading: false,
//   error: null,

//   fetchCart: async () => {
//     set({ loading: true, error: null });
//     try {
//       const res = await api.get("/cart");
//       set({ cartItems: res.data.data || [] });
//     } catch (err) {
//       set({ error: "Failed to load cart", cartItems: [] });
//     } finally {
//       set({ loading: false });
//     }
//   },

//   addToCart: async (productId) => {
//     try {
//       await api.post(`/cart/store/${productId}`);
//       get().fetchCart();
//     } catch (err) {
//       set({ error: "Failed to add item" });
//     }
//   },

//   updateQuantity: async (cartItemId, quantity) => {
//     if (quantity < 1) return;
//     try {
//       await api.post(`/cart/update/${cartItemId}`, { quantity });
//       get().fetchCart();
//     } catch (err) {
//       set({ error: "Failed to update quantity" });
//     }
//   },

//   removeFromCart: async (cartItemId) => {
//     try {
//       await api.delete(`/cart/destroy/${cartItemId}`);
//       set({
//         cartItems: get().cartItems.filter((item) => item.id !== cartItemId),
//       });
//     } catch (err) {
//       set({ error: "Failed to remove item" });
//     }
//   },
// }));

import { create } from "zustand";
import axios from "axios";

// const token = localStorage.getItem("token");

// const api = axios.create({
//   baseURL: "https://bookstore.eraasoft.pro/api",
//   headers: { Authorization: `Bearer ${token}` },
// });

const fallbackCart = [
  {
    id: 1,
    product: {
      title: "Rich Dad And Poor Dad",
      price: 40,
      author: "Robert T. Kiyosanki",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut,",
      asin: "B09TWSRMCB",
      image: "/RichDad.png",
    },
    quantity: 1,
  },
  {
    id: 2,
    product: {
      title: "Rich Dad And Poor Dad",
      price: 40,
      author: "Robert T. Kiyosanki",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut,",
      asin: "B09TWSRMCB",
      image: "/RichDad.png",
    },
    quantity: 1,
  },
  {
    id: 3,
    product: {
      title: "Rich Dad And Poor Dad",
      price: 40,
      author: "Robert T. Kiyosanki",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et ultricies est. Aliquam in justo varius, sagittis neque ut,",
      asin: "B09TWSRMCB",
      image: "/RichDad.png",
    },
    quantity: 1,
  },
];

export const useCartStore = create((set, get) => ({
  cartItems: [],
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/cart");
      set({ cartItems: res.data.data || fallbackCart });
    } catch (err) {
      set({ cartItems: fallbackCart, error: null });
    } finally {
      set({ loading: false });
    }
  },

  updateQuantity: (cartItemId, quantity) => {
    if (quantity < 1) return;
    const updated = get().cartItems.map((item) =>
      item.id === cartItemId ? { ...item, quantity } : item
    );
    set({ cartItems: updated });
  },

  removeFromCart: (cartItemId) => {
    const updated = get().cartItems.filter((item) => item.id !== cartItemId);
    set({ cartItems: updated });
  },
}));
