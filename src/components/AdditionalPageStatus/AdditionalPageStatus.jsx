/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import "./additional-page-status.sass";
import { useSelector } from 'react-redux';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import store from '../../store/store';

function AdditionalPageStatus() {

    const currentStatus = useSelector((state) => state.state.global),
        [displayStatus, setDisplayStatus] = useState({ status: "loading" }),
        element = useRef('');

    useEffect(() => {
        switch (store.getState().state.global.status) {
            case "loading":
                setDisplayStatus({ status: "loading" });
                element.current = <LocalLoading />;
                break;

            case "error":
                setDisplayStatus({ status: "error", message: store.getState().state.global.message });
                element.current = <LocalError message={store.getState().state.global.message} />;
                break;

            default:
                setDisplayStatus("");
                break;
        };
    }, [currentStatus]);

    return (
        <div className={`minimized-status local-loading ${displayStatus ? "active" : ''}`}>
            {element.current}
        </div>
    );
}

function LocalLoading() {
    return (
        <div className="loading-item"></div>
    )
}

function LocalError(props) {
    return (
        <>
            <CloudOffIcon className="additional-error-icon" sx={{ color: "red", fontSize: "40px" }} />
            {props.message}
        </>
    )
}

export default AdditionalPageStatus;