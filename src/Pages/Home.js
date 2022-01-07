import React, { useState, useEffect, useContext } from 'react';
import ChatList from '../Components/ChatComponents/ChatList/ChatList';
import ChatContent from '../Components/ChatComponents/ChatContent/ChatContent';
import '../Styles/Home.scss';
import { getCookie } from '../Services/cookie';
import jwt_decode from "jwt-decode";
import { db, firestore } from '../Components/firebase';
import { ref, set, onValue, child, get } from 'firebase/database';
import { onSnapshot, query, where, collection, orderBy } from 'firebase/firestore';
import store from '../store';
// import LoadingContext from '../App';

export default function Home() {
    const [currentUserId, setCurrentUserId] = useState('');
    // const context = useContext(LoadingContext);
    // console.log(context);

    useEffect(() => {
        //context.loadHandle(true);
        const token = jwt_decode(getCookie("jwt"));
        if (token) {
            setCurrentUserId(token.id);
        }
        const userRef = collection(firestore, 'users');
        let tempArray = [];
        onSnapshot(userRef, (snapshot) => {
            snapshot.docs.forEach((item) => {
                tempArray.push({ ...item.data(), id: item.id });
            })
            store.dispatch({ type: 'SET_USERS_LIST', payload: tempArray });
        })
        
    }, []);

    useEffect(async () => {
        if (currentUserId) {
            const dbRef = ref(db);
            get(child(dbRef, `${currentUserId}`)).then((snapshot) => {
                if (snapshot.exists()) {
                    let array = [];
                    const data = snapshot.val();
                    const userArray = Object.keys(data);
                    userArray.forEach((item) => {
                        array.push({
                            id: item,
                            messages: Object.keys(data[item]).map((temp) => ({...data[item][temp], id: temp})).sort((a, b) => a.id < b.id)
                        })
                    })
                    store.dispatch({ type: 'SET_CHAT_USERS', payload: array });
                    //context.loadHandle(false);
                } else {
                    console.log("No data value");
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    });

    return (
        <div className="home-page">
            <ChatList />
            <ChatContent />
        </div>
    );
}