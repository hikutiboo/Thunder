import React, { useEffect, useState } from 'react';
import "./account-view-post.sass";
import { Link, useParams } from 'react-router-dom';
import { FullSizePost } from '../components';

function AccountViewPost() {
    let params = useParams(),
        [styleStatus, setStyleStatus] = useState(false);

    useEffect(() => {
        setStyleStatus(true);

        return () => setStyleStatus(false);
    }, [])

    return (
        <div className={"account-view-post screen-blocker " + (styleStatus ? "visible" : '')}>
            <Link to="../" className="exit-post ">
                <i className="fa-solid fa-xmark"></i>
            </Link>
            <FullSizePost {...params} />
        </div>
    )
}

export default AccountViewPost;