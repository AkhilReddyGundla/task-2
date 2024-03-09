import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPage : 0,
} 

const userGridInfo = createSlice({
    name : "Grid information",
    initialState,
    reducers : {
        setCurrentPage(state,action){
            state.currentPage = action.payload
            localStorage.setItem('currentPage',action.payload)
        }
    }
})

export const {setCurrentPage} = userGridInfo.actions;
export default userGridInfo.reducer