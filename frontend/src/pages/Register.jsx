import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../features/authSlice";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import "./Register.css";

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const inputs = [
        {
            id: 1,
            name: "firstName",
            type: "text",
            label: "First Name",
            value: formData.firstName,
            required: true,
        },
        {
            id: 2,
            name: "lastName",
            type: "text",
            label: "Last Name",
            value: formData.lastName,
            required: true,
        },
        {
            id: 3,
            name: "email",
            type: "email",
            label: "Email",
            value: formData.email,
            required: true,
        },
        {
            id: 4,
            name: "password",
            type: "password",
            label: "Password",
            value: formData.password,
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            label: "Confirm Password",
            value: formData.confirmPassword,
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
        if (formData.password[0] === formData.confirmPassword[0]) {
            const data = {
                firstName: formData.firstName[0],
                lastName: formData.lastName[0],
                email: formData.email[0],
                password: formData.password[0],
            };
            dispatch(register({ ...data }));
            navigate("/login");
        }
    };

    return (
        <div className="register">
            <div className="register-container">
                <span>Register</span>
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
                        <Button type="submit">Register</Button>
                    </div>
                </form>
                <div>
                    <p>
                        Already have an account ? <Link to="/">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
