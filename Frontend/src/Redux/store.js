import { configureStore } from "@reduxjs/toolkit";

import authSliceReducer, { } from "./Slice/AuthSlice.js"

const store = configureStore({
    reducer: {
        auth: authSliceReducer
    },
    devTools: true
})

export default store;