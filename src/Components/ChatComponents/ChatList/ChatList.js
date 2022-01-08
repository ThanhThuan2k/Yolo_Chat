import ChatListHeader from "../ChatListHeader/ChatListHeader";
import ChatListContent from '../ChatListContent/ChatListContent';
import './ChatList.scss';

export default function ChatList() {
    return (
        <div className="chat-list">
            <ChatListHeader />
            <ChatListContent />
        </div>
    );
}