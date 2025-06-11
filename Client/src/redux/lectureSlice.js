import {createSlice} from '@reduxjs/toolkit';
// This file is for managing authentication state in a Redux store using Redux Toolkit.
// It will handle user login, logout, and possibly user profile management.
// The slice will include actions and reducers to update the authentication state.
const lectureSlice = createSlice({
    name:"lecture",
    initialState: {
        lecture: [],  //null value changed to []
        
    },
    reducers:{
        //actions
        setLecture: (state, action) => {
            state.lecture = action.payload; // Set the user state to the payload
        },
    }
});

export const { setLecture } = lectureSlice.actions; // Export the action creator for setting the user
export default lectureSlice.reducer; // Export the reducer to be used in the store