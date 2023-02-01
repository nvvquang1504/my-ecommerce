import React, {useEffect, useState} from 'react';
import styles from './style.module.scss';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {HiShoppingCart, HiOutlineMenuAlt3} from 'react-icons/hi';
import {FaTimes, FaUserCircle} from 'react-icons/fa';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth, cartRef} from "../../services/firebase";
import {toast} from "react-toastify";
import {useAppSelector, useAppDispatch} from '../../redux/hooks';
import {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} from "../../redux/slice/authSlice";
import {SET_CART_LIST} from "../../redux/slice/cartSlice";
import _ from 'lodash';
import ShowOnLogin from "../ShowOnLogin";
import ShowOnLogout from "../ShowOnLogout";
import {collection, getDocs} from "firebase/firestore";
import CartPopover from "./CartPopover";

const logo: JSX.Element = (
    <div className={styles["logo"]}>
        <Link to={'/'}>
            <h2>
                <span>C</span>
                <span>u</span>
                <span>b</span>
                <span>e</span>
                <span>Shop</span>.
            </h2>
        </Link>
    </div>
)
const generateCart: (quantity: number) => JSX.Element = (quantity) => {
    return (
        <span className={styles["cart"]}>
        <Link to={'/cart'}>
            Cart
            <HiShoppingCart size={20}/>
            <p>{quantity}</p>
        </Link>
    </span>
    )

}

const Header = () => {
    const [headerState, setHeaderState] = useState({
        showMenu: false,
        cartItems: [],
    })
    const [showMenu, setShowMenu] = useState(false);
    const userName = useAppSelector(state => state.auth.userName);
    const cartList = useAppSelector(state => state.cart.cartList);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }
    const hideMenu = () => {
        setShowMenu(false);
    }
    const activeLink = ({isActive}: { isActive: boolean }): string => {
        return isActive ? styles["active"] : "";
    }
    const logoutUser = (event: React.FormEvent<HTMLAnchorElement>) => {
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success('Logout Successfully.');
            dispatch(REMOVE_ACTIVE_USER());
            navigate('/');
        }).catch((error) => {
            // An error happened.
            toast.error('An error happened.')
        });
    }
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                const cartData: {}[] = []
                const {uid, email, displayName} = user;
                const cartItemCollection = collection(cartRef, uid, 'cartItems');
                // Get all document of the 'cart' collection
                const querySnapshot = await getDocs(cartItemCollection)
                querySnapshot.forEach((doc) => {
                    // doc.data() is never undefined for query doc snapshots
                    cartData.push(doc.data());
                });
                // Set card list
                dispatch(SET_CART_LIST(cartData));
                dispatch(SET_ACTIVE_USER({
                    userId: uid,
                    email: email,
                    userName: displayName ? displayName : _.camelCase(email?.substring(0, email.indexOf('@')))  // @gmail.com (10)
                }))
            }
        });
    }, [])
    return (
        <header>
            <div className={styles.header}>
                {logo}
                <nav className={showMenu ? `${styles["show-nav"]}` : `${styles["hide-menu"]}`}>
                    <div
                        onClick={hideMenu}
                        className={showMenu ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}` : `${styles["nav-wrapper"]}`}>
                    </div>
                    <ul>
                        <li className={styles["logo-mobile"]}>
                            {logo}
                            <FaTimes onClick={hideMenu} size={22} color={'#fff'}/>
                        </li>
                        <li>
                            <NavLink
                                to={'/'}
                                className={activeLink}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={'/contact'}
                                className={activeLink}
                            >
                                Contact Us
                            </NavLink>
                        </li>
                    </ul>
                    <div onClick={hideMenu} className={styles["header-right"]}>
                        <span className={styles.links}>
                            <ShowOnLogout>
                                <NavLink to={'/login'} className={activeLink}>
                                    Login
                                </NavLink>
                            </ShowOnLogout>
                            <ShowOnLogin>
                                <a href="" style={{color: '#ff7722'}}>
                                    <FaUserCircle size={16}/>
                                    Hi, {userName}
                                </a>
                            </ShowOnLogin>
                            <ShowOnLogout>
                                <NavLink to={'/register'} className={activeLink}>Register</NavLink>
                            </ShowOnLogout>
                            <ShowOnLogin>
                                <NavLink to={'/order-history'} className={activeLink}>My Orders</NavLink>
                            </ShowOnLogin>
                            <ShowOnLogin>
                                <NavLink to={'/'} onClick={logoutUser}>Sign out</NavLink>
                            </ShowOnLogin>
                        </span>
                        <CartPopover cartList={cartList}/>
                        {/*{generateCart(cartList ? cartList.length : 0)}*/}
                    </div>

                </nav>
                <div className={styles["menu-icon"]}>
                    {/*{generateCart(cartList ? cartList.length : 0)}*/}
                    <HiOutlineMenuAlt3 onClick={toggleMenu} size={28}/>
                </div>
            </div>
        </header>
    );
};
export default Header;