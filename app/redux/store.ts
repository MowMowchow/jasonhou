import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { fordleReducer, initialFordleState } from "./reducers/fordle";

const initialState = {
  fordleReducer: initialFordleState,
};

const reducer = {
  fordleReducer: fordleReducer,
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const jasonHouStore = configureStore({
  reducer: reducer,
  devTools: true,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof jasonHouStore.getState>;
export type AppDispatch = typeof jasonHouStore.dispatch;
