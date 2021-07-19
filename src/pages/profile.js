import { useParams, useHistory } from "react-router";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as ROUTES from '../constants/routes';
import Header from "../components/Header";
import UserProfile from '../components/profile/index';

export default function Profile() {
    const { username } = useParams();
    const [user, setUser] = useState(null);
    const [userExists, setUserExists] = useState(false);
    const history = useHistory();

    useEffect(() => {
        document.title = username;
        async function checkUserExists() {
            const user = await getUserByUsername(username);
            if (user.length > 0) {
                setUser(user[0]);
                setUserExists(true);
            } else {
                setUserExists(false);
                history.push(ROUTES.NOT_FOUND);
            }
        }

        checkUserExists();
    });
    
    return userExists ? (
        <div className="bg-gray-background">
            <Header />
            <div className="mx auto max-w-screen-lg">
                <UserProfile user={user} />
            </div>
        </div>
    ) : null;
}