import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    contacts: [],
    errors: {}
};

const authSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setUsers(state, action) {
            state.users = action.payload;
        },
        clearUsers(state, action) {
            state.users = []
        },
        setContacts(state, action) {
            state.contacts = action.payload;
        },
        clearContacts(state, action) {
            state.contacts = []
        },
        setErrors(state, action) {
            state.errors = action.payload;
        },
        clearErrors(state) {
            state.errors = {}
        }
    },
});

export const { setUsers, clearUsers, setContacts, clearContacts, setErrors, clearErrors } = authSlice.actions;

export default authSlice.reducer;
