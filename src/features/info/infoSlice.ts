import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';
import { fetchInfo } from '~/api/info';
import { FetchInfoResponse } from '~/api/info.types';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';

const SLICE_NAME = 'info';

type Info = FetchInfoResponse['data']['info'];

interface IS {
  fetchInfo: RequestStateProperty<Info, ApiError>;
}

const initialState: IS = {
  fetchInfo: makeRequestStateProperty(),
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchInfoThunk, 'fetchInfo');
  },
});

const fetchInfoThunk = createAsyncThunk<Info>(`SLICE_NAME/fetchInfoThunk`, async (_, store) => {
  try {
    const res = await fetchInfo();
    return store.fulfillWithValue(res.data.info);
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const infoSlice = { actions, selectors, thunks: { fetchInfoThunk } } as const;

export const infoReducer = reducer;
