import React from 'react';
import "./profile-content.sass";
import { Avatar, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import store from '../../store/store';
import { ProfilePostElement } from '../components';
import { subscribe, unsubscribe } from '../../slices/accounts/accounts';
import { useDispatch, useSelector } from 'react-redux';
import { setAppState } from '../../slices/appState/appState';

function ProfileContent() {
    const currentAccountId = useParams().userId,
        currentAccountData = store.getState().accounts[currentAccountId],
        currentPostsData = store.getState().posts[currentAccountId],
        currentUser = store.getState().currentAccount.value,
        currentUserData = useSelector(state => state.accounts[currentUser]),
        dispatch = useDispatch(),
        newPostButton = (
            <Link to={"/user/" + store.getState().currentAccount.value + "/new-post"}>
                <Button className="changeable-action-profile-button">
                    New post
                </Button>
            </Link>
        ),
        subscribeButton = currentUserData?.subscriberOf.includes(currentAccountId) ? (
            <Button onClick={() => subscriptionToggler("unsubscribe")} className="changeable-action-profile-button subscribed">
                Subscribed
            </Button>
        ) : (
            <Button onClick={() => subscriptionToggler("subscribe")} className="changeable-action-profile-button subscribe">
                Subscribe
            </Button>
        );

    currentUserData?.subscriberOf.includes(currentAccountId)

    function subscriptionToggler(type) {
        if (!currentUser) {
            dispatch(setAppState({section: "global", data: {status: "error", message: "You are not logged in!"}}));
            return;
        }

        let currentFunction = undefined,
            subscriberOf = currentAccountId,
            subscriber = currentUser;

        switch (type) {
            case "subscribe":
                currentFunction = subscribe;
                break;
            case "unsubscribe":
                currentFunction = unsubscribe;
                break;

            default:
                break;
        }

        dispatch(currentFunction({ subscriberOf, subscriber }));
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
        <div className="profile">
            <div className="profile-data">
                <figure className="profile-data-id-picture">
                    <Avatar
                        className="profile-data-picture"
                        {...stringAvatar()}
                    />
                    <figcaption className="profile-data-id">
                        @{currentAccountId}
                    </figcaption>
                </figure>
                <div className="profile-data-info">
                    <div className="profile-data-info-first-line">
                        <p className="username">{currentAccountData.nickname}</p>
                        <div className="account-actions">
                            <Button className="edit-profile-button">
                                Edit profile (in development)
                            </Button>
                            {
                                currentAccountId === store.getState().currentAccount.value ?
                                    (newPostButton) : (subscribeButton)
                            }
                        </div>
                    </div>
                    <div className="account-stats">
                        <p className="account-stats-item">
                            Subscriber of: {currentAccountData.subscriberOf.length}
                        </p>
                        <p className="account-stats-item">
                            Subscribers: {currentAccountData.subscribers.length}
                        </p>
                        <p className="account-stats-item">
                            Posts: {currentPostsData.length}
                        </p>
                    </div>
                    <p className="user-bio">
                        {currentAccountData.bio ? currentAccountData.bio : "No bio yet("}
                    </p>
                </div>
            </div>
            <hr className="barier-line" />
            <div className="posts-container">
                {
                    store.getState().posts[currentAccountId].map(element => {
                        return <ProfilePostElement key={currentAccountId + "_" + element.postId} post={element} />
                    })
                }
                {
                    store.getState().posts[currentAccountId].length ?
                        '' : (
                            <p className="no-posts">
                                Here is no any posts yet =(
                            </p>
                        )
                }
            </div>
        </div >
    )
}

export default ProfileContent;