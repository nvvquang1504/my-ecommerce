import {createSlice} from "@reduxjs/toolkit";

interface StoreInitialState {

}

const initialState: StoreInitialState = {}
export const admin = createSlice({
    name: 'admin',
    initialState,
    reducers: {}
})
export const {} = admin.actions;
export default admin.reducer;