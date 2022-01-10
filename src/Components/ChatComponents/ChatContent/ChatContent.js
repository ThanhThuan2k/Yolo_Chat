import { useState, useContext, useEffect } from 'react';
import ChatContentHeader from '../ChatContentHeader/ChatContentHeader';
import { YourMessage, MyMessage } from '../ChatMessage/Message';
import ChatInput from '../ChatInput/ChatInput';
import LoadingComponent from '../../share/LoadingComponent/LoadingComponent';
import './ChatContent.scss';
import { getCurrentUserID } from '../../../Services/HomePageService';
import { db } from '../../../Components/firebase';
import { ref, set, onValue, child, get } from "firebase/database";

import { HomePageContext } from '../../../Pages/Home';

export default function ChatContent() {
    const context = useContext(HomePageContext);

    return (
        <div className="chat-content">
            <ChatContentHeader />
            {
                context.messages.length ? (
                    <>
                        <div className="chat-content-container">
                            {
                                context.messages.map((item) => (
                                    <YourMessage message={item.content} />
                                ))
                            }
                        </div>
                        <ChatInput />
                    </>
                ) : (
                    <LoadingComponent width="100%" height={'calc(100% - 100px)'} />
                )
            }
        </div>
    );
}