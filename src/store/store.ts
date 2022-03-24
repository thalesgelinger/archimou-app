import {configureStore} from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import treeReducer from './slices/tree.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    tree: treeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
