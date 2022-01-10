import { getCookie } from './cookie';
import jwt_decode from "jwt-decode";
import { onSnapshot, query, where, collection, orderBy } from 'firebase/firestore';
import { db, firestore } from '../Components/firebase';
import { ref, set, onValue, child, get } from 'firebase/database';

// get current user id
const getCurrentUserID = () => {
    const cookie = getCookie("jwt");
    if (cookie) {
        let currentUserId = jwt_decode(cookie);
        return currentUserId.id;
    } else {
        return;
    }
}

// get current user who is login
const getCurrentUser = (callback) => {
    const id = getCurrentUserID();

    // get user from firestore
    const userRef = collection(firestore, 'users');
    let q = query(userRef, where("emai"))
    let tempArray = [];
    onSnapshot(userRef, (snapshot) => {
        snapshot.docs.forEach((item) => {
            tempArray.push({ ...item.data(), id: item.id });
        })
        console.log(tempArray);
        callback(tempArray);
    })
}

// get all users is chatting with current user
const getAllChats = async (callback) => {
    let id = getCurrentUserID();
    if (id) {
        const dbRef = ref(db);
        get(child(dbRef, `${id}`)).then((snapshot) => {
            if (snapshot.exists()) {
                let array = [];
                const data = snapshot.val();
                const userArray = Object.keys(data);
                userArray.forEach((item) => {
                    array.push({
                        id: item,
                        messages: Object.keys(data[item]).map((temp) => ({ ...data[item][temp], id: temp })).sort((a, b) => a.id < b.id)
                    })
                })
                callback(array);
            } else {
                console.log("No data value");
                callback(null);
            }
        }).catch((error) => {
            console.log(error);
            callback(null);
        });
    }
}

// get all users in app
const getAllUserInApp = (callback) => {
    const userRef = collection(firestore, 'users');
    let tempArray = [];
    onSnapshot(userRef, (snapshot) => {
        snapshot.docs.forEach((item) => {
            tempArray.push({ ...item.data(), id: item.id });
        })
        callback(tempArray);
    })
}

const getUserWithUId = (uid, callback) => {
    
}

export { getCurrentUser, getCurrentUserID, getAllChats, getAllUserInApp };