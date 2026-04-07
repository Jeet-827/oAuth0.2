import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slices/tokenSlice"
import userData from "./slices/userSlice"
const store = configureStore({
    reducer: {
        user: userReducer,
        userdata: userData,

    },
})


export default store;