import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const registerUserAsync = createAsyncThunk(
  "auth/registerUser",
  async (formData, { rejectWithValue }) => {
    try {
      const resp = await axios.post("/auth/register", { ...formData });

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const registration = createSlice({
  name: "registration",
  initialState: {
    loading: false,
    error: null,
    registration: {},
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(registerUserAsync.fulfilled, (state) => {
        state.loading = false;
    }).addCase(registerUserAsync.pending, (state) => {
        state.loading = true
    }).addCase(registerUserAsync.rejected, (state, action) => {
        state.error = action.error.message
    })
  }
});

export default registration.reducer;
