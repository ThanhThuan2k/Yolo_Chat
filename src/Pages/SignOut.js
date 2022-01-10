import { getAuth, signOut } from "firebase/auth";
import { Navigate } from 'react-router-dom';

export default function SignOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
        // Sign-out successful.
        return <Navigate to="/login" />;
    }).catch(error => {
        console.log(error);
    });
    return <Navigate to="/login" />;
}
