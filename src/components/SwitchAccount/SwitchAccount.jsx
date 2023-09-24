import React, { Component } from 'react';
import "./switch-account.sass";
import { clearCurrentAccount } from '../../slices/currentAccount/currentAccount';
import AccountCard from '../AccountCard/AccountCard';
import { connect } from 'react-redux';
import { AddAccountToList } from '../components';
import { setAppState } from '../../slices/appState/appState';

class SwitchAccount extends Component {

    componentDidMount() {
        this.props.clearCurrentAccount();
        this.props.setAppState({ section: "header", data: { status: "success" } });
    }

    render() {
        return (
            <div className="accounts-container">
                <AddAccountToList />
                {
                    Object.keys(this.props.accounts).map(item => {
                        return <AccountCard key={item} userId={item} />
                    })
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts
    };
};

export default connect(mapStateToProps, { clearCurrentAccount, setAppState })(SwitchAccount);
