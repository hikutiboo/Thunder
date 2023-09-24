/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import "./log-in-form.sass";
import { Button } from '@mui/material';
import store from '../../store/store';
import { logIn } from '../../slices/accounts/accounts';
import { useNavigate } from 'react-router-dom';
import { changeCurrentAccount, clearCurrentAccount } from '../../slices/currentAccount/currentAccount';
import { validator } from '../../services/validation-service';
import { loginValidation } from '../../configs/login-validation-config';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import { useDispatch, useSelector } from 'react-redux';
import { setAppState } from '../../slices/appState/appState';

export default function LogInForm(props) {

    const accounts = useSelector((state) => state.accounts),
        dispatch = useDispatch(),
        loginFormRef = useRef(null),
        navigate = useNavigate(),
        [errorsData, setErrorsData] = useState('');

    function loginValidator(e) {
        e.preventDefault();

        let errorsList = [],
            formData = Object.fromEntries(new FormData(loginFormRef.current)),
            validationSatus = validator(formData, loginValidation);

        setErrorsData('');

        if (validationSatus.result) {
            loginHandler();
            return;
        };

        for (const key in validationSatus.items) {
            errorsList.push(<ValidationErrorsList key={key} errorItem={key} errorsList={validationSatus.items[key]} />);
        };

        setErrorsData(
            <div className="errors-container" >
                {errorsList}
            </div>
        );
    }

    function loginHandler() {
        let formData = Object.fromEntries(new FormData(loginFormRef.current));
        formData.userId = formData.userId.toLowerCase();

        dispatch(logIn(formData));
        if (store.getState().accounts[formData.userId]?.logged) {
            dispatch(changeCurrentAccount(formData.userId));
            dispatch(setAppState({ section: "header", data: { status: "loading" } }));
            dispatch(setAppState({ section: "global", data: { status: "loading" } }));
            navigate("/home");
            return;
        }

        if (!accounts[formData.userId]) {
            dispatch(setAppState({ section: "global", data: { status: "error", message: "Account not found" } }));
            return;
        }

        dispatch(setAppState({ section: "global", data: { status: "error", message: "Wrong password" } }));
    }

    useEffect(() => {
        dispatch(clearCurrentAccount());
    }, [])

    useEffect(() => {
        dispatch(setAppState({ section: "header", data: { status: "success" } }));
    }, [])

    return (
        <form ref={loginFormRef} className="log-in-form" onSubmit={loginValidator}>
            <div className="log-in-form-segment">
                <label htmlFor="nickname_input" className="log-in-form-label">
                    Your user ID:
                </label>
                <input
                    name="userId"
                    id="nickname_input"
                    type="text"
                    className="log-in-form-input nickname-input"
                    placeholder="@my_username_here"
                    defaultValue={props.userId}
                />
            </div>

            <div className="log-in-form-segment">
                <label htmlFor="password_input" className="log-in-form-label">
                    Your password:
                </label>
                <input
                    name="password"
                    id="password_input"
                    type="password"
                    className="log-in-form-input password-input"
                    placeholder="A_123456"
                />
            </div>

            {errorsData}

            <Button className="log-in-form-submit" type="submit">Submit</Button>
        </form>
    )
}
