import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

const posts = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    loading: false,
    error: null,
    newPost: {
      loading: true,
      post: {},
      error: null,
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.posts = action.payload;
      })
      .addCase(fetchPostsAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostsAsync.rejected, (state, action) => {
        state.loading = false;
        console.log({action})
        state.error = action.payload.message;
      })
      .addCase(createPostAsync.fulfilled, (state, action) => {
        state.newPost.loading = false;
        state.posts = [action.payload, ...state.posts];
        state.newPost.error = null;
      })
      .addCase(createPostAsync.pending, (state) => {
        state.newPost.loading = true;
      })
      .addCase(createPostAsync.rejected, (state, action) => {
        state.newPost.loading = false;
        state.newPost.error = action.payload.message;
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.loading = false
        state.posts = state.posts.filter(p => p._id !== action.payload._id)      
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.loading = true;
      }).addCase(deletePostAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })
      
      .addCase(likePostAsync.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.posts[index].likes = action.payload.likes;
      }).addCase(commnetPostAsync.fulfilled, (state, action) => {
          const index = state.posts.findIndex((post) => post._id === action.payload._id) 

          state.posts[index].comments = action.payload.comments
      } )
  },
});

export const fetchPostsAsync = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axios.get("/posts");
      return resp.data;
    } catch (error) {
      console.log(error)
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPostAsync = createAsyncThunk(
  "posts/createPosts",
  async (post, { rejectWithValue }) => {
    try {

      const formData = new FormData();

      formData.append('title', post.title)
      formData.append('file', post.file)
      const resp = await axios.post(
        "/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const deletePostAsync = createAsyncThunk("posts/deletePost", async (id, {rejectWithValue}) => {
  try {
    const res = await axios.delete(`/posts/${id}`)

    return res.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message)
  }
})

export const likePostAsync = createAsyncThunk(
  "posts/likePost",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `/posts/${id}/like`,
        {},
      );

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const commnetPostAsync = createAsyncThunk(
  "posts/commentPost",
  async (comment, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `/posts/${comment.id}/comment`,
        {
          text: comment.text
        }
      );

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export default posts.reducer;
