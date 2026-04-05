import { createSlice } from "@reduxjs/toolkit";

const userSclice = createSlice({
    name: "user",
    initialState: {
        token: null
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload;

        }
    }
})
export const { setToken } = userSclice.actions;
export default userSclice.reducer

