/* eslint-disable eqeqeq */
import { createSlice } from '@reduxjs/toolkit';

const postsData = createSlice({
    name: 'postsData',
    initialState: {
        "alesto": [
            {
                postId: 0,
                image: "https://www.notigatos.es/wp-content/uploads/2016/03/gatito_sorprendido.jpg.webp",
                description: '',
                likes: ["hikutiboo"],
                comments: [
                    {
                        commentId: 0,
                        author: "alesto",
                        message: "Message",
                        likes: ["hikutiboo"]
                    }
                ]
            }
        ],
        "hikutiboo": [
            {
                postId: 0,
                image: "https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                description: '',
                likes: ["hikutiboo"],
                comments: [
                    {
                        commentId: 1,
                        author: "alesto",
                        message: "Nice photo",
                        likes: ["hikutiboo"]
                    },
                    {
                        commentId: 0,
                        author: "alesto",
                        message: "Hello",
                        likes: ["hikutiboo"]
                    }
                ]
            }
        ],
    },
    reducers: {
        addPost: (state, action) => {
            let { userId, image, description } = action.payload;

            if (!state[userId]) state[userId] = [];

            state[userId].unshift(
                {
                    postId: state[userId][0] ? state[userId][0].postId + 1 : 1,
                    image,
                    description,
                    likes: [],
                    comments: []
                }
            );
        },
        removePost: (state, action) => {
            let [userId, removePostId] = action.payload;

            console.log(userId, removePostId);

            state[userId].forEach((item, i) => {
                if (item.postId == removePostId) state[userId].splice(i, 1);
            });
        },
        likePost: (state, action) => {
            let [userId, postId, executor] = action.payload;

            state[userId].forEach(item => {
                if (item.postId === postId) item["likes"].push(executor);
            });
        },
        unlikePost: (state, action) => {
            let [userId, postId, executor] = action.payload;

            state[userId].forEach((item, i) => {
                if (item.postId === postId) {
                    let removeLikeIndex = item["likes"].indexOf(executor);

                    if (removeLikeIndex !== -1) item["likes"].splice(removeLikeIndex, 1)
                };
            });
        },
        addComment: (state, action) => {
            let [userId, postId, executor, message] = action.payload;

            state[userId].forEach(item => {
                if (item.postId === postId) {
                    let currentCommentId = state[userId][0].comments[0]?.commentId !== undefined ?
                        state[userId][0].comments[0].commentId + 1 : 0;

                    item.comments.unshift(
                        {
                            commentId: currentCommentId,
                            author: executor,
                            message: message,
                            likes: []
                        }
                    )
                };
            });
        },
        editComment: (state, action) => {
            let [userId, postId, commentId, newMessage] = action.payload;

            state[userId].forEach((item) => {
                if (item.postId === postId) {
                    item.comments.forEach((comment) => {
                        if (comment.commentId === commentId) comment.message = newMessage;
                    })
                };
            });
        },
        removeComment: (state, action) => {
            let [userId, postId, commentId] = action.payload;

            state[userId].forEach((item) => {
                if (item.postId === postId) {
                    item.comments.forEach((comment, i) => {
                        if (comment.commentId === commentId) item.comments.splice(i, 1);
                    })
                };
            });
        },
        likeComment: (state, action) => {
            const { userId, postId, commentId, provider } = action.payload;

            state[userId].forEach(element => {
                if (element.postId == postId) {
                    element.comments.forEach(item => {
                        if (item.commentId == commentId) {
                            item.likes.push(provider);
                        }
                    })
                }
            })
        },
        unlikeComment: (state, action) => {
            const { userId, postId, commentId, provider } = action.payload;

            state[userId].forEach(element => {
                if (element.postId == postId) {
                    element.comments.forEach(item => {
                        if (item.commentId == commentId) {
                            let removeLikeIndex = item.likes.indexOf(provider);

                            if (removeLikeIndex !== -1) item.likes.splice(removeLikeIndex, 1);
                        }
                    })
                }
            })
        },
        addPostsThread: (state, action) => {
            let { userId } = action.payload;

            console.log();

            if (!state[userId]) { state[userId] = [] };
        }
    },
});

export const { addPost, removePost, likePost, unlikePost, addComment, editComment, removeComment, addPostsThread, likeComment, unlikeComment } = postsData.actions;
export default postsData.reducer;