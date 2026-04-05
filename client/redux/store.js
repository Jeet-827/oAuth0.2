import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/tokenSlice"
const store = configureStore({
    reducer: {
        user: userReducer
    },
})


export default store;