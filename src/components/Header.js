import React from 'react';
import { useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import * as ROUTES from '../constants/routes';
import FirebaseContext from '../context/firebase';
import UserContext from '../context/user';

function signedOut() {
    const history = useHistory();
    return (
        <React.Fragment>
            <div className="py-3 object-right ml-60 text-white">
                <button
                    className="font-bold text-sm bg-blue-button px-2 py-1 rounded"
                    onClick={() => history.push(ROUTES.LOGIN)}
                >Log In</button>
            </div>
            <div className="py-3 object-right ml-4 text-blue-button">
                <button
                    className="text-sm font-medium bg-white px-2 py-1 rounded-md"
                    onClick={() => history.push(ROUTES.SIGN_UP)}
                >Sign Up</button>
            </div>
        </React.Fragment>
    );
}

function signedIn() {
    const { user } = useContext(UserContext);
    const { firebase } = useContext(FirebaseContext);
    
    return (
        <React.Fragment>
            <div className="py-4 ml-72">
                <Link to={ROUTES.DASHBOARD}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </Link>
            </div>
            
            <div>
                <Link to={`/p/${user.displayName}`}>
                <img className="flex h-10 w-10 mt-2 ml-4 rounded-full" src={`https://instagramavatars.s3.eu-west-2.amazonaws.com/avatars/${user.displayName}.jpg`} alt="Display avatar"/>
                </Link>
            </div>
            <div className="py-4 ml-8">
            <Link to={ROUTES.LOGIN}>
                <svg onClick={() => firebase.auth().signOut() } xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                </Link>
            </div>
        </React.Fragment>
    );
}

function Header(props) {
    const { user } = useContext(UserContext);
    return (
        <div className="flex bg-white border-b border-gray-primary">
            <div>
                <Link to={ROUTES.DASHBOARD}>
                    <img src="https://instagramothers.s3.eu-west-2.amazonaws.com/logo.png"
                        alt="Instagram logo"
                        className="w-3/12 py-3 ml-56"
                    />
                </Link>
            </div>
            <div className="py-3 object-right ml-96">
                <button className=""></button>
            </div>
            {(user !== null) ? signedIn() : signedOut()}
        </div>
    );
}

export default Header;