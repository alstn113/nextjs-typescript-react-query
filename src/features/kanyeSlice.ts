import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { AppState } from '@/app/store';

export type KanyeState = {
  data: { quote: string };
  pending: boolean;
  error: boolean;
};

const initialState: KanyeState = {
  data: { quote: 'click that button' },
  pending: false,
  error: false,
};

export const getKanyeQuote = createAsyncThunk('kanye/kanyeQuote', async () => {
  const response = await axios.get('https://api.kanye.rest/');

  return response.data;
});

export const kanyeSlice = createSlice({
  name: 'kanyeQuote',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getKanyeQuote.pending, (state) => {
        state.pending = true;
      })
      .addCase(getKanyeQuote.fulfilled, (state, { payload }) => {
        state.pending = false;
        state.data = payload;
      })
      .addCase(getKanyeQuote.rejected, (state) => {
        state.pending = false;
        state.error = true;
      });
  },
});

export const selectKanye = (state: AppState) => state.kanyeQuote;

export default kanyeSlice.reducer;
