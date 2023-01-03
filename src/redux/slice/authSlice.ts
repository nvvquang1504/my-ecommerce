import {createSlice} from "@reduxjs/toolkit";

interface StoreInitialState {
    isLoggedIn: boolean,
    email: string | null,
    userName: string | null,
    userId: string | null
}

const initialState: StoreInitialState = {
    isLoggedIn: false,
    email: null,
    userName: null,
    userId: null
}
export const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action) => {
            const {userId, email, userName} = action.payload;
            state.isLoggedIn = true;
            state.userId = userId;
            state.email = email;
            state.userName = userName;
        },
        REMOVE_ACTIVE_USER: (state) => {
            return initialState;
        }
    }
})
export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = auth.actions;
export default auth.reducer;