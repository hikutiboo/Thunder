import React, { Component } from 'react';
import "./switch-register.sass";
import { Button, Stack } from '@mui/material';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class SwitchRegister extends Component {
    render() {
        return (
            <Stack className="switch-register-buttons">
                <Link to="/switch-account">
                    <Button className="choose-item switch-button">Switch</Button>
                </Link>
                <Link to="/register">
                    <Button className="choose-item register-button">Register</Button>
                </Link>
            </Stack>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
};

export default connect(mapStateToProps, {})(SwitchRegister)