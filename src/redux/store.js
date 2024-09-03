import { configureStore } from '@reduxjs/toolkit';
import { createEpicMiddleware } from 'redux-observable';
import dataReducer from './slice';
import fetchDataEpic from './epics';

const epicMiddleware = createEpicMiddleware();

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(epicMiddleware),
});

epicMiddleware.run(fetchDataEpic);

export default store;
