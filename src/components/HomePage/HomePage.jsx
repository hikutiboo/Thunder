/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import "./home-page.sass";
import { FullSizePost } from '../components';
import { useDispatch } from 'react-redux';
import { setAppState } from '../../slices/appState/appState';
import store from '../../store/store';
import { Link } from 'react-router-dom';

function HomePage() {
    const dispatch = useDispatch(),
        wholePostsList = store.getState().homePagePosts,
        currentAccount = store.getState().currentAccount.value;

    useEffect(() => {
        dispatch(setAppState({ section: "header", data: { status: "success" } }));
        dispatch(setAppState({ section: "global", data: { status: "success" } }));
    }, [])

    return (
        <div className="home-page-container">
            {
                wholePostsList.map(
                    item => <FullSizePost key={item.userId + "_" + item.postId} {...item} />
                )
            }
            {
                wholePostsList.length ? "" : (
                    <p className="no-posts">
                        <Link to={"/user/" + currentAccount + "/new-post"}>
                            <i className="fa-regular fa-image no-posts-icon"></i>
                        </Link>
                        It is pretty calm in here... <br />
                        You can be the first who make a post =)
                    </p>
                )
            }
        </div>
    )
}

export default HomePage;