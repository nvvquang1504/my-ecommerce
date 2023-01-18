import React from "react";
import './App.scss'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Reset from "./pages/Auth/Reset";
import AdminRoute from "./utils/AdminRoute";
import Products from "./pages/Admin/Products";
import {ToastContainer} from "react-toastify";
import Admin from "./pages/Admin";
import Dashboard from "./components/Dashboard";
import AddForm from "./pages/Admin/Products/AddForm";
import ProductList from "./pages/Admin/Products/ProductList";


function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'contact'} element={<Contact/>}/>
                    <Route path={'login'} element={<Login/>}/>
                    <Route path={'register'} element={<Register/>}/>
                    <Route path={'reset'} element={<Reset/>}/>
                    <Route path={'admin'} element={
                        <AdminRoute element={
                            <Admin/>
                        }/>
                    }>
                        <Route path={'products'} element={<Products/>}>
                            <Route index element={<Navigate to={'add'}/>}/>
                            <Route path={'add'} element={<AddForm/>}></Route>
                            <Route path={'list'} element={<ProductList/>}/>
                        </Route>
                        <Route path={'users'} element={<h1>User tab</h1>}/>
                        <Route path={'dashboard'} element={<Dashboard/>}/>
                    </Route>
                    <Route path={'detail/:id'} element={<Detail/>}/>
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
