import { useState, useEffect, useContext } from 'react';
import ChatReview from '../ChatReview/ChatReview';
import "./ChatListContent.scss";
import { HomePageContext } from '../../../Pages/Home';

export default function ChatListContent() {
    const context = useContext(HomePageContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let array = [];
        context.messages.forEach((message) => {
            array.push({
                user: message.users,
                newMessages: message.messages.at(-1)
            })
        })
        setUsers(array);
    }, []);

    return (
        <div className="chat-list-content">
            {
                users.map((item) => (
                    <ChatReview key={item.user.id} id={item.user.id} avatar={item.user.avatar} name={item.user.displayName} message={item.newMessages.content} seen={item.newMessages.seen} />
                ))
            }
        </div>
    );
}