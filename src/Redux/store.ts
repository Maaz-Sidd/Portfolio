import rootslice from "./rootslice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

const reducer = combineReducers({
    root: rootslice,
})

export const store = configureStore({
    reducer: reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;