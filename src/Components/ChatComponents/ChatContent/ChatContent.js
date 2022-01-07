import ChatContentHeader from '../ChatContentHeader/ChatContentHeader';
import { YourMessage, MyMessage } from '../ChatMessage/Message';
import ChatInput from '../ChatInput/ChatInput';
import './ChatContent.scss';

export default function ChatContent() {
    return (
        <div className="chat-content">
            <ChatContentHeader />
            <div className="chat-content-container">
                <YourMessage message="sao mấy cái video trên tijk to dụng lượng thấp nhờ" />
                <YourMessage message="sao mấy cái abc video trên tijk to dụng lượng thấp nhờ" />
                <YourMessage message="sao mấy cái trên tijk to dụng lượng thấp nhờ" />
                <YourMessage message="sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ sao mấy cái to dụng lượng thấp nhờ" displayAvatar={true} />
                <MyMessage message="sao mấy cái trên tijk to dụng lượng thấp nhờ" />
                <MyMessage message="sao mấy cái trên tijk to dụng lượng thấp nhờ" displayAvatar={true} />
            </div>
            <ChatInput />
        </div>
    );
}