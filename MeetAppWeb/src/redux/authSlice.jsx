import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios"
import { jwtDecode } from "jwt-decode"

const REGISTER = "http://localhost:5134/api/Users/register";
const LOGIN = "http://localhost:5134/api/Users/login";
const USER_GET = "http://localhost:5134/api/Users";

const NOTICE_GET = "http://localhost:5134/api/Notice"

const APPROVE = "http://localhost:5134/api/Users/approve"


const token = sessionStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const initialState = {
    notices: [],
    users: [],
    registeredUser: null,
    errMessage: "",
    loading: false,
    currentUser: user ?? null,
    token: token ?? null,
    approvedMessage: "",
    deletedUser: null
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

export const getAllUsers = createAsyncThunk("users", async (_, thunkAPI) => {
    try {
        const response = await axios(USER_GET);
        return response.data;

    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
});

export const getNotices = createAsyncThunk("notices", async (_, thunkAPI) => {
    try {
        const response = await axios(NOTICE_GET);
        return response.data;

    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
});

export const deleteUser = createAsyncThunk("deleteUser", async (userId, thunkAPI) => {
    try {
        const response = await axios.delete(USER_GET + "/" + userId);
        return response.data;
    }
    catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Etkinlik bulunamadı");
    }
})


export const approveUser = createAsyncThunk("approve", async (approveInfo, thunkAPI) => {
    try {
        const response = await axios.put(APPROVE, approveInfo);
        return response.data;

    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
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

        },
        clearApprovedMessage: (state) => {
            state.approvedMessage = null;
        },
        clearDeletedUser: (state) => {
            state.deletedUser = null;
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
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.loading = false;
            })
            .addCase(getNotices.pending, (state) => {
                state.loading = true;
            })
            .addCase(getNotices.fulfilled, (state, action) => {
                state.loading = false;
                state.notices = action.payload;
            })
            .addCase(getNotices.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.loading = false;
            })
            .addCase(approveUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(approveUser.fulfilled, (state, action) => {
                state.loading = false;
                state.approvedMessage = action.payload;
            })
            .addCase(approveUser.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.loading = false;
            })
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.deletedUser = action.payload;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.errMessage = action.payload;
                state.loading = false;
            })
    }
})

export const { logout, clearApprovedMessage, clearDeletedUser } = authSlice.actions;
export default authSlice.reducer;