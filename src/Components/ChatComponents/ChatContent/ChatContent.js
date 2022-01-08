import { useState, useContext, useEffect } from 'react';
import ChatContentHeader from '../ChatContentHeader/ChatContentHeader';
import { YourMessage, MyMessage } from '../ChatMessage/Message';
import ChatInput from '../ChatInput/ChatInput';
import LoadingComponent from '../../share/LoadingComponent/LoadingComponent';
import './ChatContent.scss';
import { getCurrentUserID } from '../../../Services/HomePageService';

import { HomePageContext } from '../../../Pages/Home';

const meId = getCurrentUserID();

export default function ChatContent() {
    const context = useContext(HomePageContext);

    const [messages, setMessages] = useState([]);
    // const [chatUser, setChatUser]

    useEffect(() => {
        setMessages(context.currentChatMessages);
    })

    return (
        <div className="chat-content">
            <ChatContentHeader />
            {
                messages.length ? (<>
                    <div className="chat-content-container">
                        {
                            messages.map((item, index) => (
                                item.from == meId ? <MyMessage id={item.from} key={index} message={item.content} /> :
                                    <YourMessage id={item.from} key={index} message={item.content} />
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