import { firestore } from '../Components/firebase';
import { collection, onSnapshot, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

// get all data from firestore
const getDocument = () => {
    const colRef = collection(firestore, 'users');
    const q = query(colRef);

    let data = [];
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        })
        return data;
    });
}

// get data with conditionals
const getDataWithCondition = (document, fieldPath, operator = "==", value = "") => {
    const colRef = collection(firestore, document);
    const q = query(colRef, where(fieldPath, operator, value));

    let data = [];
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        });
        return data;
    });
}

// check value is exist
const isExist = (document, fieldPath, value, callback) => {
    const colRef = collection(firestore, document);
    const q = query(colRef, where(fieldPath, "==", value));

    let data = [];
    onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            data.push({ ...doc.data(), id: doc.id });
        })
    })
}

const createUser = async (email, password, fullname, gioiTinh, avatar = "/share/avatar/default-user.png") => {
    try {
        const docRef = await addDoc(collection(firestore, "users"), {
            email: email,
            password: password,
            displayName: fullname,
            gioiTinh: gioiTinh,
            avatar: avatar
        });
    } catch (error) {
        console.log(error);
    }
}

export {
    getDocument,
    getDataWithCondition,
    isExist
}