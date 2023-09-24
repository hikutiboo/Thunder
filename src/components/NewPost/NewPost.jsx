import React, { useEffect, useRef, useState } from 'react';
import "./new-post.sass";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { newPostValidation } from '../../configs/new-post-validation-config';
import { validator } from '../../services/validation-service';
import ValidationErrorsList from '../ValidationErrorsList/ValidationErrorsList';
import { useDispatch } from 'react-redux';
import { addPost } from '../../slices/posts/posts';
import store from '../../store/store';
import { addHomePagePost } from '../../slices/homePagePosts/homePagePosts';

function NewPost() {
    const [styleStatus, setStyleStatus] = useState(false),
        [imageValue, setImageValue] = useState(''),
        newPostFormRef = useRef(null),
        fileInputRef = useRef(null),
        [errorsData, setErrorsData] = useState(''),
        dispatch = useDispatch(),
        navigate = useNavigate(),
        currentAccount = store.getState().currentAccount.value;

    useEffect(() => {
        setStyleStatus(true);

        return () => setStyleStatus(false);
    }, [])

    function imagePreviewChanger() {
        let newImage = fileInputRef.current?.files;

        if (newImage) setImageValue(URL.createObjectURL(newImage[0]));
    }

    function newPostValidator(e) {
        e.preventDefault();

        let errorsList = [],
            formData = Object.fromEntries(new FormData(newPostFormRef.current)),
            validationSatus = validator(formData, newPostValidation);

        setErrorsData('');

        if (validationSatus.result) {
            newPostHandler();
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

    function newPostHandler() {
        let formData = Object.fromEntries(new FormData(newPostFormRef.current)),
            imageFiles = fileInputRef.current?.files[0];

        formData["profile_picture"] = URL.createObjectURL(imageFiles);
        dispatch(addPost(
            {
                userId: currentAccount,
                image: formData["profile_picture"],
                description: formData["description"]
            }
        ));

        dispatch(addHomePagePost({ userId: currentAccount, postId: store.getState().posts[currentAccount][0].postId }));
        navigate("/home");
    }

    return (
        <div className={"new-post-container screen-blocker " + (styleStatus ? "visible" : '')}>
            <Link to="../" className="exit-post ">
                <i className="fa-solid fa-xmark"></i>
            </Link>
            <form ref={newPostFormRef} onSubmit={newPostValidator} className="new-post-creation">
                <div className="form-items-container">
                    <h1 className="new-post-form-header">
                        Create your post:
                    </h1>
                    <div className="new-post-form-segment new-post-file-selection">
                        <label htmlFor="picture_input" className="new-post-form-label">
                            Choose image for your post:
                        </label>
                        <Button component="label" variant="contained" className="new-post-form-file-input-container">
                            Choose&nbsp;
                            <input
                                ref={fileInputRef}
                                onChange={imagePreviewChanger}
                                type="file"
                                name="profile_picture"
                                id="picture_input"
                                className="new-post-form-input file-input"
                            />
                        </Button>
                        {
                            imageValue ? (
                                <div className="images-preview">
                                    <figure className="small-post-preview post-preview">
                                        <div className="small-post-preview-image-container post-preview-image-container">
                                            <img
                                                src={imageValue}
                                                alt="small-post-preview"
                                                className="small-post-preview-image post-preview-image"
                                            />
                                        </div>
                                        <p className="small-post-preview-text">
                                            Small variant
                                        </p>
                                    </figure>
                                    <figure className="full-post-preview post-preview">
                                        <div className="full-post-preview-image-container post-preview-image-container">
                                            <img
                                                src={imageValue}
                                                alt="full-post-preview"
                                                className="full-post-preview-image post-preview-image"
                                            />
                                        </div>
                                        <p className="full-post-preview-text">
                                            Full variant
                                        </p>
                                    </figure>
                                </div>
                            ) : ''
                        }
                    </div>
                    <div className="new-post-form-segment new-post-description-creation">
                        <label htmlFor="description_input" className="new-post-form-label">
                            Describe your fantasies here (fit to 5000 symbols):
                        </label>
                        <textarea
                            name="description"
                            id="description_input"
                            className="new-post-form-input description-input"
                        />
                    </div>
                    {errorsData}
                    <Button type="submit" className="new-post-submit-button">Create new post</Button>
                </div>
            </form>
        </div>
    )
}

export default NewPost;