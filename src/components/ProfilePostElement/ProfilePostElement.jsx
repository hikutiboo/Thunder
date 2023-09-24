import React from 'react';
import "./profile-post-element.sass";
import CloudOffIcon from '@mui/icons-material/CloudOff';
import { Link } from 'react-router-dom';

function ProfilePostElement({ post }) {
    return (
        <figure className="post-container">
            {
                post?.image ?
                    (
                        <Link to={"post/" + post.postId}>
                            <img src={post.image} alt="post" className="post-image" />
                            <figcaption className="post-stats">
                                <span className="post-param post-likes">
                                    <i className="fa-solid fa-heart"></i>
                                    {post.likes.length}
                                </span>
                                <span className="post-param post-comments">
                                    <i className="fa-solid fa-comment"></i>
                                    {post.comments.length}
                                </span>
                            </figcaption>
                        </Link>
                    )
                    : <div className="post-not-found"><CloudOffIcon sx={{ fontSize: "70px" }} /></div>
            }
        </figure>
    )
}

export default ProfilePostElement;