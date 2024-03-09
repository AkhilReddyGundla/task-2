import { combineReducers} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import pageReducer from './slices/userGridInfo'
const rootReducer  = combineReducers({
    auth : authReducer,
    gridInfo : pageReducer
})

export default rootReducer