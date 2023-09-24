import React, { Component } from 'react';
import "./register.sass";
import { connect } from 'react-redux';
import { RegisterForm } from '../components';
import { Link } from 'react-router-dom';

class Register extends Component {
    render() {
        return (
            <div className="register-container">
                <div className="register-content">
                    <div className="register-header">
                        <h1 className="register-main-header">
                            Glad to meet you in <span className="thunder-item">Thunder</span>
                        </h1>
                        <h3 className="register-subheader">
                            Lets create your account!
                        </h3>
                    </div>
                    <RegisterForm {...this.props} />
                    <p className="register-bottom-link">
                        Already have an account? <br />
                        <Link className="switch-link" to="/login" children="Log in" /> to continue your experience with Thunder!
                    </p>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Register);