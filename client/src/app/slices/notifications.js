import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchNotificationsAsync = createAsyncThunk(
  "notifications/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/notifications");

      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const notificationSlice = createSlice({
  name: "notifications",
  initialState: {
    results: [],
    loading: true,
    error: false,
  },
  reducers: {
    addNotification: (state, action) => {
      state.results.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchNotificationsAsync.pending, (state) => {
        state.loading = true
    }).addCase(fetchNotificationsAsync.fulfilled, (state, action) => {
        state.loading = false
        state.results = action.payload
    }).addCase(fetchNotificationsAsync.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
    })
  }
});

export const { addNotification } = notificationSlice.actions;

export default notificationSlice.reducer;
