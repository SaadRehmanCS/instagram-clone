import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import * as ROUTES from '../constants/routes';

function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const isInvalid = password.length < 1 || emailAddress.length < 1;

  useEffect(() => document.title = "Instagram - Login");
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.DASHBOARD);
    } catch (error) {
      setPassword('');
      setEmailAddress('');
      setError(error.message);
    }
  };

  return (
    <div className="container flex mx-auto max-w-screen-md items-center h-screen">
      <div className="flex w-3/5 h-full">
        <img src="https://instagramothers.s3.eu-west-2.amazonaws.com/iphone-with-profile.jpg" alt="iPhone login screen" />
      </div>
      <div className="flex flex-col w-2/5 ">
        <div className="border border-gray-primary bg-white">
          <h1 className="flex justify-center w-full">
            <img src="https://instagramothers.s3.eu-west-2.amazonaws.com/logo.png"
              alt="Instagram logo"
              className="mt-5 w-6/12 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-center text-sm text-red-primary">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              aria-label="Email address"
              placeholder="Email address"
              className="bg-gray-background text-sm mb-1 ml-7 mr-3 w-60 px-4 py-5 h-2 rounded-sm border-gray-primary"
              onChange={({ target }) => {
                setEmailAddress(target.value)
              }}
            />
            <input
              type="password"
              aria-label="Password"
              placeholder="Password"
              className="bg-gray-background text-sm mb-1 ml-7 mr-3 w-60 px-4 py-5 h-2 rounded-sm"
              onChange={({ target }) => {
                setPassword(target.value)
              }}
            />
            <button type="submit"
              disabled={isInvalid}
              className={`bg-blue-medium font-bold text-white text-sm mt-6 mb-3 ml-7 mr-3 w-60 px-4 py-1  rounded-md ${isInvalid && 'opacity-50'}`}>Log In</button>
          </form>
        </div>
        <div className="border border-gray-primary mt-8 bg-white">
          <p className="py-5 px-10 text-sm">Don't have an account? <b className="text-blue-button"><a href={ROUTES.SIGN_UP}> Sign up</a></b></p>
        </div>
      </div>
    </div>
  );
}

export default Login;
