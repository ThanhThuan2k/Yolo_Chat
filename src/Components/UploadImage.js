import {useEffect, useState} from 'react';
import { uploadBytesResumable, getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';

export default function UploadImage() {

    const [file, setFile] = useState(null);
    const [process, setProcess] = useState(0);
    const uploadImage = () => {
        if (file) {
            const storageRef = ref(storage, `/files/${file.name}`);
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
        uploadImage();
    }, [file]);

    return (
        <>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            <h3>Uploaded: {process} %</h3>
        </>
    );
}