import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
    user: user ? user : null,
    isLoading: false,
    isLoggedIn: false,
};

// Register user
export const register = createAsyncThunk(
    "auth/register",
    async (data, thunkAPI) => {
        try {
            return await authServices.register(data);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Login user
export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
    try {
        return await authServices.login(data);
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        return thunkAPI.rejectWithValue(message);
    }
});

// Logout
export const logout = createAsyncThunk("auth/logout", async () => {
    await authServices.logout();
});

// Get Profile
export const getProfile = createAsyncThunk(
    "auth/profile",
    async (_, thunkAPI) => {
        try {
            return await authServices.getProfile();
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
                localStorage.setItem(
                    "user",
                    JSON.stringify({ ...action.payload, isLoggedIn: true })
                );
            })
            .addCase(logout.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.isLoggedIn = false;
                state.user = null;
            })
            .addCase(getProfile.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isLoggedIn = true;
                state.user = action.payload;
            });
    },
});

export default authSlice.reducer;
