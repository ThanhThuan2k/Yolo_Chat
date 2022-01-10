import React, { useState, useEffect } from 'react';
import ChatList from '../Components/ChatComponents/ChatList/ChatList';
import ChatContent from '../Components/ChatComponents/ChatContent/ChatContent';
import '../Styles/Home.scss';
import { db, firestore } from '../Components/firebase';
import { ref, set, onValue, child, get } from "firebase/database";
import { getAuth } from "firebase/auth";
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy } from 'firebase/firestore';
import LoadingComponent from '../Components/share/LoadingComponent/LoadingComponent';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../Services/cookie';

export const HomePageContext = React.createContext();

export default function Home() {
    const [currentUserId, setCurrentUserId] = useState('');
    const [users, setUsers] = useState([]);
    const [chat, setChat] = useState('');
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();
        if (auth.currentUser) {
            setCurrentUserId(auth.currentUser.uid);
        } else {
            navigate("/login");
        }
    }, []);

    useEffect(() => {
        if (currentUserId) {
            // get all user
            const userRef = collection(firestore, 'users');
            const q = query(userRef, where('uid', 'not-in', [currentUserId]));
            const unsub = onSnapshot(q, querySnapshot => {
                let usersArray = [];
                querySnapshot.forEach((item) => {
                    usersArray.push({ ...item.data(), id: item.id });
                });
                setUsers(usersArray);
            })
            return () => unsub();
        }
    }, [currentUserId]);

    useEffect(() => {
        console.log(users);
    }, [users]);

    const selectUser = (user) => {
        setChat(user);
        const user1 = currentUserId;
        const user2 = user.uid;
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        const messageRef = collection(firestore, 'messages', id, 'chat');
        const q = query(messageRef, orderBy('createAt', 'asc'));

        onSnapshot(q, querySnapshot => {
            let messages = [];
            querySnapshot.forEach((item) => {
                messages.push(item.data());
            })
            setMessages(messages);
        })
    }

    const sendHandle = async (text) => {
        console.log(text);
        const user1 = currentUserId;
        const user2 = chat.uid;
        console.log(user1, user2);
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`;
        await addDoc(collection(firestore, `messages/${id}/chat`), {
            content: text,
            from: user1,
            to: user2,
            createAt: Timestamp.fromDate(new Date()),
        });
    }

    if (users.length) {
        return (
            <HomePageContext.Provider value={{
                users: users,
                selectUser: selectUser,
                chat: chat,
                sendHandle: sendHandle,
                messages: messages,
            }}>
                <div className="home-page">
                    <ChatList />
                    <ChatContent />
                </div>
            </HomePageContext.Provider>
        );
    } else {
        return (
            <LoadingComponent height={'100vh'} />
        );
    }
}