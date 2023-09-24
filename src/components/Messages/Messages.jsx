import React, { useEffect } from 'react';
import "./messages.sass";
import store from '../../store/store';
import { useDispatch } from 'react-redux';
import { setAppState } from '../../slices/appState/appState';
import { MessageItem } from '../components';
import { readMeassges } from '../../slices/messages/messages';

function Messages() {
    const currentUser = store.getState().currentAccount.value,
        currentUserMessages = store.getState().messages[currentUser],
        dispatch = useDispatch();

    

    useEffect(() => {
        const globalStateStatus = currentUser ? "success" : "error";

        dispatch(setAppState({ section: "global", data: { status: globalStateStatus } }));
        dispatch(readMeassges({ userId: currentUser }))
    }, [])

    return (
        <>
            {
                currentUser ? (
                    <div className="messsages-container">
                        <div className="messsages-header-set">
                            <h1 className="messsages-header">
                                Your messages
                            </h1>
                        </div>
                        <div className="messages">
                            {
                                currentUserMessages.map((item, i) => {
                                    return <MessageItem key={item.userId + "_" + i} userId={item.author} message={item.message} />;
                                })
                            }
                        </div>
                    </div>
                ) : (
                    <p className="not-logged-user">
                        You can't visit messages page, since you are not logged into account!
                    </p>
                )
            }
        </>
    )
}

export default Messages;