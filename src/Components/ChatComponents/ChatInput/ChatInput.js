import { MdSend } from 'react-icons/md';
import './ChatInput.scss';

export default function ChatInput() {
    return (
        <div className="chat-input">
            <div className="input-area">
                <input type="text" placeholder="Aa" className="input-element" />
            </div>
            <div className="send-button">
                <button className="send">
                    <MdSend className="icon" />
                </button>
            </div>
        </div>
    );
}