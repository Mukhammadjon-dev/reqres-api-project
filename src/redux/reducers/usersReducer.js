import { GET_USERS, REGISTER_USER, SET_CURRENT_USER, SET_CURRENT_USER_LOCALLY, SET_LOADING, SIGN_IN_AND_GET_TOKEN, UPDATE_USER } from "../types";

const initialState = {
    usersList: [],
    loading: true,
    totalPages: 1,
    currentUser: {},
    token: '',
    activeUser: {}
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USERS:
            return {
                ...state,
                usersList: [...action.payload.users],
                totalPages: action.payload.totalPages
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
        case UPDATE_USER:
            const newUsersList = state.usersList.map(user => {
                if (user.id === action.payload.id) return { ...user, ...action.payload.data }
                return user
            })

            return {
                ...state,
                usersList: [...newUsersList],
                currentUser: { ...state.currentUser, ...action.payload.data }
            }
        case SIGN_IN_AND_GET_TOKEN:
            const newActiveUser = state.usersList.find(user => user.email === action.payload.email)
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                token: action.payload.token,
                activeUser: { ...newActiveUser }
            }
        case REGISTER_USER:
            console.log('OLD TOTAL PAGES', state.totalPages)
            localStorage.setItem('token', action.payload.token);
            console.log((state.totalPages * 6 + 1) / 6)
            const totalPages = Math.ceil((state.totalPages * 6 + 1) / 6);
            console.log(totalPages)
            return {
                ...state,
                usersList: [action.payload.data, ...state.usersList],
                token: action.payload.token,
                activeUser: { ...action.payload.data },
                totalPages
            }
        case SET_CURRENT_USER_LOCALLY:
            console.log('FIND LOCAL USER')
            const newCurrentUser = state.usersList.find(user => user.id === action.payload)
            return {
                ...state,
                currentUser: { ...newCurrentUser }
            }
        default:
            return state;
    }
};

export default usersReducer;