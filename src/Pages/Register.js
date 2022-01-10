import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineMail, AiFillLock } from 'react-icons/ai';
import { AiOutlineQuestionCircle, AiFillFacebook, AiOutlineGithub, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaUserTie } from 'react-icons/fa';
import '../Styles/Register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import UploadAvatar from '../Components/UploadAvatar';
import { LoadingContext } from '../App';
import { storage, firestore } from '../Components/firebase';
import { uploadBytesResumable, getDownloadURL, ref as storage_ref } from 'firebase/storage';
import { collection, addDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import {toast, ToastContainer} from 'react-toastify';

export default function Register() {
    // create state for register
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [gioiTinh, setGioiTinh] = useState('Ẩn');
    const [showExplain, setShowExplain] = useState(true);
    const [avatar, setAvatar] = useState(null);
    const [displayNameError, setDisplayNameError] = useState('');
    const [avatarExplainShow, setAvatarExplainShow] = useState(false);
    const [avatarURL, setAvatarURL] = useState('');

    const context = useContext(LoadingContext);
    const navigate = useNavigate();

    const submitHandle = (e) => {
        e.preventDefault();

        if (!email) {
            setEmailError('Trường này không được để trống');
            return;
        } else if (!String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {
            setEmailError("Vui lòng nhập đúng định dạng email");
            return;
        } else {
            setEmailError("");
            if (!password) {
                setPasswordError("Trường này không được để trống");
                return;
            } else if (password.length < 6) {
                setPasswordError("Mật khẩu tối thiểu 6 kí tự");
            } else {
                setPasswordError("");
                if (!displayName) {
                    setDisplayNameError("Trường này không được để trống");
                } else {
                    context.loadHandle(true);
                    register();
                }
            }
        }
    }

    const getImage = (file) => {
        setAvatar(file);
    }
    const deleteImage = () => {
        setAvatar(null);
    }

    const uploadImage = () => {
        if (avatar) {
            const storageRef = storage_ref(storage, `/files/${avatar.name}`);
            const uploadTask = uploadBytesResumable(storageRef, avatar);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(prog);
                },
                (error) => console.log(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => {
                            console.log(url);
                            setAvatarURL(url);
                        });
                }
            );
        } else {
            console.log("File not uploaded")
        }
    }

    const register = () => {
        // create auth variable
        let auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // const user = userCredential.user;
                uploadImage();
            })
            .catch(error => {
                if (error.code == 'auth/email-already-in-use') {
                    setEmailError("Email đã tồn tại");
                }
            })
    }

    useEffect( async () => {
        if (avatarURL) {
            let auth = getAuth();
            const user = auth.currentUser;
            
            const thisUser = {
                email: user.email,
                displayName: displayName,
                uid: user.uid,
                photoURL: avatarURL,
                phoneNumber: user.phoneNumber,
                emailVerify: user.emailVerified,
                createdAt: user.metadata.createdAt
            };

            try {
                const docRef = await addDoc(collection(firestore, 'users'), thisUser);
                context.loadHandle(false);
                navigate("/");
            } catch (error) {
                console.log(error);
                toast.error("Server lỗi kết nối, vui lòng thử lại sau hoặc kiểm tra đường truyền");
            }
        }
    }, [avatarURL]);

    return (
        <>
            <div className="register" id="register">
                <form className="register-form" onSubmit={submitHandle}>
                    <h1 className="title">Đăng kí</h1>
                    <div className={emailError ? "email-group has-error" : "email-group"}>
                        <AiOutlineMail className="icon" />
                        <input type="text" className="email-input input-element" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <small className={emailError ? "email-error" : "email-error disabled"}>{emailError}</small>
                    <div className={passwordError ? "password-group has-error" : "password-group"}>
                        <AiFillLock className="icon" />
                        <input type={showPassword ? "text" : "password"} className="password-input input-element" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        {
                            showPassword ?
                                <AiFillEye className="opened-eye" onClick={() => setShowPassword(false)} /> :
                                <AiFillEyeInvisible className="closed-eye" onClick={() => setShowPassword(true)} />
                        }
                    </div>
                    <small className={passwordError ? "password-error" : "password-error disabled"}>{passwordError}</small>
                    <div className={displayNameError ? "display-name-group has-error" : "display-name-group"}>
                        <FaUserTie className="icon" />
                        <input type="text" className="display-name-input input-element" value={displayName} onChange={(e) => setDisplayName(e.target.value)} placeholder="Tên hiển thị" />
                    </div>
                    <small className={displayNameError ? "display-name-error" : "display-name-error disabled"}>{displayNameError}</small>
                    <div className="gioi-tinh">
                        <span className="gioi-tinh-title">Giới tính</span>
                        <div className="gioi-tinh-select">
                            <Form.Check
                                inline
                                label="Nam"
                                name="gioi-tinh"
                                type="radio"
                                onChange={() => setGioiTinh("Nam")}
                            />
                            <Form.Check
                                inline
                                label="Nữ"
                                name="gioi-tinh"
                                type="radio"
                                onChange={() => setGioiTinh("Nữ")}
                            />
                            <Form.Check
                                inline
                                label="Ẩn"
                                name="gioi-tinh"
                                type="radio"
                                onChange={() => setGioiTinh("Ẩn")}
                            />
                        </div>
                    </div>
                    <div className="avatar-upload">
                        <span className="avatar-span">Avatar</span>
                        <UploadAvatar getImage={getImage} deleteImage={deleteImage} />
                        <AiOutlineQuestionCircle className="explain" onClick={() => setAvatarExplainShow(true)} />
                    </div>
                    <button type="submit" className="submit-button">
                        Đăng kí
                    </button>
                    <div className="register-link">
                        Đã có tài khoản ? <Link to="/login" >Đăng nhập</Link>
                    </div>
                    <div className="or">
                        <span>hoặc</span>
                    </div>
                    <button type="button" className="sign-up-with-google">
                        <FcGoogle className="icon google-icon" />
                        Đăng nhập với Google
                    </button>
                    <button type="button" className="sign-up-with-facebook">
                        <AiFillFacebook className="icon facebook-icon" />
                        Đăng nhập với Facebook
                    </button>
                    <button type="button" className="sign-up-with-github">
                        <AiOutlineGithub className="icon github-icon" />
                        Đăng nhập với Github
                    </button>
                </form>
            </div>
            <Modal
                show={avatarExplainShow}
                onHide={() => setAvatarExplainShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Avatar
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: '1.3rem' }}>
                        Tải lên ảnh đại diện của bạn, ảnh đại diện được đặt ở chế độ công khai, bạn có thể thay đổi ảnh đại diện bất kì lúc nào. Nếu không tải lên ảnh nào, hệ thống sẽ lấy ảnh mặc định.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setAvatarExplainShow(false)}>Đóng</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showExplain}
                onHide={() => setShowExplain(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Chào mừng đến với Yolo Chat
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{ fontSize: '1.3rem' }}>
                        - Website được tạo ra nhằm mục đích phục vụ nghiên cứu học tập, không nhằm mục đích kinh doanh. Trong quá trình sử dụng website, vui lòng không sử dụng ngôn từ đả kích, xúc phạm người khác. <br />
                        - Website đang trong quá trình phát triển, vui lòng để lại đóng góp ý kiến <a href="#">tại đây</a> hoặc pull requests <a href="https://github.com/ThanhThuan2k/Yolo_Chat.git" target="_blank">https://github.com/ThanhThuan2k/Yolo_Chat.git</a> <br />
                        - Email: thuanhuynh.190800@gmail.com <br />
                        - Facebook: <a href="https://www.facebook.com/rong.bay.31586/" target="_blank">https://www.facebook.com/rong.bay.31586/</a> <br />
                        - Github: <a href="https://github.com/ThanhThuan2k" target="_blank">https://github.com/ThanhThuan2k</a> <br /> <br />
                        Tác giả: Huỳnh Thanh Thuận (DINO Yolo)
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowExplain(false)}>Đóng</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer />
        </>
    );
}