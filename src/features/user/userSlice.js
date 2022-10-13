import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

const initialState = {
    user: {},
    isLogin: false,
    error: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCurrentUser: {
            reducer(state, action) {
                const { name, role } = action.payload;
                state.user.name = name;
                state.user.role = role;
                state.isLogin = true;
            },
            prepare(token) {
                const jwtPayload = jwt_decode(token);
                return {
                    payload: {
                        name: jwtPayload.name,
                        role: jwtPayload.role,
                    },
                };
            },
        },
        logOut: {
            reducer(state, action) {
                state.user = {};
                state.isLogin = false;
                state.error = '';
            },
            prepare() {
                localStorage.removeItem('accessToken');

                return {
                    payload: {},
                };
            },
        },
    },
});

export const { setCurrentUser, logOut } = userSlice.actions;

export default userSlice.reducer;
