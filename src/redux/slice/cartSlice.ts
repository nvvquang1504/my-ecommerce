import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem, Product } from "../../types/Product";

interface CartState {
    cartItems: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}

const initialState: CartState = {
    cartItems: [],
    totalQuantity: 0,
    totalAmount: 0
};

const calculateTotals = (items: CartItem[]) => {
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    const totalAmount = items.reduce((total, item) => total + item.price * item.quantity, 0);
    return { totalQuantity, totalAmount };
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        ADD_TO_CART: (state, action: PayloadAction<Product>) => {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload.id
            );
            
            if (productIndex >= 0) {
                // Product already in cart, increase quantity
                state.cartItems[productIndex].quantity += 1;
            } else {
                // Add new product to cart
                const newItem: CartItem = { ...action.payload, quantity: 1 };
                state.cartItems.push(newItem);
            }
            
            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalAmount = totals.totalAmount;
        },
        REMOVE_FROM_CART: (state, action: PayloadAction<string>) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload
            );
            
            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalAmount = totals.totalAmount;
        },
        DECREASE_CART_ITEM: (state, action: PayloadAction<string>) => {
            const productIndex = state.cartItems.findIndex(
                (item) => item.id === action.payload
            );
            
            if (productIndex >= 0) {
                if (state.cartItems[productIndex].quantity > 1) {
                    state.cartItems[productIndex].quantity -= 1;
                } else {
                    state.cartItems = state.cartItems.filter(
                        (item) => item.id !== action.payload
                    );
                }
            }
            
            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalAmount = totals.totalAmount;
        },
        CLEAR_CART: (state) => {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.totalAmount = 0;
        },
        LOAD_CART: (state, action: PayloadAction<CartItem[]>) => {
            state.cartItems = action.payload;
            const totals = calculateTotals(state.cartItems);
            state.totalQuantity = totals.totalQuantity;
            state.totalAmount = totals.totalAmount;
        }
    }
});

export const { 
    ADD_TO_CART, 
    REMOVE_FROM_CART, 
    DECREASE_CART_ITEM, 
    CLEAR_CART,
    LOAD_CART 
} = cartSlice.actions;

export default cartSlice.reducer;
