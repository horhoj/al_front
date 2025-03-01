import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkToken, signIn, signOut } from '~/api/auth';
import { AuthCredentials } from '~/api/auth.types';
import { getApiErrors } from '~/api/common';
import { ApiError } from '~/api/common.types';
import { makeRequestExtraReducer, makeRequestStateProperty, RequestList, RequestStateProperty } from '~/store/helpers';
import { delay } from '~/utils/delay';

const SLICE_NAME = 'auth';

interface IS {
  isAuth: boolean;
  signInRequest: RequestStateProperty<unknown, ApiError>;
  signOutRequest: RequestStateProperty;
  checkTokenRequest: RequestStateProperty;
}

const initialState: IS = {
  isAuth: false,
  signInRequest: makeRequestStateProperty(),
  signOutRequest: makeRequestStateProperty(),
  checkTokenRequest: makeRequestStateProperty({ isLoading: true }),
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    makeRequestExtraReducer<RequestList<IS>>(builder, signInThunk, 'signInRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, signOutThunk, 'signInRequest');
    makeRequestExtraReducer<RequestList<IS>>(builder, checkTokenThunk, 'checkTokenRequest');
  },
});

interface SignInPayload {
  onSuccess: () => void;
  credentials: AuthCredentials;
}

const signInThunk = createAsyncThunk(
  `SLICE_NAME/signInThunk`,
  async ({ onSuccess, credentials }: SignInPayload, store) => {
    try {
      await signIn(credentials);

      store.dispatch(actions.setIsAuth(true));
      onSuccess();
      return store.fulfillWithValue(null);
    } catch (e: unknown) {
      console.log(e);
      return store.rejectWithValue(getApiErrors(e));
    }
  },
);

interface SignOutPayload {
  onSuccess: () => void;
}

const signOutThunk = createAsyncThunk(`SLICE_NAME/signOutThunk`, async ({ onSuccess }: SignOutPayload, store) => {
  try {
    await signOut();
    onSuccess();
    await delay(100);
    store.dispatch(actions.setIsAuth(false));
    return store.fulfillWithValue(null);
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

const checkTokenThunk = createAsyncThunk(`SLICE_NAME/checkTokenThunk`, async (_, store) => {
  try {
    await checkToken();
    store.dispatch(actions.setIsAuth(true));
    return store.fulfillWithValue(null);
  } catch (e: unknown) {
    return store.rejectWithValue(getApiErrors(e));
  }
});

export const authSlice = { actions, selectors, thunks: { signInThunk, signOutThunk, checkTokenThunk } } as const;

export const authReducer = reducer;
