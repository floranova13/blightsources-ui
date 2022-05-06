import React, { useState, useEffect } from 'react';
import { signUp } from '../utils/auth';

const SignUpForm = ({ userSetter }) => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      const result = await signUp(username, password, email);
      if (typeof result === 'string') {
        setError(result);
      } else {
        userSetter(result);
      }
    }
  };

  const validateEmail = (s) => {
    if (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(s)) {
      return true;
    }
    setError('You have entered an invalid email address!');
    return false;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{error}</div>
      <label>
        Email
        <input
          placeholder='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Username
        <input
          placeholder='Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
          type='password'
          required
        />
      </label>
      <button type='submit'>Sign in</button>
    </form>
  );
};

export default SignUpForm;
