import { createSlice } from '@reduxjs/toolkit';

const notificationData = createSlice({
    name: 'notificationData',
    initialState: { "hikutiboo": [{ author: "hikutiboo", message: "Liked your post", unread: true }] },
    reducers: {
        addMessage: (state, action) => {
            let { recipient, author, message } = action.payload;

            state[recipient].unshift(
                {
                    author,
                    message,
                    unread: true
                }
            );
        },
        addMessagesThread: (state, action) => {
            let { userId } = action.payload;

            if (!state[userId]) { state[userId] = [] };
        },
        clearMessages: (state, action) => {
            let { userId } = action.payload;

            state[userId] = [];
        },
        readMeassges: (state, action) => {
            let { userId } = action.payload;

            state[userId].forEach(item => {
                item.unread = false;
            });
        }
    },
});

export const { addMessagesThread, clearMessages, readMeassges } = notificationData.actions;
export default notificationData.reducer;