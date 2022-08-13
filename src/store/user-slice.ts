import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {JWT, User} from '../util/entities';

interface UserSliceInitialState {
    user: User;
    jwt: JWT;
}

const initialState: UserSliceInitialState = {
    user: {
        id: null,
        name: null,
        email: null,
        bio: null,
        memberSince: null,
        avatar: null,
        state: null,
        country: null,
    },
    jwt: {
        accessToken: null,
        refreshToken: null,
    },
};

const userSlice = createSlice({
    name: "kodeit-user",
    initialState,
    reducers: {
        updateUser(state: UserSliceInitialState, action: PayloadAction<User>) {
            state.user.id = action.payload.id ? action.payload.id : state.user.id;
            state.user.name = action.payload.name ? action.payload.name : state.user.name;
            state.user.email = action.payload.email ? action.payload.email : state.user.email;
            state.user.bio = action.payload.bio ? action.payload.bio : state.user.bio;
            state.user.avatar = action.payload.avatar ? action.payload.avatar : state.user.avatar;
            state.user.state = action.payload.state ? action.payload.state : state.user.state;
            state.user.country = action.payload.country ? action.payload.country : state.user.country;
            state.user.memberSince = action.payload.memberSince ? action.payload.memberSince : state.user.memberSince;
        },
        updateJWT(state: UserSliceInitialState, action: PayloadAction<JWT>) {
            state.jwt.accessToken = action.payload.accessToken ? action.payload.accessToken : state.jwt.accessToken;
            state.jwt.refreshToken = action.payload.refreshToken ? action.payload.refreshToken : state.jwt.refreshToken;
        },
    },
});

const userActions = userSlice.actions;
const userReducer = userSlice.reducer;

export {userActions, userReducer};
export type {UserSliceInitialState};