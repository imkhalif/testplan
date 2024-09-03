import { createAction } from '@reduxjs/toolkit';

export const fetchData = createAction('FETCH_DATA');
export const fetchDataSuccess = createAction('FETCH_DATA_SUCCESS');
export const fetchDataFailure = createAction('FETCH_DATA_FAILURE');
