import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    if (username && email && password && confirmPassword) {
      if (password === confirmPassword) {
        // Add your sign-up logic here
        setError('');
        alert('Sign up successful');
      } else {
        setError('Passwords do not match');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <img
          src="https://wallpapers.com/images/high/young-girl-learning-how-to-draw-dzqormhxkpuojcj0.webp"
          alt="Signup Visual"
          className="signup-image"
        />
      </div>
      <div className="signup-right">
        <div className="signup-content">
          <h1>Sign Up</h1>
          <p>Choose your username, email, and password</p>
          {error && <div className="alert alert-danger">{error}</div>}
          <input
            type="text"
            className="form-control my-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            className="form-control my-2"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control my-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="form-control my-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="btn btn-primary w-100" onClick={handleSignUp}>
            Sign Up
          </button>
          <div className="signup-footer">
            <p>You are not logged in. <Link to="/signin">Log in</Link></p>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;