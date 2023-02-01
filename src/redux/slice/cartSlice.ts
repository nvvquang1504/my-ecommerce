import {createSlice} from "@reduxjs/toolkit";

export type ICartSlice = {
    cartList: {}[] | null,
}

const initialState: ICartSlice = {
    cartList: null,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        SET_CART_LIST: (state, action) => {
            state.cartList = action.payload;
        }
    }
})
export const {SET_CART_LIST} = cartSlice.actions;
export default cartSlice.reducer;
