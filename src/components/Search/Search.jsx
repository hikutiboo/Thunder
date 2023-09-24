/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import "./search.sass";
import { useDispatch } from 'react-redux';
import { setAppState } from '../../slices/appState/appState';
import store from '../../store/store';
import { SearchResultItem } from '../components';

function Search() {
    const searchFieldRef = useRef(null),
        searchTypeSelector = useRef(null),
        dispatch = useDispatch(),
        [searchResults, setSearchResults] = useState([]);

    let noResultsComponent = !searchFieldRef.current?.value ? (
        <p className="no-search-results">
            Start searching, found users would appear here
        </p>
    ) : !searchResults?.length ? (
        <p className="no-search-results">
            No users found
        </p>
    ) : ''


    function searchProvider() {
        let searchValue = searchFieldRef.current.value,
            accounts = Object.keys(store.getState().accounts),
            searchType = searchTypeSelector.current.value,
            matches = [];

        while (searchValue[0] == " ") {
            searchValue = searchValue.slice(1);
        }

        while (searchValue.at(-1) == " ") {
            searchValue = searchValue.slice(0, -1);
        }

        if (!searchValue) {
            setSearchResults([]);
            return;
        }

        if (searchType === "nickname") {
            let nicknames = accounts.map(item => [item, store.getState().accounts[item].nickname]);

            nicknames.forEach(element => {
                if (element[1].toLowerCase().includes(searchValue.toLowerCase())) {
                    matches.push(element[0]);
                }
            })

            setSearchResults(matches);
            return;
        }

        accounts.forEach(item => {
            if (item.includes(searchValue.toLowerCase())) {
                matches.push(item);
            };
        });

        setSearchResults(matches);
        return;
    }

    useEffect(() => {
        dispatch(setAppState({ section: "global", data: { status: "success" } }));
    }, []);

    return (
        <div className="search-container">
            <div className="search-row">
                <input
                    ref={searchFieldRef}
                    onChange={searchProvider}
                    type="text"
                    className="search-field"
                    placeholder="Search anyone you want here"
                />
                <div className="search-type-selector-container">
                    <label htmlFor="search_type_selector" className="search-type-selector-header">
                        Search by:
                    </label>
                    <select
                        id="search_type_selector"
                        ref={searchTypeSelector}
                        className="search-type-selector"
                        defaultValue="userId"
                    >
                        <option value="nickname" className="search-type">Nickname</option>
                        <option value="userId" className="search-type">User ID</option>
                    </select>
                </div>
            </div>
            <div className="results-list">
                {noResultsComponent}
                {
                    searchResults?.map(item => {
                        return <SearchResultItem key={"user_" + item} userId={item} />
                    })
                }
            </div>
        </div>
    )
}

export default Search;