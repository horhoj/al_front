import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'settings';

interface IS {
  test: boolean;
}

const initialState: IS = {
  test: true,
};

const { actions, reducer, selectors } = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    clear: () => initialState,
  },
  extraReducers: (builder) => {},
});

// const fetchCommentsThunk = createAsyncThunk(`SLICE_NAME/fetchCommentsThunk`, async (_, store) => {
//   try {
//     const res = await commentsApi.fetchComments();
//     return store.fulfillWithValue(commentsApi.lastTenCommentDataMapper(res));
//   } catch (e: unknown) {
//     return store.rejectWithValue(getApiErrors(e));
//   }
// });

export const settingsSlice = { actions, selectors, thunks: {} } as const;

export const settingsReducer = reducer;
