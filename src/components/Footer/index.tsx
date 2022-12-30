import styles from './style.module.scss';


const date = new Date();
const year = date.getFullYear();
const Footer = () => {
    return (
        <div className={styles["footer"]}>
            &copy; {year} All Right Reserved
        </div>
    );
};

export default Footer;