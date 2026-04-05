import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./slicesh/tokenSplice"
const store = configureStore({
    reducer: {
        user: userReducer
    },
})


export default store;