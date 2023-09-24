/* eslint-disable eqeqeq */
import React, { useRef } from 'react';
import "./comment-section.sass"
import { CommentItem } from '../components';
import store from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { addComment, likePost, unlikePost } from '../../slices/posts/posts';
import { setAppState } from '../../slices/appState/appState';

function CommentSection({ className, post, userId }) {
    let postIndex = undefined;

    store.getState().posts[userId].forEach((element, i) => {
        if (element.postId == post.postId) {
            postIndex = i;
        }
    });

    const currentPost = useSelector(state => state.posts[userId][postIndex]),
        currentAccount = store.getState().currentAccount.value,
        isLiked = currentPost.likes.includes(currentAccount),
        commentInputRef = useRef(null),
        dispatch = useDispatch();

    function likeToggler() {
        if (!currentAccount) {
            dispatch(setAppState({section: "global", data: {status: "error", message: "You are not logged in!"}}));
            return;
        }

        const currentFunction = isLiked ? unlikePost : likePost,
            actionPayload = [
                userId,
                post.postId,
                currentAccount
            ];

        dispatch(currentFunction(actionPayload));
    }

    function commentValidator(e) {
        let currentValue = commentInputRef.current.value;
        dispatch(setAppState({ section: "global", data: { status: "success" } }));

        while (currentValue[0] == " ") {
            currentValue = currentValue.slice(1);
        }

        while (currentValue.at(-1) == " ") {
            currentValue = currentValue.slice(0, -1);
        }

        if (!currentValue) {
            dispatch(setAppState({ section: "global", data: { status: "error", message: "No empty comments!" } }));
            return;
        }

        if (currentValue.length > 1000) {
            dispatch(setAppState({ section: "global", data: { status: "error", message: "Too long comment!" } }));
            commentInputRef.current.value = currentValue.slice(0, 1000);
            return;
        }

        if (e.key === "Enter") {
            commentSubmitter(currentValue)
        }

        return currentValue;
    }

    function commentSubmitter(currentValue) {
        if (!currentAccount) {
            dispatch(setAppState({section: "global", data: {status: "error", message: "You are not logged in!"}}));
            return;
        }
        
        if (!currentValue) {
            dispatch(setAppState({ section: "global", data: { status: "error", message: "No empty comments!" } }));
            return;
        }

        commentInputRef.current.value = '';

        dispatch(addComment([
            userId,
            post.postId,
            currentAccount,
            currentValue
        ]));
    }

    return (
        <div className={className}>
            <div className="comments-header">
                Comments: {store.getState().posts[userId][postIndex].comments.length}
            </div>
            <div className="coments-container">
                <p className="post-description">
                    {currentPost?.description ? currentPost?.description : "*No description*"}
                </p>
                {
                    store.getState().posts[userId][postIndex].comments.map((item, i) => {
                        return (
                            <CommentItem
                                className="comment-item"
                                key={userId + "_" + post.postId + "_" + item.commentId}
                                commentPath={
                                    {
                                        user: userId,
                                        post: postIndex,
                                        comment: i
                                    }
                                }
                                postId={post.postId}
                                postAuthor={userId}
                            />
                        );
                    })
                }
                {!store.getState().posts[userId][postIndex]?.comments?.length ? (<p className="no-comments">No comments here :(</p>) : ''}
            </div>
            <div className="comment-like-section">
                <button
                    onClick={likeToggler}
                    style={
                        {
                            color: isLiked ? "inherit" : "#000"
                        }
                    }
                    className="comment-like-section-button post-like-button"
                >

                    <i className={`fa-${isLiked ? "solid" : "regular"} fa-heart post-like-icon`}></i>
                    <span className="likes-count">
                        {currentPost.likes.length}
                    </span>
                </button>
                <input
                    onKeyUp={commentValidator}
                    ref={commentInputRef}
                    type="text"
                    name="comment"
                    id="create_comment"
                    className="create-comment-input"
                    placeholder="Describe your feelings"
                />
                <button
                    onClick={(e) => commentSubmitter(commentValidator(e))}
                    type="submit"
                    className="comment-like-section-button create-comment-button"
                >
                    <i className="fa-solid fa-paper-plane"></i>
                    Send
                </button>
            </div>
        </div >
    )
}

export default CommentSection;