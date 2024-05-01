import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../utils/axios";
import { jwtDecode } from "jwt-decode";

const auth = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    isAuthenticated: false,
    currentUser: {
      loading: false,
      user: null,
      error: null,
    },
    error: null,
  },
  reducers: {
    setCurrentUser: (state) => {
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("tkn");
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        localStorage.setItem("tkn", action.payload.token);
        state.isAuthenticated = true;
        state.loading = false;
        state.currentUser = jwtDecode(action.payload.token);
      })
      .addCase(loginAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.currentUser.loading = false;
        state.isAuthenticated = true;
        state.currentUser = action.payload;
      })
      .addCase(fetchCurrentUser.pending, (state) => {
        (state.currentUser.loading = true), (state.currentUser.error = null);
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.currentUser.loading = false;
        state.currentUser.error = action.error.message;
      })
      .addCase(followUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log("follow", action.payload);
        state.currentUser.following = action.payload.following;
      })
      .addCase(followUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(followUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(unfollowUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        console.log("unfollow", action.payload);
        state.currentUser.following = action.payload.following;
      })
      .addCase(unfollowUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(unfollowUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      })
      .addCase(editUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(editUserAsync.rejected, (state, action) => {
        state.currentUser = false;
        state.error = action.payload;
      });
  },
});

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (loginData, { rejectWithValue }) => {
    try {
      const resp = await axios.post("/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async () => {
    const resp = await axios.get("/auth/current-user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("tkn")}`,
      },
    });

    return resp.data;
  }
);

export const followUserAsync = createAsyncThunk(
  "auth/followUser",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `/users/follow/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        }
      );

      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const unfollowUserAsync = createAsyncThunk(
  "auth/unfollowUser",
  async (id, { rejectWithValue }) => {
    try {
      const resp = await axios.post(
        `/users/unfollow/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("tkn")}`,
          },
        }
      );

      return resp.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const editUserAsync = createAsyncThunk(
  "auth/editUser",
  async (formData, { rejectWithValue }) => {
    try {

        console.log({formData})
    
        const form = new FormData()
    
        form.append('file', formData.file)
        form.append('firstName', formData.firstName)
        form.append('lastName', formData.lastName)
        form.append('bio', formData.bio)
        form.append('city', formData.city)
        form.append('country', formData.country)
      
  
      const resp = await axios.put("/users/edit", formData, {
        headers: {
          "Content-Type": 'multipart/form-data'
        }
      });

      return resp.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const { setCurrentUser, logout } = auth.actions;

export default auth.reducer;
