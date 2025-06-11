import {createSlice} from '@reduxjs/toolkit';
// This file is for managing authentication state in a Redux store using Redux Toolkit.
// It will handle user login, logout, and possibly user profile management.
// The slice will include actions and reducers to update the authentication state.
const courseSlice = createSlice({
    name:"course",
    initialState: {
        course: null,
        
    },
    reducers:{
        //actions
        setCourse: (state, action) => {
            state.course = action.payload; // Set the user state to the payload
        },
    }
});

export const { setCourse } = courseSlice.actions; // Export the action creator for setting the user
export default courseSlice.reducer; // Export the reducer to be used in the store