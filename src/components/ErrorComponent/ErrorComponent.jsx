import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class ErrorComponent extends Component {
    render() {
        return (
            <div>
                <h1>Error</h1>
                <h2>Something went wrong</h2>
                <Link to="home">Go back home</Link>
            </div>
        )
    }
}
