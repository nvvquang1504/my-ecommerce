import React from 'react';
import styles from './style.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { ADD_TO_CART, REMOVE_FROM_CART, DECREASE_CART_ITEM, CLEAR_CART } from '../../redux/slice/cartSlice';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Cart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cartItems = useAppSelector(state => state.cart.cartItems);
    const totalAmount = useAppSelector(state => state.cart.totalAmount);
    const totalQuantity = useAppSelector(state => state.cart.totalQuantity);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);

    const handleIncrease = (id: string) => {
        const product = cartItems.find(item => item.id === id);
        if (product) {
            dispatch(ADD_TO_CART(product));
        }
    };

    const handleDecrease = (id: string) => {
        dispatch(DECREASE_CART_ITEM(id));
    };

    const handleRemove = (id: string, name: string) => {
        dispatch(REMOVE_FROM_CART(id));
        toast.success(`${name} removed from cart`);
    };

    const handleClearCart = () => {
        dispatch(CLEAR_CART());
        toast.success('Cart cleared');
    };

    const handleCheckout = () => {
        if (!isLoggedIn) {
            toast.info('Please login to checkout');
            navigate('/login');
        } else {
            toast.info('Checkout functionality coming soon!');
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className={styles.emptyCart}>
                <div className={styles.emptyContent}>
                    <h2>Your cart is empty</h2>
                    <p>Add some products to get started!</p>
                    <Link to='/products' className={styles.shopBtn}>
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.cartPage}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Shopping Cart</h1>
                    <button onClick={handleClearCart} className={styles.clearBtn}>
                        Clear Cart
                    </button>
                </div>

                <div className={styles.cartContent}>
                    <div className={styles.cartItems}>
                        {cartItems.map((item) => (
                            <div key={item.id} className={styles.cartItem}>
                                <div className={styles.itemImage}>
                                    <img src={item.imageUrl} alt={item.name} />
                                </div>
                                <div className={styles.itemDetails}>
                                    <h3>{item.name}</h3>
                                    <p className={styles.category}>{item.category}</p>
                                    <p className={styles.description}>{item.description}</p>
                                    <div className={styles.itemPrice}>
                                        ${item.price.toFixed(2)}
                                    </div>
                                </div>
                                <div className={styles.itemActions}>
                                    <div className={styles.quantityControl}>
                                        <button 
                                            onClick={() => handleDecrease(item.id)}
                                            className={styles.qtyBtn}
                                        >
                                            -
                                        </button>
                                        <span className={styles.quantity}>{item.quantity}</span>
                                        <button 
                                            onClick={() => handleIncrease(item.id)}
                                            className={styles.qtyBtn}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className={styles.itemTotal}>
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                    <button 
                                        onClick={() => handleRemove(item.id, item.name)}
                                        className={styles.removeBtn}
                                        title="Remove item"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.cartSummary}>
                        <h2>Order Summary</h2>
                        <div className={styles.summaryRow}>
                            <span>Items ({totalQuantity}):</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className={styles.summaryRow}>
                            <span>Shipping:</span>
                            <span>FREE</span>
                        </div>
                        <div className={`${styles.summaryRow} ${styles.total}`}>
                            <span>Total:</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <button onClick={handleCheckout} className={styles.checkoutBtn}>
                            Proceed to Checkout
                        </button>
                        <Link to='/products' className={styles.continueBtn}>
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
