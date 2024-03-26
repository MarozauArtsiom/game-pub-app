import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchLogin = createAsyncThunk("login/fetchLogin", async (code) => {
  const response = await axios.post("/api/authenticate", {code});
  return response.data;
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: JSON.parse(sessionStorage.userData) || {},
    isLoggedIn: JSON.parse(sessionStorage.isLoggedIn) || false,
    clientId: import.meta.env.VITE_APP_CLIENT_ID,
    redirectUri: import.meta.env.VITE_APP_REDIRECT_URI,
    error: null,
    status: "idle"
  },
  extraReducers: (builder) => {
    builder
      // login: fetch
      .addCase(fetchLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isLoggedIn = true;
        state.data = action.payload;
        sessionStorage.setItem("userData", JSON.stringify(action.payload));
        sessionStorage.setItem("isLoggedIn", JSON.stringify(true));
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default loginSlice.reducer;
