import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
    const data = JSON.parse(localStorage.getItem("user"));
    const dispatch = useDispatch();

    return (
        <div className="header">
            <div className="container">
                <h3 className="title">
                    <Link to="/">Home</Link>
                </h3>
                <nav className="navbar">
                    <ul>
                        {data?.isLoggedIn ? (
                            <li onClick={() => dispatch(logout())}>
                                <Link to="/login">Logout</Link>
                            </li>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Header;
