import React, { useState, useEffect } from 'react';
import { signIn } from '../utils/auth';

const SignInForm = ({ userSetter }) => {
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = signIn({ username, password });
    if (typeof result === 'string') {
      setError(result);
    } else {
      userSetter(result);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>{error}</div>
      <div>{email}</div>
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

export default SignInForm;
