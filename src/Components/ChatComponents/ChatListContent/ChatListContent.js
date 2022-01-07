import { useState, useEffect } from 'react';
import ChatReview from '../ChatReview/ChatReview';
import "./ChatListContent.scss";

export default function ChatListContent() {
    return (
        <div className="chat-list-content">
            <ChatReview />
        </div>
    );
}