import { BsTelephoneFill, BsCameraVideoFill } from 'react-icons/bs';
import { AiOutlineMenu } from 'react-icons/ai';
import ChatAvatar from '../ChatAvatar/ChatAvatar';
import './ChatContentHeader.scss';

export default function ChatContentHeaders() {
    return (
        <div className="chat-content-header">
            <ChatAvatar width="70px" displayOnline={true} online={true} />
            <div className="title">
                <div className="username">
                    Thanh Thuận
                </div>
                <div className="last-online">
                    Online 2 giờ trước
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