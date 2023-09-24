import React from 'react';
import "./search-result-item.sass";
import { Link } from 'react-router-dom';
import { Avatar } from '@mui/material';
import store from '../../store/store';

function SearchResultItem({ userId }) {
    const currentAccountData = store.getState().accounts[userId],
        currentPostsData = store.getState().posts[userId];

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
        <div className="search-result-item-container">
            <Link to={"/user/" + userId} className="account-card">
                <Avatar {...stringAvatar()} />
                <div className="usernames-set">
                    <span className="nickname">{currentAccountData.nickname}</span>
                    <span className="user-id">@{userId}</span>
                </div>
            </Link>
            <div className="user-data">
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
        </div>
    )
}

export default SearchResultItem;