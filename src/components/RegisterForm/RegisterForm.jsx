/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import "./register-form.sass";
import { Button } from '@mui/material';
import { addAccount } from "../../slices/accounts/accounts";
import { clearCurrentAccount } from '../../slices/currentAccount/currentAccount';
import { useNavigate } from 'react-router-dom';
import { validator } from '../../services/validation-service';
import { registerValidation } from '../../configs/register-validation-config';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import { useDispatch } from 'react-redux';
import { addPostsThread } from '../../slices/posts/posts';
import store from '../../store/store';
import { setAppState } from '../../slices/appState/appState';

export default function RegisterForm(props) {
    const [value, setValue] = useState(null),
        navigate = useNavigate(),
        fileInputRef = useRef(null),
        registerFormRef = useRef(null),
        userIdInputRef = useRef(null),
        dispatch = useDispatch()

    // ELEMENTS START

    const imageItem = value ?
        (
            <div className="result-photo-container">
                <img src={value} alt="resultPhoto" className="result-photo" />
            </div>
        ) : '',
        [errorsData, setErrorsData] = useState('');

    // ELEMENTS END

    let handleChange = () => {
        const imageFiles = fileInputRef.current?.files;

        if (imageFiles && imageFiles[0]) {
            setValue(URL.createObjectURL(imageFiles[0]))
        }
    }

    function registerValidator(e) {
        e.preventDefault();

        let errorsList = [],
            formData = Object.fromEntries(new FormData(registerFormRef.current)),
            validationSatus = validator(formData, registerValidation);

        setErrorsData('');

        if (validationSatus.result) {
            registerHandler();
            return;
        };

        for (const key in validationSatus.items) {
            errorsList.push(<ValidationErrorsList key={key} errorItem={key} errorsList={validationSatus.items[key]} />);
        }

        setErrorsData(
            <div className="errors-container">
                {errorsList}
            </div>
        )
    }

    function registerHandler() {
        let formData = Object.fromEntries(new FormData(registerFormRef.current)),
            userId = userIdInputRef.current.value?.toLowerCase(),
            imageFiles = fileInputRef.current?.files;

        formData["profile_picture"] = URL.createObjectURL(imageFiles[0]);

        delete formData["userId"];

        if (userId in store.getState().accounts) {
            dispatch(setAppState({ section: "global", data: { status: "error", message: "Account with that ID is already exist!" } }));
            return;
        }

        dispatch(addAccount([userId.toLowerCase(), formData]));
        dispatch(addPostsThread({ userId: userId.toLowerCase() }));
        navigate("/switch-account");
    }

    useEffect(() => {
        dispatch(clearCurrentAccount());
        dispatch(setAppState({ section: "global", data: { status: "success" } }));
    }, []);

    return (
        <form ref={registerFormRef} onSubmit={registerValidator} className="register-form">
            <div className="register-form-segment">
                <label htmlFor="userId_input" className="register-form-label">
                    Create your user ID - the key of your account, use whole your imagination to create the best one:
                </label>
                <input
                    ref={userIdInputRef}
                    name="userId"
                    id="userId_input"
                    type="text"
                    className="register-form-input nickname-input"
                    placeholder="@my_username_here"
                    value={props.userId}
                />
            </div>

            <div className="register-form-segment">
                <label htmlFor="nickname_input" className="register-form-label">
                    Now create your nickname - the first thing other users would see when they meet you in Thunder:
                </label>
                <input
                    name="nickname"
                    id="nickname_input"
                    type="text"
                    className="register-form-input nickname-input"
                    placeholder="My Nickname"
                />
            </div>

            <div className="register-form-segment">
                <label htmlFor="password_input" className="register-form-label">
                    Don't forget about password! It guarantees the protection of your data:
                </label>
                <input
                    name="password"
                    id="password_input"
                    type="password"
                    className="register-form-input password-input"
                    placeholder="A_123456"
                />
            </div>

            <div className="register-form-segment">
                <label htmlFor="picture_input" className="register-form-label">
                    Finall step - your profile picture, the face of your account, try to make a good choise :
                </label>
                <Button component="label" variant="contained" className="register-form-file-input-container">
                    Choose picture
                    <input
                        type="file"
                        name="profile_picture"
                        id="picture_input"
                        className="register-form-input file-input"
                        ref={fileInputRef}
                        onChange={handleChange}
                    />

                    {imageItem}
                </Button>
            </div>

            {errorsData}

            <Button className="register-form-submit" type="submit">Submit</Button>
        </form>
    )
}