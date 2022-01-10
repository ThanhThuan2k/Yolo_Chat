import { useContext } from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
import ChatAvatar from '../ChatAvatar/ChatAvatar';
import './ChatReview.scss';
import { HomePageContext } from '../../../Pages/Home';

export default function ChatReview(props) {
    const context = useContext(HomePageContext);

    return (
        <div id={props.id} className={context.currentChatUserId === props.id ? "chat-review active" : "chat-review"} onClick={() => context.selectUser(props.user)}>
            <ChatAvatar avatar={props.avatar} displayOnline={true} online={true} />
            <div className="content">
                <div className="title">
                    {props.name}
                </div>
                <div className="message">
                    {props.message}
                </div>
            </div>
            {
                props.seen ? (
                    <div className="seen">
                        <img className="seen-avatar" src={props.avatar} alt="" />
                    </div>
                ) : (
                    // <BsBellSlashFill className="icon turn-off-notification" />
                    <AiFillCheckCircle className="icon sent" />
                )
            }
        </div>
    );
}

ChatReview.defaultProps = {
    avatar: 'https://picsum.photos/200',
    name: '',
    message: '',
    seen: false,
    notification: true,
    send: true,
    online: false,
    // active: false,
    id: '',
    onClick: null,
    user: {},
}