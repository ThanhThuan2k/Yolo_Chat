import {useState, useEffect} from 'react';
import {firestore} from './firebase';
import {collection, onSnapshot, addDoc, deleteDoc, doc, query, where} from 'firebase/firestore';

export default function Firestore(){
    useEffect(() => {
        const colRef = collection(firestore, 'users');
        // get data with query
        const q = query(colRef, where("email", "==", "thuanhuynh.190800@gmail.com"));

        // get all data in collection
        // const q = query(colRef);

        onSnapshot(q, (snapshot) => {
            let books = [];
            snapshot.docs.forEach((doc) => {
                books.push({...doc.data(), id: doc.id});
            })
        })
    }, []);

    return(
        <div>firestore</div>
    );
}