import React from 'react';
import "./message-item.sass";
import { Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import store from '../../store/store';

function MessageItem({ userId, message }) {
    let currentAccountData = store.getState().accounts[userId];

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
        <div className="message-item">
            <Link to={"/user/" + userId} className="account-card">
                <Avatar {...stringAvatar()} />
                <div className="usernames-set">
                    <span className="nickname">{currentAccountData.nickname}</span>
                </div>
            </Link>
            <p className="message-text">
                {" — " + message}
            </p>
        </div>
    )
}

export default MessageItem;