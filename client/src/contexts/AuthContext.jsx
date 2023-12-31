import {createContext, useEffect, useReducer} from "react";
import axios from "axios";
import {authReducer} from "../reducers/AuthReducer.jsx";
import {apiUrl, LOCAL_STORAGE_TOKEN_NAME} from "./constants.jsx";
import setAuthToken from "../ultis/setAuthToken.jsx";
//
export const AuthContext = createContext()
//
const AuthContextProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        isAuthenticated: false,
        user: null
    })
    // Authenticate user
    useEffect(() => {
        const loadUser = async () => {
            if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
                setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME]);
            }

            try {
                const response = await axios.get(`${apiUrl}/auth`);
                if (response.data.success) {
                    dispatch({
                        type: "SET_AUTH",
                        payload: {isAuthenticated: true, user: response.data.user},
                    });
                } else {
                    dispatch({
                        type: "SET_AUTH",
                        payload: {isAuthenticated: false, user: null},
                    });
                }
            } catch (error) {
                localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
                setAuthToken(null);
                dispatch({
                    type: "SET_AUTH",
                    payload: {isAuthenticated: false, user: null},
                });
            }

            dispatch({type: "SET_LOADING", payload: false});
        };

        loadUser();
    }, []);


    //Login
    const loginUser = async (userForm) => {
        try {
            const response = await axios.post(`${apiUrl}/auth/login`, userForm);
            if (response.data.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                );
                dispatch({type: "SET_AUTH", payload: {isAuthenticated: true}});
            }
            return response.data;
        } catch (error) {
            if (error.response.data) return error.response.data;
            else return {success: false, message: error.message};
        }
    };


    // Register
    const registerUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/auth/register`, userForm)
            if (response.data.success)
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    response.data.accessToken
                )
            return response.data
        } catch (error) {
            if (error.response.data) return error.response.data
            else return {success: false, message: error.message}
        }
    }
    //logout
    const logoutUser = () => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
        dispatch({
            type: 'SET_AUTH',
            payload: {isAuthenticated: false, user: null}
        });
    }
    //Context Data
    const authContextData = {loginUser, registerUser, logoutUser, authState}

    // Return provider
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;
