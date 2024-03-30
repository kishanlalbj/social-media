import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";


export const searchUsersAsync = createAsyncThunk('profiles/search',
    async (q, { rejectWithValue }) => {
      try {
        const resp = await axios.post(`/users/search?q=${q}`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('tkn')}`
          }
        });
    
        return resp.data  
      } catch (error) {
        return rejectWithValue(error.response.data)
      }
    }
  );

const search = createSlice({
    name: 'search',
    initialState: {
        results: [],
        error: null,
        loading: false
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(searchUsersAsync.fulfilled, (state, action) => {
            state.loading = false
            state.results = action.payload
        }).addCase(searchUsersAsync.pending, (state) => {
            state.loading = true;
        }).addCase(searchUsersAsync.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message
        })
    }
})

export default search.reducer