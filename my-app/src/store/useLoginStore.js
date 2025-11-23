// useLoginStore.js
import { create } from "zustand";

const useLoginStore = create((set) => ({
  isLoginClick: false,
  setIsloginClick: (val) => set({ isLoginClick: val }),
  
}));

export default useLoginStore;
