import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"

const CATEGORİES_GET = "http://localhost:5134/api/Categories";

const initialState = {
    categories: [],
    loading: false,
    errMessage: "",
}


export const getAllCategories = createAsyncThunk("categories", async (_, thunkAPI) => {
    try {
        const response = await axios(CATEGORİES_GET);
        return response.data;

    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
})


const categorSlice = createSlice({
    name: "category",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
    }
});

export const { } = categorSlice.actions;
export default categorSlice.reducer;