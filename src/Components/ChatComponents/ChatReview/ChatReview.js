import { BsBellSlashFill } from 'react-icons/bs';
import ChatAvatar from '../ChatAvatar/ChatAvatar';
import './ChatReview.scss';

export default function ChatReview(props) {
    return (
        <div className={props.active ? "chat-review active" : "chat-review"}>
            <ChatAvatar avatar={props.avatar} displayOnline={true} online={true} />
            <div className="content">
                <div className="title">
                   {props.name} 
                </div>
                <div className="message">
                    Chiều nay đi quán ko ai biesest ddaua nef chuwfng nafo ddi nois tao
                </div>
            </div>
            <div className="seen">
                <img className="seen-avatar" src="https://picsum.photos/200" alt="" />
            </div>
        </div>
    );
}

ChatReview.defaultProps = {
    avatar: 'https://picsum.photos/200',
    name: 'Thanh Thuận',
    message: 'Chiều nay đi quán ko',
    seen: false,
    notification: true,
    send: true,
    online: false,
    active: false,
}