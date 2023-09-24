import React, { Component } from 'react';
import "./login.sass";
import { connect } from 'react-redux';
import { LogInForm } from '../components';
import { Link } from 'react-router-dom';

class Login extends Component {
    render() {
        return (
            <div className="login-container">
                <div className="login-content">
                    <div className="login-header">
                        <h1 className="login-main-header">
                            Welcome to <span className="thunder-item">Thunder</span>
                        </h1>
                        <h3 className="login-subheader">
                            You can log in to your account here!
                        </h3>
                    </div>
                    <LogInForm {...this.props} />
                    <p className="login-bottom-link">
                        If you still don't have an account <br />
                        You can <Link className="switch-link" to="/register" children="register" /> in Thunder right now!
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Login);