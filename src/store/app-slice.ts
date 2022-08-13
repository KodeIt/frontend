import {createSlice} from "@reduxjs/toolkit";

interface AppSliceInitialState {
    isLoggedIn: boolean;
}

const initialState: AppSliceInitialState = {
    isLoggedIn: false,
};

const appSlice = createSlice({
    name: "kodeit-app",
    initialState,
    reducers: {
        login(state: AppSliceInitialState) {
            state.isLoggedIn = true;
        },
    },
});

const appActions = appSlice.actions;
const appReducer = appSlice.reducer;

export {appActions, appReducer};
export type {AppSliceInitialState};