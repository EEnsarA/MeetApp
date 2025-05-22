import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"



const USER_CART = "http://localhost:5134/api/Carts";
const USER_CART_GET = "http://localhost:5134/api/Carts/byUserId";


const initialState = {
    userCart: null,
    loading: false,
    errMessage: "",
    cartAddedMessage: "",
    cartRemovedMessage: "",
    amountCart: 0,
    numberOfTicket: 0,
}



export const getUserCart = createAsyncThunk("userCart", async (userId, thunkAPI) => {
    try {
        const response = await axios(USER_CART_GET + "/" + userId);
        return response.data;
    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
});

export const addEventToUserCart = createAsyncThunk("addCart", async (addInfo, thunkAPI) => {
    try {
        const response = await axios.post(USER_CART, addInfo);
        return response.data;
    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
});

export const removeEventFromUserCart = createAsyncThunk("removeCart", async (removeInfo, thunkAPI) => {
    try {
        const response = await axios.delete(USER_CART, { data: removeInfo });
        return response.data;
    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        calculateCart: (state) => {
            state.amountCart = 0;
            state.numberOfTicket = 0;
            state.userCart && state.userCart.map((e) => {
                state.amountCart += e.ticketPrice * e.count;
                state.numberOfTicket += e.count;
            })

        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.userCart = action.payload;
            })
            .addCase(getUserCart.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
            .addCase(addEventToUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(addEventToUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartAddedMessage = action.payload;
            })
            .addCase(addEventToUserCart.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
            .addCase(removeEventFromUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeEventFromUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cartRemovedMessage = action.payload;
            })
            .addCase(removeEventFromUserCart.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
    }
})

export const { calculateCart } = cartSlice.actions;
export default cartSlice.reducer;