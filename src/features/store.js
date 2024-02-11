// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import dataReducer from 'features/data/dataSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        data: dataReducer
        // todos: todoReducer
    },
    // Apply middleware or enhancers if needed
});

export default store;
