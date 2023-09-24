/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import "./profile.sass";
import { ProfileContent, ProfileError, ProfileSkeleton } from '../components';
import { useDispatch } from 'react-redux';
import { setAppState } from '../../slices/appState/appState';
import store from '../../store/store';
import { useParams } from 'react-router-dom';

function Profile() {
    const dispatch = useDispatch(),
        [profileStatus, setProfileStatus] = useState("loading"),
        profileData = useParams();

    let loadingComponent = <ProfileSkeleton />,
        errorComponent = <ProfileError />,
        successsComponent = <ProfileContent />,
        currentAccountId = useParams().userId,
        [component, setComponent] = useState('');

    useEffect(() => {
        setProfileStatus("loading");
    }, [profileData])

    useEffect(() => {
        dispatch(setAppState({ section: "header", data: { status: "success" } }));
        dispatch(setAppState({ section: "global", data: { status: "success" } }));
    }, [])

    useEffect(() => {
        setProfileStatus(store.getState().accounts[currentAccountId] ? "success" : "error");
    })

    useEffect(() => {
        switch (profileStatus) {
            case "loading":
                setComponent(loadingComponent);
                break;

            case "error":
                setComponent(errorComponent);
                break;

            default:
                setComponent(successsComponent);
                break
        }
    }, [profileStatus])

    return (
        <div className="profile-container">
            {component}
        </div>
    )
}

export default Profile;