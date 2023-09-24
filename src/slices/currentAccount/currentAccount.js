import { createSlice } from '@reduxjs/toolkit';

const currentAccount = createSlice({
    name: 'currentAccount',
    initialState: { value: "hikutiboo" },
    reducers: {
        clearCurrentAccount: (state) => {
            state.value = undefined;
        },
        changeCurrentAccount: (state, action) => {
            state.value = action.payload;
        }
    },
});

export const { clearCurrentAccount, changeCurrentAccount } = currentAccount.actions;
export default currentAccount.reducer;