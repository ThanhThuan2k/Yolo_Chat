import { useState, useEffect, useContext } from 'react';
import ChatReview from '../ChatReview/ChatReview';
import "./ChatListContent.scss";
import { HomePageContext } from '../../../Pages/Home';

export default function ChatListContent() {
    const context = useContext(HomePageContext);

    return (
        <div className="chat-list-content">
            {
                context.users.map((item, index) => (
                    <ChatReview key={index} avatar={item.photoURL} name={item.displayName} message={'Ddang kieerm tra'} seen={true} online={true} id={item.id} user={item} />
                ))
            }
        </div>
    );
}