import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchScores = createAsyncThunk("scores/fetchScores", async () => {
  const response = await axios.get("/api/scores");
  return response.data;
});

const scoreSlice = createSlice({
  name: "scores",
  initialState: {
    data: [],
    status: "idle",
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScores.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchScores.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchScores.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default scoreSlice.reducer;
