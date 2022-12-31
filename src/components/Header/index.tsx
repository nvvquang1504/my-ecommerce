import React, {useState} from 'react';
import styles from './style.module.scss';
import {Link, NavLink, useNavigate} from 'react-router-dom';
import {HiShoppingCart, HiOutlineMenuAlt3} from 'react-icons/hi';
import {FaTimes} from 'react-icons/fa';
import {signOut} from 'firebase/auth';
import {auth} from "../../services/firebase";
import {toast} from "react-toastify";

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
const cart: JSX.Element = (
    <span className={styles["cart"]}>
        <Link to={'/cart'}>
            Cart
            <HiShoppingCart size={20}/>
            <p>0</p>
        </Link>
    </span>
)
const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
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
            toast.success('Logout Successfully.')
            navigate('/')
        }).catch((error) => {
            // An error happened.
            toast.error('An error happened.')
        });
    }
    return (
        <header>
            <div className={styles["header"]}>
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
                        <span className={styles["links"]}>
                            <NavLink to={'/login'} className={activeLink}>Login</NavLink>
                            <NavLink to={'/register'} className={activeLink}>Register</NavLink>
                            <NavLink to={'/order-history'} className={activeLink}>My Orders</NavLink>
                            <NavLink to={'/order-history'} className={activeLink}>My Orders</NavLink>
                            <NavLink to={'/'} className={activeLink} onClick={logoutUser}>Sign out</NavLink>
                        </span>
                        {cart}
                    </div>

                </nav>
                <div className={styles["menu-icon"]}>
                    {cart}
                    <HiOutlineMenuAlt3 onClick={toggleMenu} size={28}/>
                </div>
            </div>
        </header>
    );
};
export default Header;