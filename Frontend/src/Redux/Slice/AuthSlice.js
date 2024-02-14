import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data: JSON.parse(localStorage.getItem("data")) || {}
}

export const createAccount = createAsyncThunk("/auth/signup", async (data) => {
    try {
        const res = axiosInstance.post("user/signup", data);
        toast.promise(res, {
            loading: "Wait creating your account",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to create account"
        });
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
})

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("/user/login", data);
        toast.promise(res, {
            loading: "Wait! authentication in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to log in"
        });
        const finalRes = (await res).data;
        console.log(finalRes);
        return finalRes;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }

})

export const logout = createAsyncThunk("/auth/logout", async () => {
    try {
        const res = axiosInstance.get("user/logout");
        toast.promise(res, {
            loading: "Wait logout in progress",
            success: (data) => {
                return data?.data?.message
            },
            error: "Failed to log out"
        })
        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message)
    }
})

export const handleUpload = createAsyncThunk("/post/postphotos", async (formData) => {
    try {
        const res = axiosInstance.post("/post/postphotos", formData);
        toast.promise(res, {
            loading: "Wait! file uploading in progress...",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to upload"
        });
        return (await res).data;
    } catch (error) {
        console.error('Error uploading images:', error.response.data.message);
        alert(error.response.data.message);
    }
})


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                console.log("Action is ", action);
                localStorage.setItem("data", JSON.stringify(action?.payload?.user));

                localStorage.setItem("isLoggedIn", true);

                state.isLoggedIn = action?.payload?.success;

                state.data = action?.payload?.user;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
            })
    }
})

// export const { } = authSlice.actions;
export default authSlice.reducer;