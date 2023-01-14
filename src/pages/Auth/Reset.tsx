import React, {useRef} from "react";
import styles from "./style.module.scss";
import forgotImg from "../../assets/forgot.png";
import {Link} from "react-router-dom";
import {sendPasswordResetEmail} from "firebase/auth";
import {auth} from "../../services/firebase";
import {toast} from "react-toastify";


const Reset = () => {
    const emailRef = useRef<HTMLInputElement | null>(null);
    console.log(auth.currentUser)
    const resetPassword = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        emailRef.current?.value &&
        sendPasswordResetEmail(auth, emailRef.current?.value)
            .then(() => {
                toast.success('Reset password successfully');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                toast.error(errorMessage);
            });
    }
    return (
        <section className={`container ${styles["auth"]}`}>
            <div className={styles['img']}>
                <img src={forgotImg} alt="" width={400}/>
            </div>
            <div className={'form-card-wrapper'}>
                <div className={styles.form}>
                    <h2>Reset Password</h2>
                    <form onSubmit={resetPassword}>
                        <input ref={emailRef} type="email" placeholder='Email' required/>
                        <button type={'submit'} className={'--btn --btn-primary --btn-block'}>Reset Password</button>
                        <div className={styles.links}>
                            <p>
                                <Link to={'/login'}>- Login</Link>
                            </p>
                            <p>
                                <Link to={'/register'}>- Register</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
export default Reset;