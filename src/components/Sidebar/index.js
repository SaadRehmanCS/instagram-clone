import React, { memo } from "react";
import useUser from "../../hooks/use-user";
import User from './User';
import Suggestions from "./Suggestions";

const Sidebar = () => {
    const {
        user: { docId, fullName, username, userId, following }
    } = useUser();
    return (
        <div className="p-4">
            <User username={username} fullName={fullName} />
            <Suggestions userId={userId} following={following} loggedInUserDocId={docId} />
        </div>
    );
}

export default memo(Sidebar);

// Sidebar.whyDidYouRender = true;
