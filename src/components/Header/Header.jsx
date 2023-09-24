/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import "./header.sass";
import { CurrentAccount, CurrentAccountSkeleton, SwitchRegister } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setAppState } from '../../slices/appState/appState';

export default function Header() {
    const state = useSelector((state) => state.state),
        dispatch = useDispatch(),
        currentAccount = useSelector((state) => state.currentAccount);

    let content = currentAccount.value ? <CurrentAccount /> : <SwitchRegister />

    content = state.header.status === "loading" ? <CurrentAccountSkeleton /> : content;

    useEffect(() => {
        dispatch(setAppState({ section: "header", data: { status: "success" } }));
    }, [])

    return (
        <div className="header-container">
            <div className="header">
                {content}
            </div>
        </div>
    )
}
