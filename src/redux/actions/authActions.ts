import {
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    User,
    RegisterSuccessAction,
} from '../types';

// Función para generar un ID simple 
const generateId = () => Date.now().toString();

// Acción para el Registro
export const registerUser = (
    userData: Omit<User, 'id' | 'bio' | 'avatar'> // Omitimos campos que la acción creará
): RegisterSuccessAction => {
    
    // Creamos el objeto JSON completo con datos por defecto
    const newUser: User = {
        id: generateId(),
        username: userData.username,
        email: userData.email,
        password: userData.password,
        bio: `Hola, soy ${userData.username}, estudiante de Icesi.`,
        avatar: 'default-profile-pic.png', 
    };

    return {
        type: REGISTER_SUCCESS,
        payload: newUser,
    };
};

// Acción para el Login 
export const loginUser = (
    credentials: Omit<User, 'id' | 'bio' | 'avatar'>, 
    usersList: User[]
): LoginSuccessAction | { type: 'LOGIN_FAILURE', payload: string } => {
    // Simulación de búsqueda en el JSON (usersList)
    const foundUser = usersList.find(
        u => u.username === credentials.username && u.password === credentials.password
    );

    if (foundUser) {
        return {
            type: LOGIN_SUCCESS,
            payload: foundUser,
        } as LoginSuccessAction; // Aseguramos el tipo si la búsqueda fue exitosa
    } else {
        return { type: 'LOGIN_FAILURE', payload: 'Credenciales inválidas.' };
    }
};