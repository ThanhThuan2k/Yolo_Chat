import { BiDotsHorizontalRounded } from 'react-icons/bi';
import { BiVideoPlus } from 'react-icons/bi';
import { AiOutlineSearch } from 'react-icons/ai';
import './ChatListHeader.scss';

export default function ChatListHeader() {
    return (
        <div className="chat-list-header">
            <div className="top">
                <div className="chat-title">
                    <h1>Yolo Chat</h1>
                </div>
                <div className="chat-menu">
                    <button className="menu-button button">
                        <BiDotsHorizontalRounded className="icon" />
                    </button>
                    <button className="video-chat button">
                        <BiVideoPlus className="icon" />
                    </button>
                </div>
            </div>
            <div className="bottom">
                <div className="search-icon">
                    <AiOutlineSearch className="icon" />
                </div>
                <input type="text" className="search-input" placeholder="Tìm kiếm" />
            </div>
        </div>
    );
}