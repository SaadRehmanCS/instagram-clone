import { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import FirebaseContext from '../context/firebase';
import { LOGIN } from '../constants/routes';
import { doesUserNameExist } from '../services/firebase';

function Signup() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const isInvalid =
    password.length < 1 || emailAddress.length < 1 || username.length < 1 || fullName.length < 1;

  const handleSignup = async (event) => {
      event.preventDefault();

      const usernameExists = await doesUserNameExist(username);
      if (usernameExists) {
          try {
              const createdUserResult = await firebase
              .auth()
              .createUserWithEmailAndPassword(emailAddress, password);
              await createdUserResult.user.updateProfile( {
                  displayName: username
              });
              
            } catch (error) {
              
          }
      }
  };

  return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="https://instagramothers.s3.eu-west-2.amazonaws.com/iphone-with-profile.jpg" alt="iPhone login screen" />
            </div>
            <div className="flex flex-col w-2/5 ">
                <div className="border border-gray-primary bg-white">
                    <h1 className="flex justify-center w-full bol">
                        <img src="https://instagramothers.s3.eu-west-2.amazonaws.com/logo.png"
                            alt="Instagram logo"
                            className="mt-5 w-6/12 mb-4"
                        />
                    </h1>
                    <h1 className="px-5 mb-6 text-center text-gray-base font-bold">
                    Sign up to see photos and videos from your friends.
                    </h1>
                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}
                    <form onSubmit={handleSignup} method="POST">
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
                            type="text"
                            aria-label="Full Name"
                            placeholder="Full name"
                            className="bg-gray-background text-sm mb-1 ml-7 mr-3 w-60 px-4 py-5 h-2 rounded-sm border-gray-primary"
                            onChange={({ target }) => {
                                setFullName(target.value)
                            }}
                        />
                        <input
                            type="text"
                            aria-label="User name"
                            placeholder="User name"
                            className="bg-gray-background text-sm mb-1 ml-7 mr-3 w-60 px-4 py-5 h-2 rounded-sm border-gray-primary"
                            onChange={({ target }) => {
                                setUserName(target.value)
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
                            className={`bg-blue-medium font-bold text-white text-sm mt-6 mb-3 ml-7 mr-3 w-60 px-4 py-1  rounded-md ${isInvalid && 'opacity-50'}`}>Sign up</button>
                    </form>
                </div>
                <div className="border border-gray-primary mt-8 bg-white">
                    <p className="py-5 px-16 text-sm">Have an account? <b className="text-blue-light"><a href={LOGIN}> {`Log In`}</a></b></p>
                </div>
            </div>
        </div>
    );
}
export default Signup;
