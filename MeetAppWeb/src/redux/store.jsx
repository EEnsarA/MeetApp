import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import eventReducer from "./eventSlice"
import categoryReducer from "./categorySlice"

export const store = configureStore({
    reducer: {
        authInfo: authReducer,
        eventList: eventReducer,
        categoryList: categoryReducer,
    }
})