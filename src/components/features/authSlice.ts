import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//Tipos de datos 
export interface User {
    id: string;
    username: string;
    email: string;
    password: string; 
    bio?: string;
    avatar?: string;
}

// Estado inicial 
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

// Función auxiliar para generar un ID simple 
const generateId = () => Date.now().toString();


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // Reducer para el Registro
        registerUser: (state, action: PayloadAction<Omit<User, 'id' | 'bio' | 'avatar'>>) => {
            const newUser: User = {
                id: generateId(),
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password,
                bio: `Hola, soy ${action.payload.username}.`, 
                avatar: 'default-profile-pic.png',
            };
            
            state.isAuthenticated = true;
            state.user = newUser;
            state.users.push(newUser); 
        },
        
        // Reducer para el Login 
        loginUser: (state, action: PayloadAction<User>) => {
            state.isAuthenticated = true;
            state.user = action.payload;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
        }
    },
});

export const { registerUser, loginUser, logout } = authSlice.actions;
export default authSlice.reducer;