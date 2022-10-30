import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../features/authSlice";
import Button from "../components/Button";
import Input from "../components/Input";
import "./Login.css";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setForm] = useState({
        email: "",
        password: "",
    });

    const inputs = [
        {
            id: 1,
            name: "email",
            type: "email",
            label: "Email",
            value: formData.email,
            required: true,
        },
        {
            id: 2,
            name: "password",
            type: "password",
            label: "Password",
            value: formData.password,
            required: true,
        },
    ];

    const handleChange = (e) => {
        setForm({
            ...formData,
            [e.target.name]: [e.target.value],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: formData.email[0],
            password: formData.password[0],
        };
        dispatch(login({ ...data }));
        navigate("/");
    };

    return (
        <div className="login">
            <div className="login-container">
                <span>Login</span>
                <form onSubmit={handleSubmit}>
                    {inputs.map((item) => {
                        return (
                            <Input
                                key={item.id}
                                {...item}
                                onChange={handleChange}
                            />
                        );
                    })}
                    <div className="btn-wrapper">
                        <Button type="submit">Login</Button>
                    </div>
                </form>
                <div>
                    <p>
                        Create a new account ?{" "}
                        <Link to="/register">Register</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
