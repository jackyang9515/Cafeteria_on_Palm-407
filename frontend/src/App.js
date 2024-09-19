import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Nav from "./components/Nav.jsx";
import Account from "./components/account.jsx";
import OrderHistory from "./components/OrderHistory.jsx";
import MenuPage from "./components/MenuPage";
import Cart from "./components/Cart";
import HomePage from "./components/Home";
import AdminPage from "./components/AdminPage";
import {useState} from "react";

function App() {
    const [itemList, setItemList] = useState([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Nav itemList={itemList} setItemList={setItemList}/>}>
                    <Route path="/register" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/account" element={<Account/>}/>
                    <Route path="/orderhistory" element={<OrderHistory mockData={true}/>}/>
                    <Route path="/menu" element={<MenuPage itemList={itemList} setItemList={setItemList}/>}/>
                    <Route path="/myOrder" element={<Cart/>}/>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/admin" element={<AdminPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
