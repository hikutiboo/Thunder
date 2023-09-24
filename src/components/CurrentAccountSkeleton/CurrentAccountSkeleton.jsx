import React from "react";
import ContentLoader from "react-content-loader";

const CurrentAccountSkeleton = (props) => (
    <ContentLoader
        speed={1.6}
        width={200}
        height={60}
        viewBox="0 0 200 60"
        backgroundColor="#ededed2a"
        foregroundColor="#c2c2c25d"
        {...props}
    >
        <rect x="0" y="5" rx="0" ry="0" width="125" height="27" />
        <circle cx="170" cy="30" r="30" />
        <rect x="0" y="42" rx="0" ry="0" width="110" height="13" />
    </ContentLoader>
)

export default CurrentAccountSkeleton;