import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : 'user',
    initialState: null,
    reducers:{
        addUser: (state,acttion) =>{
            return acttion.payload;
        },
        removeUser : (state, action) =>{
            return null
        },
    },
})

export const {addUser, removeUser} = userSlice.actions
export default userSlice.reducer;