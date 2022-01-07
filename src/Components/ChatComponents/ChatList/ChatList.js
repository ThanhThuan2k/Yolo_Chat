import { useEffect, useState } from 'react';
import store from '../../../store';
import ChatListHeader from "../ChatListHeader/ChatListHeader";
import ChatListContent from '../ChatListContent/ChatListContent';
import './ChatList.scss';

export default function ChatList() {
    const [messages, setMessage] = useState([]);

    useEffect(() => {
        let chatListData = [];
        store.subscribe(() => {
            const data = store.getState().HomePage;
            if (data.chatUsers && data.usersList) {
                data.chatUsers.forEach((item, index) => {
                    let id = item.id;
                    chatListData.push({
                        users: data.usersList.filter((item) => item.id === id).shift(),
                        messages: data.chatUsers.filter((item) => item.id === id).shift().messages
                    })
                })
            }
        })
        
        setMessage(chatListData);
    }, []);
    
    useEffect(() => {
        store.dispatch({type: 'SET_MESSAGES', payload: messages}); 
    })

    return (
        <div className="chat-list">
            <ChatListHeader />
            <ChatListContent />
        </div>
    );
}