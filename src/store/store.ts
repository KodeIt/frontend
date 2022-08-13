import {appReducer, AppSliceInitialState} from "./app-slice";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {userReducer, UserSliceInitialState} from "./user-slice";
import persistReducer from "redux-persist/es/persistReducer";

interface StoreStateType {
    app: AppSliceInitialState;
    user: UserSliceInitialState;
}

const rootPersistConfig = {
    key: "kodeit",
    storage,
};

const appPersistConfig = {
    key: "kodeit-app",
    storage,
};

const userPersistConfig = {
    key: "kodeit-user",
    storage,
};

const rootReducer = combineReducers({
    app: persistReducer(appPersistConfig, appReducer),
    user: persistReducer(userPersistConfig, userReducer),
});

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
});

const persistor = persistStore(store);

export default store;
export {persistor};
export type RootDispatch = ReturnType<typeof store.dispatch>;
export type {StoreStateType};