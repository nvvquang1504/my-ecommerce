import styles from './style.module.scss';
import {Link} from 'react-router-dom';


const logo = (
    <div className={styles.logo}>
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
const Header = () => {
    return (
        <header>
            <div className={styles.header}>
                {logo}
                <nav>
                    <ul>
                        <li>
                            <Link to={'/'}>
                                Home
                            </Link>
                        </li>
                    </ul>
                    <div className={styles.headerRight}></div>
                </nav>
            </div>
        </header>
    );
};

export default Header;