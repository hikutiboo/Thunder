/* eslint-disable eqeqeq */
import { createSlice } from '@reduxjs/toolkit';

const homePagePostsData = createSlice({
    name: 'homePagePostsData',
    initialState: [
        {
            userId: "hikutiboo",
            postId: 0
        }
    ],
    reducers: {
        addHomePagePost: (state, action) => {
            let { userId, postId } = action.payload;

            if (
                !state.some(item => (item.userId === userId && item.postId === postId))
            ) {
                state.unshift(
                    {
                        userId,
                        postId
                    }
                )
            };
        },
        removeHomePagePost: (state, action) => {
            let { userId, postId } = action.payload;

            state.forEach((element, i) => {
                if (element.userId == userId && element.postId == postId) {
                    state.splice(i, 1);
                }
            });
        }
    }
});

export const { addHomePagePost, removeHomePagePost } = homePagePostsData.actions;
export default homePagePostsData.reducer;