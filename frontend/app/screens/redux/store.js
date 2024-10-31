import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userredux.js";

export default configureStore({
    reducer:{
        user:userReducer
    }
})