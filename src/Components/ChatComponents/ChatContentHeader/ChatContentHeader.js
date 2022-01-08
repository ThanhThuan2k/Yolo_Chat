import { useContext, useEffect, useState } from 'react';
import { BsTelephoneFill, BsCameraVideoFill } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import ChatAvatar from '../ChatAvatar/ChatAvatar';
import './ChatContentHeader.scss';

import { HomePageContext } from '../../../Pages/Home';

export default function ChatContentHeaders() {
    const context = useContext(HomePageContext);
    const [user, setUser] = useState({
        id: '',
        displayName: 'Chưa xác định',
        avatar: 'https://picsum.photos/200',
        online: Date.now(),
    });

    useEffect(() => {
        const currentUser = context.currentChatUser;
        setUser(currentUser);
    })

    return (
        <div className="chat-content-header">
            <ChatAvatar avatar={user.avatar} width="70px" displayOnline={true} online={true} />
            <div className="title">
                <div className="username">
                    {user.displayName}
                </div>
                <div className="last-online">
                    Đang hoạt động
                </div>
            </div>
            <div className="button-area">
                <button className="call">
                    <BsTelephoneFill className="icon" />
                </button>
                <button className="call-video">
                    <BsCameraVideoFill className="icon" />
                </button>
                <button className="open-window">
                    <AiOutlineMenu className="icon" />
                </button>
            </div>
        </div>
    );
}