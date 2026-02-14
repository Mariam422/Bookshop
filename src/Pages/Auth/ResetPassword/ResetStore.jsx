
import {create} from "zustand";

export const ResetStore = create((set) => ({
  user: null,
  email: "",
  otp: "",
  setEmail: (email) => set({ email }),
  setOtp: (otp) => set({ otp }),
  clearReset: () => set({ email: "", otp: "" }),
}));
