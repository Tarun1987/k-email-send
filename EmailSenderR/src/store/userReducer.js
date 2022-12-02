import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: "userInfo",
    initialState: {
        value: {},
    },
    reducers: {
        setInfo: (state, action) => {
            console.log(action);
            state.value = { ...state.value, ...action.payload };
        },
        removeInfo: (state) => {
            state.value = {};
        },
    },
});

// Action creators are generated for each case reducer function
export const { setInfo, removeInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
