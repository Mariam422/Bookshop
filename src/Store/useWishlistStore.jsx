import { create } from "zustand";
import axios from "axios";
import { useCartStore } from "./useCartStore";

// const token = localStorage.getItem("token");

// const api = axios.create({
//   baseURL: "https://bookstore.eraasoft.pro/api/wishlist",
//   headers: { Authorization: `Bearer ${token}` },
// });

const fallbackWishlist = [
  {
    id: 1,
    product: {
      title: "Rich Dad And Poor Dad",
      price: 40,
      author: "Robert T. Kiyosanki",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
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
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      asin: "B09TWSRMCB",
      image: "/RichDad.png",
    },
    quantity: 1,
  },
];

export const useWishlistStore = create((set, get) => ({
  //   wishlistItems: [],
  wishlistItems: fallbackWishlist,
  loading: false,
  error: null,

    fetchWishlist: async () => {
      set({ loading: true, error: null });
      try {
        const res = await api.get("/wishlist");
        set({ wishlistItems: res.data.data || fallbackWishlist });
      } catch (err) {
        set({ wishlistItems: fallbackWishlist, error: null });
      } finally {
        set({ loading: false });
      }
    },

  totalItems: () => get().wishlistItems.reduce((acc, i) => acc + i.quantity, 0),

  totalPrice: () =>
    get().wishlistItems.reduce(
      (acc, i) => acc + i.product.price * i.quantity,
      0,
    ),
  removeFromWishlist: (itemId) => {
    set({
      wishlistItems: get().wishlistItems.filter((i) => i.id !== itemId),
    });
  },

  moveToCart: (itemId) => {
    const itemToMove = get().wishlistItems.find((item) => item.id === itemId);
    if (!itemToMove) return;

    set({ wishlistItems: get().wishlistItems.filter((i) => i.id !== itemId) });

    const cartStore = useCartStore.getState();
    cartStore.cartItems.push(itemToMove);
  },

  moveAllToCart: () => {
    const cartStore = useCartStore.getState();
    cartStore.cartItems.push(...get().wishlistItems);

    set({ wishlistItems: [] });
  },
}));
