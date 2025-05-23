import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"



const USER_CART = "http://localhost:5134/api/Carts";
const USER_CART_GET = "http://localhost:5134/api/Carts/byUserId";
const UPDATE_EVENT_TICKETS = "http://localhost:5134/api/Carts/updateTickets"
const CLEAR_USER_CART = "http://localhost:5134/api/Carts/clearCart"

const initialState = {
    userCart: null,
    loading: false,
    errMessage: "",
    cartAddedMessage: "",
    cartRemovedMessage: "",
    ticketUpdateMessage: "",
    clearCartMessage: "",
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

export const updateEventTickets = createAsyncThunk("updateTickets", async (ticketsInfo, thunkAPI) => {
    try {
        const response = await axios.post(UPDATE_EVENT_TICKETS, ticketsInfo);
        console.log(response.data);
        return response.data;
    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
})

export const clearUserCart = createAsyncThunk("clearCart", async (userId, thunkAPI) => {
    try {
        const response = await axios.post(CLEAR_USER_CART + "/" + userId);
        console.log(response.data);
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
        clearCartRemovedMessage: (state) => {
            state.cartRemovedMessage = null;
        },
        clearCartAddedMessage: (state) => {
            state.cartAddedMessage = null;
        }
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
                state.cartAddedMessage = action.payload.message;
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
                state.cartRemovedMessage = action.payload.message;
            })
            .addCase(removeEventFromUserCart.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
            .addCase(updateEventTickets.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEventTickets.fulfilled, (state, action) => {
                state.loading = false;
                state.ticketUpdateMessage = action.payload;
            })
            .addCase(updateEventTickets.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
            .addCase(clearUserCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearUserCart.fulfilled, (state, action) => {
                state.loading = false;
                state.clearCartMessage = action.payload;
            })
            .addCase(clearUserCart.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })

    }
})

export const { calculateCart, clearCartAddedMessage, clearCartRemovedMessage } = cartSlice.actions;
export default cartSlice.reducer;