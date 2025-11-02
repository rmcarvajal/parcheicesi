import {
    AuthState,
    AuthActionTypes,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
} from '../types'; 

const initialState: AuthState = {
    isAuthenticated: false,
    user: null,
    users: [],
};

const authReducer = (
    state = initialState,
    action: AuthActionTypes 
): AuthState => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
                users: [...state.users, action.payload],
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default authReducer;