import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios"



const EVENT_GET = "http://localhost:5134/api/Events";

const initialState = {
    events: [],
    event: {},
    loading: false,
    errMessage: "",
}

export const getAllEvents = createAsyncThunk("events", async (_, thunkAPI) => {
    try {
        const response = await axios(EVENT_GET);
        return response.data;

    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
});

export const getEventById = createAsyncThunk("event", async (eventId, thunkAPI) => {
    try {
        const response = await axios(EVENT_GET + "/" + eventId);
        return response.data;
    }
    catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Etkinlik bulunamadı");
    }
});

export const getEventsByCategoryId = createAsyncThunk("eventsbycat", async (catId, thunkAPI) => {
    try {
        const response = await axios(EVENT_GET + "/bycategory/" + catId)
        return response.data;
    }
    catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Etkinlik Bulunamadı");
    }
});

const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEvents.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllEvents.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(getAllEvents.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload
            })
            .addCase(getEventById.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEventById.fulfilled, (state, action) => {
                state.loading = false;
                state.event = action.payload;
            })
            .addCase(getEventById.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
            .addCase(getEventsByCategoryId.pending, (state) => {
                state.loading = true;
            })
            .addCase(getEventsByCategoryId.fulfilled, (state, action) => {
                state.loading = false;
                state.events = action.payload;
            })
            .addCase(getEventsByCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
    }
})

export const { } = eventSlice.actions;
export default eventSlice.reducer;


