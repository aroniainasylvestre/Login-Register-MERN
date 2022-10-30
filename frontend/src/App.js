import React from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
    return (
        <div className="app">
            <Header />
            <Routes>
                <Route element={<ProtectedRoutes />}>
                    <Route path="/" element={<Home />}></Route>
                </Route>

                <Route path="/login" element={<Login />}></Route>
                <Route path="/register" element={<Register />}></Route>
            </Routes>
        </div>
    );
};

export default App;
