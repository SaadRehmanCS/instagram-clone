import React from "react";
import useUser from "../../hooks/use-user";
import User from './User';
import Suggestions from "./Suggestions";

export default function Sidebar() {
    const {
        user: { fullName, username, userId }
    } = useUser();
    const [test, setTest] = React.useState(0);
    return (
        <div className="p-4">
            <button onClick={() => setTest(Math.random())}>Click me here</button>
            <User username={username} fullName={fullName} />
            <p>Sidebar</p>
            <Suggestions userId={userId}/>
        </div>
    );
}