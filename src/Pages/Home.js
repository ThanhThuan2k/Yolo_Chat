import React, { useState, useEffect } from 'react';
import ChatList from '../Components/ChatComponents/ChatList/ChatList';
import ChatContent from '../Components/ChatComponents/ChatContent/ChatContent';
import '../Styles/Home.scss';

import { getAllChats, getAllUserInApp } from '../Services/HomePageService';
import LoadingComponent from '../Components/share/LoadingComponent/LoadingComponent';

export const HomePageContext = React.createContext();

export default function Home() {
    // declare component's state
    const [chats, setChats] = useState([]);
    const [users, setUsers] = useState([]);
    const [messages, setMessages] = useState([]);

    const [currentChatUserId, setCurrentChatUserId] = useState('');
    const [currentChatUser, setCurrentChatUser] = useState({});
    const [currentChatMessages, setCurrentChatMesssages] = useState([]);

    useEffect(() => {
        getAllChats(setChats);
        getAllUserInApp(setUsers);
    }, []);

    useEffect(() => {
        var chatListData = [];
        if (users.length && chats.length) {
            chats.forEach((item) => {
                let id = item.id;
                chatListData.push({
                    users: users.filter((item) => item.id === id).at(0),
                    messages: chats.filter((item) => item.id === id).at(0).messages
                })
            })
        }
        setMessages(chatListData);
    }, [users, chats]);

    useEffect(() => {
        if (messages.length) {
            const firstUser = messages.at(0).users;
            setCurrentChatUser(firstUser);
            setCurrentChatUserId(firstUser.id);
        }
    }, [messages]);

    useEffect(() => {
        if (messages.length && currentChatUserId) {
            const t = messages.filter((item) => item.users.id == currentChatUserId).at(0);
            setCurrentChatMesssages(t.messages);
            setCurrentChatUser(t.users); 
        }
    }, [currentChatUserId]);

    const chooseChatUser = (id) => {
        setCurrentChatUserId(id);
    }

    const submitHandle = (data) => {
        console.log(data);
    }

    if (messages.length) {
        return (
            <HomePageContext.Provider value={{
                messages: messages,
                currentChatUserId: currentChatUserId,
                currentChatMessages: currentChatMessages,
                currentChatUser: currentChatUser,
                sendHandle: submitHandle,
                chooseChatUser: chooseChatUser
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