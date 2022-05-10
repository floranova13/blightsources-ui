import React, { useState, useEffect } from 'react';

const LoginForm = ({ onSubmit, error, clearCache }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  useEffect(() => {
    return () => clearCache();
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>{error}</div>
      <div>{email}</div>
      <label>
        Username
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </label>
      <label>
        Password
        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password" required />
      </label>
      <button type="submit">Sign in</button>
    </form>
  )
}

export default LoginForm;