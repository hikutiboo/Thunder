import React, { PureComponent } from 'react';
import "./add-account-to-list.sass";
import { Card, Stack } from '@mui/material';
import { Link } from 'react-router-dom';

export default class AddAccountToList extends PureComponent {
    render() {
        return (
            <Link to="/login">
                <Card className="add-account-to-list-card">
                    <Stack className="add-account-to-list-card-content">
                        <i className="fa-solid fa-plus plus-symbol"></i>
                        <p className="add-account-to-list-card-text">
                            Not found your account? <br />
                            Add it here!
                        </p>
                    </Stack >
                </Card >
            </Link>
        )
    }
}