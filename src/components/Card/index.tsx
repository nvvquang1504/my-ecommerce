import styles from './style.module.scss';

const Card = ({children}: { children: JSX.Element }): JSX.Element => {
    return (
        <div className={`${styles["card"]}`}>
            {children}
        </div>
    );
};

export default Card;