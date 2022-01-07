import { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../App';
import "../Styles/Login.scss";
import { AiOutlineMail, AiFillLock, AiFillEye, AiFillEyeInvisible, AiFillFacebook, AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { db, firestore } from '../Components/firebase';
import { Link, useNavigate } from 'react-router-dom';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { sha512 } from 'js-sha512';
import { getCookie, setCookie } from '../Services/cookie';
import { jwtEncode } from '../Services/jwtService';
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    // password input area
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const context = useContext(LoadingContext);

    useEffect(() => {
        if (getCookie("jwt")) {
            navigate("/");
        }
    }, []);

    const submitHandle = (e) => {
        e.preventDefault();
        if (!username) {
            setUsernameError("Trường này không được để trống");
            return;
        } else {
            if (!String(username)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )) {
                setUsernameError("Vui lòng nhập đúng định dạng email");
                return;
            } else {
                setUsernameError('');
            }
        }

        if (!password) {
            setPasswordError("Trường này không được để trống");
            return;
        } else {
            setPasswordError('');
        }
        // login
        context.loadHandle(true);
        const colRef = collection(firestore, 'users');
        // get data with query
        const q = query(colRef, where("email", "==", username), where("password", "==", sha512(password)));

        onSnapshot(q, (snapshot) => {
            let data = [];
            snapshot.docs.forEach((doc) => {
                data.push({ ...doc.data(), id: doc.id });
            })

            if (data.length === 1) {
                let user = data.shift();
                let jwt = jwtEncode(user);
                setCookie("jwt", jwt, 30);
                context.loadHandle(false);
                navigate("/");
            }else{
                context.loadHandle(false);
                toast.error("Không tìm thấy tài khoản", {
                    position: toast.POSITION.BOTTOM_LEFT,
                    autoClose: 5000
                })
            }
        })
    }

    const signInWithGoogle = () => {

    }

    const signInWithFacebook = () => {

    }

    const signInWithGithub = () => {

    }

    return (
        <div className="login">
            <form onSubmit={(e) => submitHandle(e)} className="login-form">
                <h1 className="title">Đăng nhập</h1>
                <div className="username-group">
                    <div className="username-input-area">
                        <AiOutlineMail className="icon" />
                        <input type="text" className="username-input" value={username} placeholder="Email" onChange={(e) => setUsername(e.target.value)} autoComplete="off" />
                    </div>
                    <small className={usernameError ? "username-error" : "username-error disabled"}>{usernameError}</small>
                </div>
                <div className="password-group">
                    <div className="password-input-area">
                        <AiFillLock className="icon" />
                        <input type={showPassword ? "text" : "password"} className="password-input" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        {
                            showPassword ?
                                <AiFillEye className="opened-eye" onClick={() => setShowPassword(false)} /> :
                                <AiFillEyeInvisible className="closed-eye" onClick={() => setShowPassword(true)} />
                        }
                    </div>
                    <small className={passwordError ? "password-error" : "password-error disabled"}>{passwordError}</small>
                </div>
                <div className="remember-me-group">
                    <input type="checkbox" id="remember-me" className="remember-me" defaultChecked={true} onChange={(e) => setRememberMe(e.target.value)} />
                    <label htmlFor="remember-me" className="remember-me-label">Nhớ tài khoản của tôi</label>
                </div>
                <button type="submit" className="submit-button">
                    Đăng nhập
                </button>
                <div className="register-link">
                    Bạn chưa có tài khoản ? <Link to="/register" >Đăng kí</Link>
                </div>
                <div className="or">
                    <span>hoặc</span>
                </div>
                <div className="sign-in-with-google">
                    <button className="button" onClick={signInWithGoogle}>
                        <FcGoogle className="icon google-icon" />
                        Đăng nhập với Google
                    </button>
                </div>
                <div className="sign-in-with-facebook">
                    <button className="button" onClick={signInWithFacebook}>
                        <AiFillFacebook className="icon facebook-icon" />
                        Đăng nhập với Facebook
                    </button>
                </div>
                <div className="sign-in-with-github">
                    <button className="button" onClick={signInWithGithub}>
                        <AiOutlineGithub className="icon github-icon" />
                        Đăng nhập với Github
                    </button>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}