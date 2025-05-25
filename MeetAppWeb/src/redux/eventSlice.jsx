import { createAsyncThunk, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios"



const EVENT_GET = "http://localhost:5134/api/Events";

const initialState = {
    events: [],
    removedEvent: null,
    addedEvent: null,
    updatedEvent: null,
    eventsByCat: [],
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

export const removeEvent = createAsyncThunk("deleteEvent", async (eventId, thunkAPI) => {
    try {
        const response = await axios.delete(EVENT_GET + "/" + eventId);
        return response.data;
    }
    catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Etkinlik bulunamadı");
    }
})

export const addEvent = createAsyncThunk("addEvent", async (eventInfo, thunkAPI) => {
    try {

        // api multipart/form-data olarak body den istek aldığı için formData ya çeviriyorum !
        // normalde application/json olarak gönderiyorduk ancak eşleşmediği için böyle yapmalıyız !

        const formData = new FormData();

        formData.append("eventName", eventInfo.eventName);
        formData.append("eventDescription", eventInfo.eventDescription);
        formData.append("image", eventInfo.image);
        formData.append("city", eventInfo.city);
        formData.append("country", eventInfo.country);
        formData.append("location", eventInfo.location);
        formData.append("numberOfTickets", eventInfo.numberOfTickets);
        formData.append("ticketPrice", eventInfo.ticketPrice);
        formData.append("isOnSale", eventInfo.isOnSale);
        formData.append("isOnBanner", eventInfo.isOnBanner);
        formData.append("rules", eventInfo.rules);
        formData.append("startDate", eventInfo.startDate);
        formData.append("endDate", eventInfo.endDate);


        eventInfo.categoryIds.forEach((id) => {
            formData.append("categoryIds", id);
        });

        const response = await axios.post(EVENT_GET, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
        return response.data;

    } catch (err) {
        console.log(err.message);
        return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
    }
})

export const updateEvent = createAsyncThunk(
    "updateEvent",
    async ({ eventId, eventInfo }, thunkAPI) => {
        try {
            const formData = new FormData();
            console.log(eventId, eventInfo);

            formData.append("eventName", eventInfo.eventName);
            formData.append("eventDescription", eventInfo.eventDescription);
            if (eventInfo.image) {
                formData.append("image", eventInfo.image);
            }
            formData.append("city", eventInfo.city);
            formData.append("country", eventInfo.country);
            formData.append("location", eventInfo.location);
            formData.append("numberOfTickets", eventInfo.numberOfTickets);
            formData.append("ticketPrice", eventInfo.ticketPrice);
            formData.append("isOnSale", eventInfo.isOnSale);
            formData.append("isOnBanner", eventInfo.isOnBanner);
            formData.append("rules", eventInfo.rules);
            formData.append("startDate", eventInfo.startDate);
            formData.append("endDate", eventInfo.endDate);

            (eventInfo.categoryIds || []).forEach((id) => {
                formData.append("categoryIds", id.toString());
            });

            const response = await axios.put(`${EVENT_GET}/${eventId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            return response.data;

        } catch (err) {
            console.log(err.message);
            return thunkAPI.rejectWithValue(err.response?.data || "Sunucu hatası");
        }
    }
);




const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        clearEvents: (state) => {
            state.events = [];
        },
        clearEventsByCat: (state) => {
            state.eventsByCat = [];
        },
        clearAddedEvent: (state) => {
            state.addedEvent = null;
        },
        clearRemovedEvent: (state) => {
            state.removedEvent = null
        },
        clearUpdatedEvent: (state) => {
            state.updatedEvent = null
        }
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
                state.eventsByCat = action.payload;
            })
            .addCase(getEventsByCategoryId.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
            .addCase(removeEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.removedEvent = action.payload;
            })
            .addCase(removeEvent.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
            .addCase(addEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(addEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.addedEvent = action.payload;
            })
            .addCase(addEvent.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
            .addCase(updateEvent.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateEvent.fulfilled, (state, action) => {
                state.loading = false;
                state.updatedEvent = action.payload;
            })
            .addCase(updateEvent.rejected, (state, action) => {
                state.loading = false;
                state.errMessage = action.payload;
            })
    }
})

export const { clearEvents, clearEventsByCat, clearAddedEvent, clearRemovedEvent, clearUpdatedEvent } = eventSlice.actions;
export default eventSlice.reducer;


