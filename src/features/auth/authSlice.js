import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    profile: null,
    area: null,
    isAuthenticated: false,
    isLoading: false,
    errors: {},
    message: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        authStart(state) {
            state.isLoading = true;
            state.errors = {};
            state.message = null;
        },
        authSuccess(state, action) {
            state.user = action.payload.user;
            state.profile = action.payload.profile;
            state.area = action.payload.area;
            state.isAuthenticated = true;
            state.isLoading = false;
            state.errors = {};
            state.message = null;

        },
        authFail(state, action) {
            state.errors = action.payload.errors ? action.payload.errors : {};
            state.isLoading = false;
            state.message = action.payload.message;

        },
        logout(state) {
            localStorage.removeItem('token')
            state.user = null;
            state.area = null;
            state.profile = null;
            state.isAuthenticated = false;
        },
    },
});

export const { authStart, authSuccess, authFail, logout } = authSlice.actions;

export default authSlice.reducer;
