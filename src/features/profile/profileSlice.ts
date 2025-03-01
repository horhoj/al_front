import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FetchProfileQuoteResponse } from './../../api/profile.types';
import { RequestingTheQuoteStatus } from './types';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';
import { fetchProfileAuthor, fetchProfileData, fetchProfileQuote } from '~/api/profile';
import { FetchProfileAuthorResponse, FetchProfileDataResponse } from '~/api/profile.types';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';
import { delay } from '~/utils/delay';

const SLICE_NAME = 'profile';

interface IS {
  fetchProfileDataRequest: RequestStateProperty<FetchProfileDataResponse, ApiError>;
  requestingTheQuoteRequest: RequestStateProperty<string, ApiError>;
  requestingTheQuoteStatus: RequestingTheQuoteStatus | null;
}

const initialState: IS = {
  fetchProfileDataRequest: makeRequestStateProperty(),
  requestingTheQuoteRequest: makeRequestStateProperty(),
  requestingTheQuoteStatus: null,
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
    setRequestingTheQuoteStatus: (state, action: PayloadAction<RequestingTheQuoteStatus | null>) => {
      state.requestingTheQuoteStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, fetchProfileDataThunk, 'fetchProfileDataRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, requestingTheQuoteThunk, 'requestingTheQuoteRequest', true);
  },
});

const fetchProfileDataThunk = createAsyncThunk(`SLICE_NAME/fetchProfileDataThunk`, async (_, store) => {
  try {
    const res = await fetchProfileData();
    return store.fulfillWithValue(res);
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

const requestingTheQuoteThunk = createAsyncThunk(`SLICE_NAME/requestingTheQuoteThunk`, async (_, store) => {
  try {
    let randomAuthor: FetchProfileAuthorResponse | null = null;
    let quote: FetchProfileQuoteResponse | null = null;
    if (!store.signal.aborted) {
      store.dispatch(actions.setRequestingTheQuoteStatus('requesting_autor'));
      randomAuthor = await fetchProfileAuthor();
    }
    if (!store.signal.aborted) {
      store.dispatch(actions.setRequestingTheQuoteStatus('requesting_quote'));
      quote = await fetchProfileQuote(randomAuthor?.data.authorId.toString() ?? '-1');
    }
    if (!store.signal.aborted) {
      store.dispatch(actions.setRequestingTheQuoteStatus('complete'));
      await delay(300);
    }
    if (!store.signal.aborted) {
      store.dispatch(actions.setRequestingTheQuoteStatus(null));
      return store.fulfillWithValue(`${randomAuthor?.data.name}: ${quote?.data.quote}`);
    }
  } catch (e: unknown) {
    if (store.signal.aborted) {
      return store.fulfillWithValue(null);
    }
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const profileSlice = { actions, selectors, thunks: { fetchProfileDataThunk, requestingTheQuoteThunk } } as const;

export const profileReducer = reducer;
