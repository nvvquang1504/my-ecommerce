import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Reset from "./pages/Auth/Reset";
import app from './services/firebase'
import {ToastContainer} from "react-toastify";
import React from "react";

function App() {
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/contact'} element={<Contact/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/reset'} element={<Reset/>}/>
                </Routes>
                <Footer/>
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
