import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user")) || null,
  registeredUsers: JSON.parse(localStorage.getItem("registeredUsers")) || [],

  register: (userData) => {
    set((state) => {
      const updatedUsers = [...state.registeredUsers, userData];
      localStorage.setItem("registeredUsers", JSON.stringify(updatedUsers));
      return { registeredUsers: updatedUsers };
    });
  },

  login: ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const validUser = users.find((user) => user.email === email && user.password === password);

    if (validUser) {
      localStorage.setItem("user", JSON.stringify(validUser));
      set({ user: validUser });
      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null });
  },
}));

export default useAuthStore;
