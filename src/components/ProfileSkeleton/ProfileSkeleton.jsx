import React from "react";
import ContentLoader from "react-content-loader";

const ProfileSkeleton = (props) => (
    <ContentLoader
        speed={1.6}
        width={1200}
        height={500}
        viewBox="0 0 1200 500"
        backgroundColor="#ededed2a"
        foregroundColor="#c2c2c25d"
        {...props}
    >
        <circle cx="120" cy="80" r="80" />
        <rect x="240" y="10" rx="0" ry="0" width="540" height="40" />
        <rect x="240" y="70" rx="0" ry="0" width="135" height="18" />
        <rect x="395" y="70" rx="0" ry="0" width="135" height="18" />
        <rect x="550" y="70" rx="0" ry="0" width="135" height="18" />
        <rect x="240" y="110" rx="0" ry="0" width="220" height="12" />
        <rect x="240" y="130" rx="0" ry="0" width="190" height="12" />
        <rect x="240" y="150" rx="0" ry="0" width="225" height="12" />
        <rect x="240" y="170" rx="0" ry="0" width="255" height="10" />
        <rect x="240" y="190" rx="0" ry="0" width="210" height="10" />
        <rect x="5" y="245" rx="0" ry="0" width="1190" height="5" />
        <rect x="10" y="265" rx="0" ry="0" width="226" height="226" />
        <rect x="246" y="265" rx="0" ry="0" width="226" height="226" />
        <rect x="482" y="265" rx="0" ry="0" width="226" height="226" />
        <rect x="718" y="265" rx="0" ry="0" width="226" height="226" />
        <rect x="954" y="265" rx="0" ry="0" width="226" height="226" />
        <rect x="55" y="180" rx="0" ry="0" width="130" height="15" />
    </ContentLoader>
)

export default ProfileSkeleton;