import React from "react";
import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Reset from "./pages/Auth/Reset";
import AdminRoute from "./utils/AdminRoute";
import {ToastContainer} from "react-toastify";
import Admin from "./pages/Admin";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/contact'} element={<Contact/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/reset'} element={<Reset/>}/>
                    <Route path={'/admin'} element={
                        <AdminRoute element={
                            <Admin/>
                        }/>
                    }>
                        <Route path={'products'} element={<h1>Product tab</h1>}/>
                        <Route path={'users'} element={<h1>User tab</h1>}/>
                    </Route>

                    <Route path={'*'} element={<h1>Not found</h1>}/>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position={'top-left'}
                pauseOnHover={true}
                style={{fontSize: 16}}
                autoClose={2000}
            />
        </>
    );
}

export default App
