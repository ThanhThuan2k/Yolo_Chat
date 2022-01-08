import './Message.scss';
import ChatAvatar from '../ChatAvatar/ChatAvatar';

function YourMessage(props) {
    return (
        <div className="message" id="your-message">
            <ChatAvatar width="50px" displayOnline={false} opacity={props.displayAvatar ? '1' : '0'} />
            <div className="message-content">{props.message}</div>
        </div>
    );
}

function MyMessage(props) {
    return (
        <div className="message" id="my-message">
            <span className="message-content">{props.message}</span>
            <ChatAvatar width="50px" display={false} displayOnline={false} opacity={props.displayAvatar ? '1' : '0'} margin={-1} />
        </div>
    );
}

YourMessage.defaultProps = {
    message: '',
    displayAvatar: false,
}

MyMessage.defaultProps = {
    message: '',
    displayAvatar: false,
}

export { YourMessage, MyMessage };