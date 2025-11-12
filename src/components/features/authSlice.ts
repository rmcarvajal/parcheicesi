import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  occupation?: string;
}

interface AuthState {
  user: User | null;
  users: User[];
}

const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
const savedUser = JSON.parse(localStorage.getItem("currentUser") || "null");

const initialState: AuthState = {
  user: savedUser,
  users: savedUsers,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
      registerUser: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      const exists = state.users.find(
        (u) => u.email === user.email || u.username === user.username
      );
      if (exists) return; // 🔹 ya manejamos el error en Signup.tsx

      state.users.push(user);
      state.user = user;
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("currentUser", JSON.stringify(user));
    },


    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const { email, password } = action.payload;
      const user = state.users.find(
        (u) => (u.email === email || u.username === email) && u.password === password
      );
      if (user) {
        state.user = user;
        localStorage.setItem("currentUser", JSON.stringify(user));
      }
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("currentUser");
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        const idx = state.users.findIndex((u) => u.email === state.user?.email);
        if (idx !== -1) state.users[idx] = state.user;
        localStorage.setItem("users", JSON.stringify(state.users));
        localStorage.setItem("currentUser", JSON.stringify(state.user));
      }
    },
  },
});

export const { registerUser, login, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;
