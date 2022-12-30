import './App.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Reset from "./pages/Auth/Reset";

function App() {
    // const [first, setFirst] = useState("");
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
        </>
    );
}

export default App
