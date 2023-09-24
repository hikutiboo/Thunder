import { combineReducers, configureStore } from '@reduxjs/toolkit';
import accounts from '../slices/accounts/accounts';
import messages from "../slices/messages/messages";
import posts from "../slices/posts/posts";
import state from '../slices/appState/appState';
import currentAccount from "../slices/currentAccount/currentAccount";
import homePagePosts from '../slices/homePagePosts/homePagePosts';

const rootReducer = combineReducers({
    accounts: accounts,
    messages: messages,
    posts: posts,
    state: state,
    currentAccount: currentAccount,
    homePagePosts: homePagePosts
});

const store = configureStore({
    reducer: rootReducer
});

export default store;