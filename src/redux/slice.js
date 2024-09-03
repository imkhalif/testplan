import { createSlice } from '@reduxjs/toolkit';
import { fetchDataSuccess, fetchDataFailure } from './actions';

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    markAsVisited: (state, action) => {
      const item = state?.data.find(item => item.id === action.payload);
      if (item) {
        item.visited = true;
      }
    },
    markAsUnVisited: (state, action) => {
      const item = state?.data.find(item => item.id === action.payload);
      if (item) {
        item.visited = false;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDataSuccess, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchDataFailure, (state, action) => {
        state.data = null;
        state.loading = false;
        state.error = action.payload;
      })
      .addCase('FETCH_DATA', (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { markAsVisited, markAsUnVisited } = dataSlice.actions;

export default dataSlice.reducer;
