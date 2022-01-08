import { useEffect, useState } from 'react';
import { ref, set, onValue, child, get } from "firebase/database";
import { db, app, firestore, storage } from './firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { uploadBytesResumable, getDownloadURL, ref as storage_ref } from 'firebase/storage';

export default function Main() {
    const [file, setFile] = useState(null);
    const [process, setProcess] = useState(0);

    const writeUserData = async () => {
        // const dbRef = ref(db);
        // get(child(dbRef, `5oCnN6maiCS9gdIgx4QM/user3`)).then((snapshot) => {
        //     if(snapshot.exists()){
        //         console.log(snapshot.val());
        //     }else{
        //         console.log("No data value");
        //     }
        // }).catch((error) => {
        //     console.log(error);
        // });

        // for (var i = 1; i <= 30; i++) {
        //     set(ref(db, `5oCnN6maiCS9gdIgx4QM/QbNJ2bdPwXb1ddsJCcRr/${Date.now()}`), {
        //         createAt: Date.now(),
        //         content: 'Many message',
        //         seen: false,
        //         from: '5oCnN6maiCS9gdIgx4QM',
        //     });

        // set(ref(db, `5oCnN6maiCS9gdIgx4QM/QbNJ2bdPwXb1ddsJCcRr/${Date.now()}`), {
        //     createAt: Date.now(),
        //     content: 'Hoom nay laf ngafy gif thees',
        //     seen: false,
        //     from: 'QbNJ2bdPwXb1ddsJCcRr',
        // });
        // }

        // set(ref(db, `hVjY9iGP6KYQFAhu9UYe/5oCnN6maiCS9gdIgx4QM/${Date.now()}`), {
        //     createAt: Date.now(),
        //     content: 'dr',
        //     seen: false,
        //     from: 'hVjY9iGP6KYQFAhu9UYe',
        // });

        // try {
        //     const docRef = await addDoc(collection(firestore, "users"), {
        //         email: 'thuanhuynh.190800@gmail.com',
        //         username: "thanhthuan1908",
        //         avatar: "null",
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    const uploadImage = () => {
        if (file) {
            const storageRef = storage_ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on("state_changed",
                (snapshot) => {
                    const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    setProcess(prog);
                },
                (error) => console.log(error),
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then(url => console.log(url));
                }
            );
        } else {
            console.log("File not uploaded")
        }
    }

    useEffect(() => {
        writeUserData();
        // uploadImage();
    }, [file]);

    return (
        <>
            <div>Hello</div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <h3>Uploaded: {process} %</h3>
        </>
    );
}