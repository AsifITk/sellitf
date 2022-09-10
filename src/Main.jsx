import React, { useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import AllProducts from "./Pages/Allproducts/AllProducts";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Signup/SignUp";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Admin from "./Pages/Admin/Admin";
import CreateAd from "./Pages/Createad/CreateAd";
import UpdateAd from "./Pages/UpdateAd/UpdateAd";
import { useNavigate } from "react-router-dom";

function Main() {
    const [userId, setUserId] = useState(null);
    const [isloggedIn, setIsloggedIn] = useState(false);
    let goTo = useNavigate();


    return (
        <div className="main-container">
            {/* {
                isloggedIn ? (
                    <button onClick={() => goTo("/")}> Go To Profile</button>
                ) : (
                    <button onClick={() => goTo("/login")}> Login</button>
                )
            } */}
            {/* <button onClick={() => { goTo("/create") }}>Create An Add</button> */}
            <Routes>
                <Route path="/" element={<AllProducts isloggedIn={isloggedIn} />} />
                <Route path="/login" element={<Login setUserId={setUserId} userId={userId} setIsloggedIn={setIsloggedIn} />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/:id" element={<ProductDetails />} />
                <Route path="/admin/:id" element={<Admin />} />
                <Route path="/create" element={<CreateAd userId={userId} />} />
                <Route path="/delete/:id" element={<UpdateAd />} />
            </Routes>
        </div>
    );
}

export default Main;
