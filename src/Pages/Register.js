import React, { useState, useContext } from 'react';
import { AiOutlineMail, AiFillLock } from 'react-icons/ai';
import { AiOutlineQuestionCircle, AiFillFacebook, AiOutlineGithub, AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { FaUserTie } from 'react-icons/fa';
import '../Styles/Register.scss';
import { Link } from 'react-router-dom';
import { Button, Modal, Form } from 'react-bootstrap';
import { db, app, firestore, storage } from '../Components/firebase';
import { uploadBytesResumable, getDownloadURL, ref as storage_ref } from 'firebase/storage';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { setCookie } from '../Services/cookie';
import { jwtEncode } from '../Services/jwtService';
import { LoadingContext } from '../App';
import { sha512 } from 'js-sha512';

import UploadAvatar from '../Components/UploadAvatar';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [gioiTinh, setGioiTinh] = useState('Ẩn');
    const [avatar, setAvatar] = useState(null);

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [displayNameError, setDisplayNameError] = useState('');

    // password input areas
    const [showPassword, setShowPassword] = useState(false);

    // modal area
    const [avatarExplainShow, setAvatarExplainShow] = useState(false);
    const navigate = useNavigate();

    const context = useContext(LoadingContext);

    const getImage = (file) => {
        setAvatar(file);
    }
    const deleteImage = () => {
        setAvatar(null);
    }

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
            const colRef = collection(firestore, 'users');
            const q = query(colRef, where("email", "==", email));

            let data = [];
            onSnapshot(q, (snapshot) => {
                snapshot.docs.forEach((doc) => {
                    data.push({ ...doc.data(), id: doc.id });
                })
                if (data.length > 0) {
                    setEmailError("Email này đã tồn tại");
                    return;
                } else {
                    setEmailError('');
                    if (!password) {
                        setPasswordError("Trường này không được để trống");
                        return;
                    } else {
                        setPasswordError("");
                    }

                    if (!displayName) {
                        setDisplayNameError("Trường này không được để trống");
                        return;
                    } else {
                        setDisplayNameError("");
                    }
                    context.loadHandle(true);
                    register();
                }
            });
        }
    }

    const register = async () => {
        if (avatar) {
            const storageRef = storage_ref(storage, `/files/user/avatar/${avatar.name}`);
            const uploadTask = uploadBytesResumable(storageRef, avatar);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(prog);
                },
                (error) => console.log(error),
                async () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(async (url) => {
                            const docRef = await addDoc(collection(firestore, "users"), {
                                email: email,
                                password: sha512(password),
                                displayName: displayName,
                                gioiTinh: gioiTinh,
                                avatar: url,
                                createAt: Date.now(),
                                isOnline: true,
                            }).then((value) => {
                                var jwt = jwtEncode({ email: email, password: password, displayName: displayName, gioiTinh: gioiTinh, avatar: url });
                                setCookie("jwt", jwt, 30);
                                context.loadHandle(false);
                                navigate("/");
                            });
                        });
                }
            );
        } else {
            const defaultAvatar = "/share/avatar/default-user.png";
            const docRef = await addDoc(collection(firestore, "users"), {
                email: email,
                password: sha512(password),
                displayName: displayName,
                gioiTinh: gioiTinh,
                avatar: defaultAvatar,
                createAt: Date.now(),
                isOnline: true,
            }).then((value) => {
                var jwt = jwtEncode({ email: email, password: password, displayName: displayName, gioiTinh: gioiTinh, avatar: defaultAvatar });
                if (jwt) {
                    setCookie("jwt", jwt, 30);
                    context.loadHandle(false);
                    navigate("/");
                }
            });
        }
    }

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
        </>
    );
}