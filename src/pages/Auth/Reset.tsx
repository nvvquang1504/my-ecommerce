import styles from "./style.module.scss";
import forgotImg from "../../assets/forgot.png";
import Card from "../../components/Card";
import {Link} from "react-router-dom";
import {FaGoogle} from "react-icons/fa";

const Reset = () => {
    return (
        <section className={`container ${styles["auth"]}`}>
            <div className={styles['img']}>
                <img src={forgotImg} alt="" width={400}/>
            </div>
            <Card>
                <div className={styles["form"]}>
                    <h2>Reset Password</h2>
                    <form action="">
                        <input type="text" placeholder='Email' required/>
                        <button className={'--btn --btn-primary --btn-block'}>Reset Password</button>
                        <div className={styles["links"]}>
                            <p>
                                <Link to={'/login'}>- Login</Link>
                            </p>
                            <p>
                                <Link to={'/register'}>- Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </Card>
        </section>
    );
};

export default Reset;