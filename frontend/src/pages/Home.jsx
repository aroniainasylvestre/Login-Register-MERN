import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../features/authSlice";
import "./Home.css";

const Home = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);

    useEffect(() => {
        dispatch(getProfile());
    }, [dispatch]);
    return (
        <div className="home">
            <div className="container">
                <h4>Home Page</h4>
                <p>Welcome {`${user.firstName} ${user.lastName}`}</p>
            </div>
        </div>
    );
};

export default Home;
