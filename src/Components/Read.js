import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from "firebase/database";

export default function Read() {
    useEffect(async () => {
        // const data = ref(db, "users");
        // onValue(data, (snapshot) => {
        //     const user = snapshot.val();
        //     console.log(user);
        // });
        // const chats = ref(db, "chats");
        // onValue(chats, (snapshot) => {
        //     const chat = snapshot.val();
        //     console.log(chat);
        // });
    }, []);

    return (
        <div>Read</div>
    );
}