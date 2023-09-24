import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, } from '@mui/material';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { clearCurrentAccount } from '../../slices/currentAccount/currentAccount';
import { setAppState } from '../../slices/appState/appState';
import { connect } from 'react-redux';

class LogoutDialog extends Component {
    fullLogOut = false

    render() {
        return (
            <Dialog
                open={this.props.open}
                className="switch-account"
            >
                <DialogTitle>
                    This way is going to log you out of account
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        If you want to keep in you profile, press "DISAGREE" or "AGREE" to continue.
                        <FormControlLabel
                            control={<Checkbox onClick={() => this.fullLogOut = !this.fullLogOut} />}
                            label="Full log out (you need to enter password next time you want to log in)" />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.closer}>Disagree</Button>
                    <Button onClick={() => {
                        this.props.logOut(this.fullLogOut);
                        this.props.setAppState({ section: "header", data: { status: "loading" } });
                    }}>
                        <Link to="switch-account">Agree</Link>
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        accounts: state.accounts
    };
};

export default connect(mapStateToProps, { clearCurrentAccount, setAppState })(LogoutDialog);
