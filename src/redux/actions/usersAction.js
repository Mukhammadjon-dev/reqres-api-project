import { loginUser, registerUser, requestCurrentUser, requestUsers, updateUser } from "../APIFunctions";
import { dispatch } from "../store";
import { GET_USERS, REGISTER_USER, SET_CURRENT_USER, SET_CURRENT_USER_LOCALLY, SET_LOADING, SIGN_IN_AND_GET_TOKEN, UPDATE_USER } from "../types";

export const getUsers = async (page) => {
    const responseData = await requestUsers(page);
    dispatch({ type: GET_USERS, payload: { users: responseData.users, totalPages: responseData.totalPages } });
};

export const setLoading = (state) => {
    dispatch({ type: SET_LOADING, payload: state });
}

export const setCurrentUser = async (userId) => {
    const userData = await requestCurrentUser(userId);
    dispatch({ type: SET_CURRENT_USER, payload: userData });
}

export const setCurrentUserLocally = async (userId) => {
    dispatch({ type: SET_CURRENT_USER_LOCALLY, payload: userId });
}

export const updateUserData = async (userId, data) => {
    const updatedUser = await updateUser(userId, data);
    dispatch({ type: UPDATE_USER, payload: { id: userId, data } });
}

export const signInUserAndGetToken = async (data) => {
    console.log('email', data)
    const token = await loginUser(data);
    dispatch({ type: SIGN_IN_AND_GET_TOKEN, payload: { token, email: data.email } });
}

export const registerNewUser = async (data) => {
    console.log('register', data)
    const registerData = await registerUser(data);
    dispatch({ type: REGISTER_USER, payload: { data: registerData.user, token: registerData.token } });
}

