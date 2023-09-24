import React from 'react';
import "./profile-error.sass";

function ProfileError() {
    return (
        <div className="profile-error-container">
            <i className="fa-solid fa-skull-crossbones profile-error-icon"></i>
            <p className="profile-error-text">
                This account does not exist, <br />
                it has been deleted or never existed!
            </p>
        </div>
    )
}

export default ProfileError;