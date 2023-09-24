import React, { Component } from 'react'
import "./current-account.sass";
import { Avatar, Button, Card, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { LogoutDialog } from '../components';
import { logOut } from '../../slices/accounts/accounts';
import { clearCurrentAccount } from '../../slices/currentAccount/currentAccount';
import { connect } from 'react-redux';

class CurrentAccount extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuClosed: true,
            dialogClosed: true
        }
    }

    stringToColor(string) {
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

    stringAvatar(userId) {

        let name = this.props.accounts[userId].nickname,
        userData = this.props.accounts[userId];

        if (!name) {
            return '';
        }

        return {
            sx: {
                bgcolor: this.stringToColor(name),
            },
            children: name.split(" ").map(item => {
                return item[0];
            }),
            src: userData.profile_picture
        };
    }

    menuToggler = () => {
        let newState = this.state;

        newState.menuClosed = !newState.menuClosed;

        this.setState(newState);
    }

    dialogToggler = () => {
        let newState = this.state;

        newState.dialogClosed = !newState.dialogClosed;
        this.setState(newState);
    }

    logoutHandler = (fullLogout = false) => {
        let currentAccount = this.props.currentAccount.value;

        if (fullLogout) this.props.logOut({ userId: currentAccount });
        this.dialogToggler();
    }

    render() {
        let currentAccount = this.props.currentAccount.value;

        currentAccount = { userId: currentAccount, userData: this.props.accounts[currentAccount] }

        if (!currentAccount.userData) {
            return <></>;
        }

        return (
            <Stack className="account-container">
                <Link to={"user/" + currentAccount.userId}>
                    <Stack direction="column" className="account-names">
                        <span className="nickname">{currentAccount.userData.nickname}</span>
                        <span className="user-id">@{currentAccount.userId}</span>
                    </Stack>
                </Link>
                <Avatar onClick={this.menuToggler} {...this.stringAvatar(currentAccount.userId)} />
                <Card className={`account-menu ${this.state.menuClosed ? "closed" : ''}`}>
                    <Link
                        onClick={this.menuToggler}
                        className="account-menu-item profile-item"
                        to={"user/" + currentAccount.userId}
                    >
                        My profile
                    </Link>

                    <Button
                        onClick={() => {
                            this.dialogToggler();
                            this.menuToggler();
                        }}
                        className="account-menu-item log-out-item"
                    >
                        Switch account
                    </Button>
                    <LogoutDialog
                        open={!this.state.dialogClosed}
                        closer={this.dialogToggler}
                        logOut={this.logoutHandler}
                    />
                </Card>
            </Stack>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        currentAccount: state.currentAccount,
        state: state.state.global
    };
};

export default connect(mapStateToProps, { logOut, clearCurrentAccount })(CurrentAccount);
