import React, {useEffect} from 'react';
import {auth} from '../services/firebase'
import {onAuthStateChanged} from "firebase/auth";
import {Navigate} from "react-router-dom";

interface IProtectedRouteProps {
    element: JSX.Element,
    children?: any
}

// let userId: string | null;
const AdminRoute = ({element}: IProtectedRouteProps) => {
    return element;
    // return userId
    //     ? element
    //     : <Navigate to={'/'}/>
}
export default AdminRoute;