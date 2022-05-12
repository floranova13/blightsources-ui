import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { signOut } from './utils/auth';
import SignInForm from './components/login/SignInForm';
import SignUpForm from './components/login/SignUpForm';


function App() {
  const [user, setUser] = useState(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user !== null) {
      setShowSignIn(false);
    }
  }, [user]);

  return (
    <div className='App'>
      <header className='App-header'>
        {user && <button onClick={() => signOut()}>Sign Out</button>}
        {!user && !showSignIn && (
          <button onClick={() => setShowSignIn(true)}>Sign In</button>
        )}
        {!user && !showSignUp && (
          <button onClick={() => setShowSignUp(true)}>Sign Up</button>
        )}
        {showSignIn && <SignInForm userSetter={setUser} />}
        {showSignUp && <SignUpForm userSetter={setUser} />}
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

