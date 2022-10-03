import React from "react";
import "./Input.css";

const Input = ({ type, label, name, value, onChange, ...props }) => {
    return (
        <div className="input">
            <label htmlFor={name}>{label} : </label>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default Input;
