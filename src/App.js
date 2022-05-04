import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'
import { Amplify } from 'aws-amplify';
import aws_exports from './aws-exports';
import { signOut, signUp, resendConfirmationCode} from './utils/auth';
import SignInForm from './components/SignInForm';
Amplify.configure(aws_exports);

function App() {
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if(user !== null) {
      setShowSignIn(false);
    }
  }, [user])

  return (
    <div className="App">
      {user && <button onClick={() => signOut()}>Sign Out</button>}
      {!user && <button onClick={() => setShowSignIn(true)}>Sign In</button>}
      {showSignIn && <SignInForm userSetter={setUser} />}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
