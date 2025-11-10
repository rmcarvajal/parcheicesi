import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  username: string;
  email: string;
  password?: string; 
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  users: User[]; 
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  users: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action: PayloadAction<User>) => {
      // Verifica si el usuario ya existe 
      const exists = state.users.some(u => u.username === action.payload.username || u.email === action.payload.email);
      if (!exists) {
        state.users.push(action.payload);
      }
    },

    loginUser: (state, action: PayloadAction<User>) => {
      const { password, ...userData } = action.payload; 
      state.isAuthenticated = true;
      state.user = userData as User; 
    },

    // LOGOUT
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;