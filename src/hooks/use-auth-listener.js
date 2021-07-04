import { useState, useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";

export default function useAuthListener() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
    const { firebase } = useContext(FirebaseContext);
    
    useEffect(() => {
        const listener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                // we have a user, so we can store it in local storage
                localStorage.setItem('authUser', JSON.stringify(authUser));
                setUser(authUser);
            } else {
                // we dont have an authUser, so clear local storage
                localStorage.removeItem('authUser');
                setUser(null);
            }
        });

        return () => listener();
    })

    return { user };
}