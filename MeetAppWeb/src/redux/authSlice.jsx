import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios"
import { jwtDecode } from "jwt-decode"

const REGISTER = "http://localhost:5134/api/Users/register";
const LOGIN = "http://localhost:5134/api/Users/login";



const token = sessionStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const initialState = {
    registeredUser: null,
    errMessage: "",
    loading: false,
    currentUser: user ?? null,
    token: token ?? null,
}

export const register = createAsyncThunk("register", async (userInfo, { rejectWithValue }) => {
    try {
        const response = await axios.post(REGISTER, userInfo);
        return response.data;
    }
    catch (err) {
        console.log(err.response.data);
        return rejectWithValue(err.response.data);
    }
})


export const login = createAsyncThunk("login", async (userInfo, { rejectWithValue }) => {
    try {
        const response = await axios.post(LOGIN, userInfo);
        return response.data;
    }
    catch (err) {
        console.log(err.response.data);
        return rejectWithValue(err.response.data);
    }
})



const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.currentUser = null;
            sessionStorage.removeItem("token");
            sessionStorage.removeItem("current_user");

        }


    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.registeredUser = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                const decodedToken = jwtDecode(action.payload.token);
                state.currentUser = decodedToken;
                console.log(action.payload);
                sessionStorage.setItem("token", action.payload.token);
                sessionStorage.setItem("current_user", JSON.stringify(decodedToken));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
    }
})

export const { logout } = authSlice.actions;
export default authSlice.reducer;