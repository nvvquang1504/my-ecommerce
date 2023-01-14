import React from 'react';
import styles from "./style.module.scss";
import registerImg from "../../assets/register.png";

import {Link, useNavigate} from "react-router-dom";
import {useState, useRef} from "react";
import {toast} from "react-toastify";
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from "../../services/firebase";
import Loader from "../../components/Loader";

const Register = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();
    const registerUser = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const cpassword = confirmPasswordRef.current?.value;
        if (email && password && cpassword) {
            if (password !== cpassword) {
                toast.error('Confirm password do not match');
            } else {
                setIsLoading(true)
                createUserWithEmailAndPassword(auth, email, password)
                    .then((userCredential) => {
                        // Signed in
                        const user = userCredential.user;
                        setIsLoading(false);
                        toast.success('Registration successful');
                        // Navigate to Login page
                        navigate('/login');
                    })
                    .catch((error) => {
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        setIsLoading(false);
                        toast.error(errorMessage);
                    });
            }
        }
    }
    return (
        <>
            {isLoading && <Loader/>}
            <section className={`container ${styles["auth"]}`}>
                <div className={'form-card-wrapper'}>
                    <div className={styles["form"]}>
                        <h2>Register</h2>
                        <form onSubmit={registerUser}>
                            <input ref={emailRef} type="text" placeholder='Email' required/>
                            <input ref={passwordRef} type="password" placeholder='Password' required/>
                            <input ref={confirmPasswordRef} type="password" placeholder='Confirm Password' required/>
                            <button className={'--btn --btn-primary --btn-block'}>Login</button>
                            <span className={styles["register"]}>
                            <p>Already an account?</p>
                            <Link to={'/login'}>Login</Link>
                        </span>
                        </form>
                    </div>
                </div>
                <div className={styles['img']}>
                    <img src={registerImg} alt="" width={400}/>
                </div>
            </section>
        </>

    );
};
export default Register;