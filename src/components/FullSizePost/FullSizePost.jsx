/* eslint-disable eqeqeq */
import React, { useState } from 'react';
import "./full-size-post.sass";
import store from '../../store/store';
import { Avatar, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { CommentSection } from '../components';
import { useDispatch } from 'react-redux';
import AgreeModal from '../AgreeModal/AgreeModal';
import { removePost } from '../../slices/posts/posts';
import { removeHomePagePost } from '../../slices/homePagePosts/homePagePosts';

function FullSizePost({ userId, postId }) {
    let postIndex = undefined;

    store.getState().posts[userId].forEach((element, i) => {
        if (element.postId == postId) {
            postIndex = i;
        }
    });

    const currentAccountData = store.getState().accounts[userId],
        currentUser = store.getState().currentAccount.value,
        postData = store.getState().posts[userId][postIndex],
        [displayModal, setDisplayModal] = useState(false),
        dispatch = useDispatch(),
        navigate = useNavigate();

    function toggleRemovePostModal() {
        setDisplayModal(!displayModal);
    }

    function removePostHandler() {
        toggleRemovePostModal();

        dispatch(removePost([userId, postId]));
        dispatch(removeHomePagePost({ userId, postId }));

        navigate("/user/" + userId);
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
        <div className="full-size-post">
            <Link to={"/user/" + userId} className="account-card">
                <Avatar {...stringAvatar()} />
                <div className="usernames-set">
                    <span className="nickname">{currentAccountData.nickname}</span>
                    <span className="user-id">@{userId}</span>
                </div>
            </Link>
            <div className="image-container">
                <img src={postData.image} alt="Post" className="post-image" />
            </div>
            {
                userId === currentUser ? (
                    <div onClick={() => setDisplayModal(true)} className="remove-post">
                        <i className="fa-solid fa-trash-can"></i>
                    </div>
                ) : ''
            }
            {
                displayModal ? (
                    <AgreeModal
                        className="extended"
                        component={
                            <>
                                <h3 className="agree-modal-header">
                                    Are you sure you want to remove your post?
                                </h3>
                                <div className="agree-modal-actions">
                                    <Button
                                        onClick={toggleRemovePostModal}
                                        className="agree-modal-action agree-modal-action-disagree"
                                    >
                                        disagree
                                    </Button>

                                    <Button
                                        onClick={removePostHandler}
                                        className="agree-modal-action agree-modal-action-agree"
                                    >
                                        agree
                                    </Button>
                                </div>
                            </>
                        }
                    />
                ) : ""
            }
            <CommentSection className="comments-section" post={postData} userId={userId} />
        </div>
    )
}

export default FullSizePost;