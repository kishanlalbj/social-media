import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { fetchPostsAsync } from "./posts";

export const fetchProfileById = createAsyncThunk(
  "profile/fetchProfile",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axios.get(`/users/${id}`);

      return resp.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

export const likePostAsync = createAsyncThunk(
  "profile/likePost",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `/posts/${id}/like`,
        {}
      );

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commentPostAsync = createAsyncThunk(
  "profile/commentPost",
  async (comment, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `/posts/${comment.id}/comment`,
        {
          text: comment.text,
        }
      );

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const profile = createSlice({
  name: "profile",
  initialState: {
    loading: true,
    profile: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfileById.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.error = null;
      })
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(likePostAsync.fulfilled, (state, action) => {
        const index = state.profile.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.profile.posts[index].likes = action.payload.likes;
      })
      .addCase(commentPostAsync.fulfilled, (state, action) => {
        const index = state.profile.posts.findIndex(
          (post) => post._id === action.payload._id
        );

        state.profile.posts[index].comments = action.payload.comments;
      })
  },
});

export default profile.reducer;
