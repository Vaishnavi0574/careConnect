import { create } from "zustand";
const useAuthStore = create((set) => ({
  user: null,
  isLoading: true,
  // token:null,

  setUser: (user) => set({ user }),
  // setToken: (token) => set({ token }), 

  loadUser: async () => {
  set({ isLoading: true });

  try {
    const res = await fetch("http://localhost:3000/api/auth/me", {
      credentials: "include",
    });

    if (!res.ok) {
      set({ user: null, isLoading: false });
      return null;
    }

    const data = await res.json();
    set({ user: data.user, isLoading: false });
    return data.user;

  } catch (err) {
    set({ user: null, isLoading: false });
    return null;
  }
},




  logout: async () => {
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      set({ user: null });
    }
  },
}));
export default useAuthStore;