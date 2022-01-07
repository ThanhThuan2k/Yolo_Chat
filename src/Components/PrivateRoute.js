import {Navigate, Outlet} from 'react-router-dom';
import {getCookie} from '../Services/cookie';

export default function PrivateRoute(){
    if(!getCookie("jwt")){
        return <Navigate to="/login" />;
    }
    return <Outlet />;
}