import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchRecommendationAsync = createAsyncThunk(
  "recommendation/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("/users/recommendation");
      return res.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const recomSlice = createSlice({
  name: "recommendation",
  initialState: {
    loading: false,
    error: null,
    results: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecommendationAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecommendationAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload
      })
      .addCase(fetchRecommendationAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      });
  },
});

export default recomSlice.reducer