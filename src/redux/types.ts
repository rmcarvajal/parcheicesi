// Interfaz para los Datos del Usuario
export interface User {
    id: string; 
    username: string;
    email: string;
    password: string; // Nota: Nunca almacenar contraseñas reales 
    bio: string;
    avatar: string;
}

// Interfaz del Estado de Autenticación
export interface AuthState {
    isAuthenticated: boolean;
    user: User | null;
    users: User[]; // simulación de base de datos JSON
}

// Tipos de Acción
export const REGISTER_SUCCESS = 'auth/REGISTER_SUCCESS';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGOUT = 'auth/LOGOUT';

// Interfaces Acciones específicas
export interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS;
    payload: User;
}

// para el Login
export interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: User;
}

export interface LogoutAction {
    type: typeof LOGOUT;
}

// Unión para todas las Acciones de Auth
export type AuthActionTypes = RegisterSuccessAction | LoginSuccessAction | LogoutAction;