import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import "./Login.css";

const Login = () => {
    const [formData, setFormData] = useState({
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
        setFormData({
            ...formData,
            [e.target.name]: [e.target.value],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="login">
            <div className="login-container">
                <p>Login</p>
                <form onClick={handleSubmit}>
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
