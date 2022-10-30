import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api/auth/users",
    headers: {
        "Content-Type": "application/json",
    },
});

const register = async (data) => {
    const response = await API.post("/register", data);
    return response.data;
};
const login = async (data) => {
    console.log(data);
    const response = await API.post("/login", data);
    return response.data;
};
const getProfile = async () => {
    const response = await API.get("/profile");
    return response.data;
};
const logout = () => {
    localStorage.removeItem("user");
};

const authServices = {
    register,
    login,
    logout,
    getProfile,
};

export default authServices;
