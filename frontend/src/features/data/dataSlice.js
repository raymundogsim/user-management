import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: [],
    contacts: [],
    errors: {},
    inventories: []
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
        setInventories(state, action) {
            state.inventories = action.payload;
        },
        clearInventories(state, action) {
            state.inventories = []
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

export const { setUsers, clearUsers, setInventories, clearInventories, setContacts, clearContacts, setErrors, clearErrors } = authSlice.actions;

export default authSlice.reducer;
