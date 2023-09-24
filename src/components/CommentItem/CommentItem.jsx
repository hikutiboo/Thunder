/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import "./comment-item.sass";
import { Link } from 'react-router-dom';
import { Avatar, Button } from '@mui/material';
import store from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { likeComment, removeComment, unlikeComment } from '../../slices/posts/posts';
import AgreeModal from '../AgreeModal/AgreeModal';
import { setAppState } from '../../slices/appState/appState';

function CommentItem({ className, commentPath, postId, postAuthor }) {
    const comment = useSelector(state => state.posts[commentPath.user][commentPath.post].comments[commentPath.comment]),
        currentAccountId = comment.author,
        currentAccountData = store.getState().accounts[currentAccountId],
        currentAccount = store.getState().currentAccount.value,
        isLiked = comment.likes.includes(currentAccount),
        [displayRemoveCommentModal, setDisplayRemoveCommentModal] = useState(false),
        dispatch = useDispatch();

    function toggleRemoveCommentModal() {
        setDisplayRemoveCommentModal(!displayRemoveCommentModal);
    }

    function commentRemover() {
        toggleRemoveCommentModal();

        dispatch(removeComment([postAuthor, postId, comment.commentId]));
    }

    function likeToggler() {
        if (!currentAccount) {
            dispatch(setAppState({section: "global", data: {status: "error", message: "You are not logged in!"}}));
            return;
        }

        const currentFunction = isLiked ? unlikeComment : likeComment,
            actionPayload = {
                userId: postAuthor,
                postId,
                commentId: comment.commentId,
                provider: currentAccount
            };

        dispatch(currentFunction(actionPayload));
    }

    function stringToColor(string) {
        let hash = 0,
            color = '#';

        for (let i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        for (let i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.slice(-2);
        }

        return color;
    }

    function stringAvatar() {

        let name = currentAccountData.nickname,
            userData = currentAccountData;

        if (!name) {
            return '';
        }

        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: name.split(" ").map(item => {
                return item[0];
            }),
            src: userData.profile_picture
        };
    }
    return (
        <div className={className}>
            <Link to={"/user/" + comment.author} className="account-card commentator-avatar-container">
                <Avatar {...stringAvatar()} className="commentator-avatar" />
            </Link>
            <Link to={"/user/" + comment.author} className="account-card">
                <div className="usernames-set">
                    <span className="nickname">{currentAccountData.nickname}</span>
                </div>
            </Link>
            <div className="comment-actions">
                {
                    comment.author == currentAccount ? (
                        <div onClick={toggleRemoveCommentModal} className="remove-comment-container">
                            <i className="fa-solid fa-trash-can remove-comment-icon"></i>
                        </div>
                    ) : ''
                }
                <div onClick={likeToggler} className="comment-likes-container">
                    <i className={`fa-${isLiked ? "solid" : "regular"} fa-heart comment-like-icon`}></i>
                    <span className="likes-count">
                        {comment.likes.length}
                    </span>
                </div>
            </div>
            <p className="comment-content">
                {comment.message}
            </p>
            {
                displayRemoveCommentModal ? (

                    <AgreeModal
                        className="extended"
                        component={
                            <>
                                <h3 className="agree-modal-header">
                                    Are you sure you want to remove this comment?
                                </h3>
                                <div className="agree-modal-actions">
                                    <Button onClick={toggleRemoveCommentModal} className="agree-modal-action agree-modal-action-disagree">disagree</Button>
                                    <Button onClick={commentRemover} className="agree-modal-action agree-modal-action-agree">agree</Button>
                                </div>
                            </>
                        }
                    />
                ) : ''
            }
        </div>
    )
}

export default CommentItem;