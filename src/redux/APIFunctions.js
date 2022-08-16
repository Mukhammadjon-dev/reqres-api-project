import axios from "axios"
import { setLoading } from "./actions/usersAction";

export const requestUsers = async (page) => {
    try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setLoading(false);

        return {
            users: response.data.data,
            totalPages: response.data.total_pages
        }
    } catch (error) {
        console.log(error);
    }
}

export const requestCurrentUser = async (userId) => {
    try {
        setLoading(true);
        const response = await axios.get(`https://reqres.in/api/users/${userId}`);
        setLoading(false);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const updateUser = async (userId, data) => {
    try {
        setLoading(true);
        const response = await axios.patch(`https://reqres.in/api/users/${userId}`, { ...data });
        setLoading(false);
        console.log('USER UPDATE', response);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        setLoading(true);
        const response = await axios.post(`https://reqres.in/api/login}`, { email, password });
        setLoading(false);
        return createToken(email);
    } catch (error) {
        console.log(error);
    }
}

export const registerUser = async (data) => {
    try {
        setLoading(true);
        const response = await axios.post(`https://reqres.in/api/register}`, data);
        setLoading(false);
        console.log(response.data, 'REGISTER USER');
        return { token: createToken(data.email), user: response.data }
    } catch (error) {
        console.log(error);
    }
}

const createToken = (email) => {
    const token = email.split('').map(letter => {
        return Math.ceil(Math.random() * 100) + letter
    }).join('');
    return token;
}