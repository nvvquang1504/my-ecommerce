import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useState} from 'react'
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";

function App() {
    const [first, setFirst] = useState("");
    return (
        <>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/contact'} element={<Contact/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </>
    )
}

export default App
