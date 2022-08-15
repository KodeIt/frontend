import {createSlice} from "@reduxjs/toolkit";

interface AppSliceInitialState {
    isLoggedIn: boolean;
    isDarkMode: boolean;
}

const initialState: AppSliceInitialState = {
    isLoggedIn: false,
    isDarkMode: false
};

const appSlice = createSlice({
    name: "kodeit-app",
    initialState,
    reducers: {
        login(state: AppSliceInitialState) {
            state.isLoggedIn = true;
        },
        toggleDarkMode(state: AppSliceInitialState) {
            state.isDarkMode = !state.isDarkMode;
        }
    },
});

const appActions = appSlice.actions;
const appReducer = appSlice.reducer;

export {appActions, appReducer};
export type {AppSliceInitialState};