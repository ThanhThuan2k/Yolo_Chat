import { useContext, useState } from 'react';
import { MdSend } from 'react-icons/md';
import './ChatInput.scss';

import { HomePageContext } from '../../../Pages/Home';
import { getCurrentUserID } from '../../../Services/HomePageService';
const meId = getCurrentUserID();

export default function ChatInput() {
    const context = useContext(HomePageContext);

    const [message, setMessage] = useState('');

    const submitHandle = (e) => {
        e.preventDefault();
        const data = {
            content: message,
            createAt: Date.now(),
            seen: false,
            from: meId
        }
        context.sendHandle(data);
    }

    return (
        <form className="chat-input" onSubmit={submitHandle} >
            <div className="input-area">
                <input type="text" placeholder="Aa" className="input-element" value={message} onChange={(e) => setMessage(e.target.value)} />
            </div>
            <div className="send-button">
                <button type="submit" className="send">
                    <MdSend className="icon" />
                </button>
            </div>
        </form>
    );
}