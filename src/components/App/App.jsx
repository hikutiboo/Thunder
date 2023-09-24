import React, { Component } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from '../../configs/router-config';
import "./app.sass";

export default class App extends Component {
    
    render() {
        return (
            <RouterProvider router={router} />
        )
    }
}
