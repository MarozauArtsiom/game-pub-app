import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const response = await axios.get('api/games');
    return response.data;
  }
);

// Async thunk for adding a game
export const addGame = createAsyncThunk('games/addGame', async (gameData) => {
  const response = await axios.put('/api/games', gameData);
  return response.data;
});

// Async thunk for deleting a game
export const deleteGame = createAsyncThunk('games/deleteGame', async (gameId) => {
  await axios.delete(`/api/games/${gameId}`);
  return gameId;
});

export const gameSlice = createSlice({
  name: 'games',
  initialState: {
    data: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    isAdding: false,
  },
  extraReducers: (builder) => {
    builder
      // game: fetch
      .addCase(fetchGames.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // game: add
      .addCase(addGame.pending, (state) => {
        state.isAdding = true;
      })
      .addCase(addGame.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.isAdding = false;
      })
      .addCase(addGame.rejected, (state, action) => {
        state.isAdding = false;
        state.error = action.error.message;
      })
      // game: delete
      .addCase(deleteGame.fulfilled, (state, action) => {
        state.data = state.data.filter(game => game.id !== action.payload);
      });
  },
});

export default gameSlice.reducer;
