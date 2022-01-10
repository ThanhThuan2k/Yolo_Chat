import { useState, useEffect, useContext } from 'react';
import { LoadingContext } from '../App';
import "../Styles/Login.scss";
import { AiOutlineMail, AiFillLock, AiFillEye, AiFillEyeInvisible, AiFillFacebook, AiOutlineGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { getCookie, setCookie } from '../Services/cookie';
import { toast, ToastContainer } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [username, setUsername] = useState('thuanhuynh.190800@gmail.com');
    const [password, setPassword] = useState('123456');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rememberMe, setRememberMe] = useState(true);

    // password input area
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const context = useContext(LoadingContext);

    useEffect(() => {
        const auth = getAuth();
        if (auth.currentUser) {
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
        } else if (password.length < 6) {
            setPasswordError("Mật khẩu quá ngắn");
            return;
        }
        else {
            setPasswordError('');
        }
        // login
        context.loadHandle(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, username, password)
            .then((userCredential) => {
                // context.loadHandle(false);
                const user = userCredential.user;
                context.loadHandle(false);
                navigate("/");
            })
            .catch((error) => {
                context.loadHandle(false);
                switch (error.code) {
                    case 'auth/user-not-found':
                        toast.error("Không tìm thấy tài khoản");
                        return;
                    case 'auth/wrong-password':
                        toast.error("Sai mật khẩu");
                        return;
                    default:
                        toast.error(error.code);
                        return;
                }
            });
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