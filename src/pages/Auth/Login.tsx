import styles from './style.module.scss';
import loginImg from '../../assets/login.png'
import {Link} from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa'
import Card from "../../components/Card";

const Login = () => {
    return (
        <section className={`container ${styles["auth"]}`}>
            <div className={styles['img']}>
                <img src={loginImg} alt="" width={400}/>
            </div>
            <Card>
                <div className={styles["form"]}>
                    <h2>Login</h2>
                    <form action="">
                        <input type="text" placeholder='Email'/>
                        <input type="password" placeholder='Password'/>
                        <button className={'--btn --btn-primary --btn-block'}>Login</button>
                        <div className={styles["links"]}>
                            <Link to={'/reset'}>Reset Password</Link>
                        </div>
                        <p>-- or --</p>
                        <button className={'--btn --btn-danger --btn-block'}>
                            <FaGoogle style={{marginRight: '5px'}} color={"#fff"}/> Login With Google
                        </button>
                        <span className={styles["register"]}>
                        <p>Don't have an account?</p>
                        <Link to={'/register'}>Register</Link>
                    </span>
                    </form>
                </div>
            </Card>

        </section>
    );
};

export default Login;