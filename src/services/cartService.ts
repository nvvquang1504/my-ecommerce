import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { CartItem } from "../types/Product";

export const saveCartToFirebase = async (userId: string, cartItems: CartItem[]): Promise<void> => {
    try {
        const cartRef = doc(db, "carts", userId);
        await setDoc(cartRef, {
            items: cartItems,
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error saving cart to Firebase:", error);
        throw error;
    }
};

export const loadCartFromFirebase = async (userId: string): Promise<CartItem[]> => {
    try {
        const cartRef = doc(db, "carts", userId);
        const cartDoc = await getDoc(cartRef);
        
        if (cartDoc.exists()) {
            const data = cartDoc.data();
            return data.items || [];
        }
        return [];
    } catch (error) {
        console.error("Error loading cart from Firebase:", error);
        return [];
    }
};

export const clearCartInFirebase = async (userId: string): Promise<void> => {
    try {
        const cartRef = doc(db, "carts", userId);
        await setDoc(cartRef, {
            items: [],
            updatedAt: new Date().toISOString()
        });
    } catch (error) {
        console.error("Error clearing cart in Firebase:", error);
        throw error;
    }
};
