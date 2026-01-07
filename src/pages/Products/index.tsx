import React, { useEffect } from 'react';
import styles from './style.module.scss';
import ProductList from '../../components/ProductList';
import { products } from '../../data/products';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { LOAD_CART } from '../../redux/slice/cartSlice';
import { loadCartFromFirebase, saveCartToFirebase } from '../../services/cartService';

const Products = () => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.auth.userId);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const cartItems = useAppSelector(state => state.cart.cartItems);

    // Load cart from Firebase when user logs in
    useEffect(() => {
        if (isLoggedIn && userId) {
            loadCartFromFirebase(userId).then((items) => {
                dispatch(LOAD_CART(items));
            });
        }
    }, [isLoggedIn, userId, dispatch]);

    // Save cart to Firebase whenever cart changes
    useEffect(() => {
        if (isLoggedIn && userId) {
            saveCartToFirebase(userId, cartItems);
        }
    }, [cartItems, isLoggedIn, userId]);

    return (
        <div className={styles.productsPage}>
            <div className={styles.header}>
                <h1>Our Products</h1>
                <p>Discover our amazing collection of products</p>
            </div>
            <ProductList products={products} />
        </div>
    );
};

export default Products;
