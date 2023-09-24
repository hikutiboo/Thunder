import React, { Component } from 'react';
import "./account-card.sass";
import { Avatar, Button, Card, Stack } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { changeCurrentAccount } from '../../slices/currentAccount/currentAccount';
import { connect } from 'react-redux';
import { setAppState } from '../../slices/appState/appState';

function AccountCard(props) {
    let navigate = useNavigate();

    return <AccountCardInside {...props} navigate={navigate} />
}

class AccountCardInside extends Component {
    currentAccount = this.props.accounts[this.props.userId];
    navigate = this.props.navigate;

    autoLogin = () => {
        this.props.changeCurrentAccount(this.props.userId)
        this.navigate("/user/" + this.props.userId);
    }

    goToLogin = (userId) => {
        this.navigate("/login/" + userId);
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

    render() {

        return (
            <Card className="account-card">
                <Stack direction="row" gap="10px" justifyContent="space-evenly">
                    <Avatar {...this.stringAvatar(this.props.userId)} sx={{ alignSelf: "center" }} />
                    <Link to={"/user/" + this.props.userId}>
                        <Stack direction="column" className="account-names">
                            <span className="nickname">{this.currentAccount.nickname}</span>
                            <span className="user-id">@{this.props.userId}</span>
                            <span className="logged-state">
                                {this.currentAccount.logged ? "Logged" : "Not logged"}
                            </span>
                        </Stack>
                    </Link>
                    <Button
                        onClick={
                            this.currentAccount.logged ?
                                () => {
                                    this.props.setAppState({ section: "header", data: { status: "loading" } });
                                    this.autoLogin();
                                }
                                : () => {
                                    this.goToLogin(this.props.userId);
                                }
                        }
                        className="choose-button"
                    >
                        Choose
                    </Button>
                </Stack >
            </Card >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts,
        currentAccount: state.currentAccount
    };
};

export default connect(mapStateToProps, { changeCurrentAccount, setAppState })(AccountCard);