import {GoogleAuthProvider, onAuthStateChanged, signInWithPopup} from "firebase/auth";
import React, {useState, useRef, useEffect} from "react";
import styles from './style.module.scss';
import loginImg from '../../assets/login.png';
import {Link, useNavigate} from 'react-router-dom';
import {FaGoogle} from 'react-icons/fa';
import Card from "../../components/Card";
import {toast} from "react-toastify";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../services/firebase";
import Loader from "../../components/Loader";

const Login = () => {

    const [isLoading, setIsLoading] = useState(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();
    const loginWithUser = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        if (email && password) {
            setIsLoading(true);
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    setIsLoading(false);
                    toast.success('Login successfull!');
                    navigate('/');// Navigate to homepage
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setIsLoading(false)
                    toast.error(errorMessage);
                });
        }
    }
    const signInWithGoogle = (event: React.SyntheticEvent) => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                toast.success('Login google successfully!');
                navigate('/');
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode !== 'auth/popup-closed-by-user') {
                    toast.error(errorMessage);
                }
            });
    }

    return (
        <>
            {isLoading && <Loader/>}
            <section className={`container ${styles.auth}`}>
                <div className={styles['img']}>
                    <img src={loginImg} alt="" width={400}/>
                </div>
                <Card>
                    <div className={styles["form"]}>
                        <h2>Login</h2>
                        <form onSubmit={loginWithUser}>
                            <input ref={emailRef} type="text" placeholder='Email' required/>
                            <input ref={passwordRef} type="password" placeholder='Password' required/>
                            <button className={'--btn --btn-primary --btn-block'}>Login</button>
                            <div className={styles.links}>
                                <Link to={'/reset'}>Reset Password</Link>
                            </div>
                            <p>-- or --</p>
                            <span className={'--btn --btn-danger --btn-block'} onClick={signInWithGoogle}>
                                <FaGoogle style={{marginRight: '5px'}} color={"#fff"}/> Login With Google
                            </span>
                            <span className={styles.register}>
                        <p>Don't have an account?</p>
                        <Link to={'/register'}>Register</Link>
                    </span>
                        </form>
                    </div>
                </Card>
            </section>
        </>
    )
};
export default Login;