import React, { Component } from 'react';
import "./view.sass";
import { Outlet } from 'react-router-dom';
import { AdditionalPageStatus, Header, Sidebar } from '../components';
import { Box } from '@mui/material';

export default class View extends Component {
    render() {
        return (
            <Box className='view-container'>
                <Header />
                <Sidebar />
                <div className="content-container">
                    <Outlet />
                </div>
                <AdditionalPageStatus />
            </Box>
        )
    }
}