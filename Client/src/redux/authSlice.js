import {createSlice} from '@reduxjs/toolkit';
// This file is for managing authentication state in a Redux store using Redux Toolkit.
// It will handle user login, logout, and possibly user profile management.
// The slice will include actions and reducers to update the authentication state.
const authSlice = createSlice({
    name:"auth",
    initialState: {
        user: null,
        
    },
    reducers:{
        //actions
        setUser: (state, action) => {
            state.user = action.payload; // Set the user state to the payload
        },
    }
});

export const { setUser } = authSlice.actions; // Export the action creator for setting the user
export default authSlice.reducer; // Export the reducer to be used in the store