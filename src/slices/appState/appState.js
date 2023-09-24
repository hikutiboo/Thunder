import { createSlice } from '@reduxjs/toolkit';

const appState = createSlice({
    name: 'appState',
    initialState: {
        global: { status: "loading", message: "" },
        header: { status: "loading" }
    },
    reducers: {
        setAppState: (state, action) => {
            let { section, data } = action.payload;

            state[section] = data;
        }
    },
});

export const { setAppState } = appState.actions;
export default appState.reducer;