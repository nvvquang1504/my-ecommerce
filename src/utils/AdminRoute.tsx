import React from 'react';
import {Route, Navigate, Outlet} from "react-router-dom";


interface IProtectedRouteProps {
    element: JSX.Element,
    children?: any
}

let userId: string | null;
userId = 'vkjfdhfkjehgkjeh'
const AdminRoute = ({element}: IProtectedRouteProps) => {
    return userId
        ? element
        : <Navigate to={'/'}/>
}
export default AdminRoute;