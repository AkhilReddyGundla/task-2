import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    token : null
}

const authSlice = createSlice({
    name : "auth slice",
    initialState,
    reducers : {
        manageToken(state,action){
            state.token = action.payload
            localStorage.setItem('token',action.payload)
        }
    }
})

export const {manageToken} = authSlice.actions
export default authSlice.reducer