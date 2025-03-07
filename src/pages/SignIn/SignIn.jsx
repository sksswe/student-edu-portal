import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = () => {
    if (email && password) {
      // Simulate a successful login
      setError('');
      localStorage.setItem('isAuthenticated', 'true'); // Set authentication status
      localStorage.setItem('role', role); // Save the user's role
      navigate(role === 'admin' ? '/admin-dashboard' : '/user-dashboard'); // Redirect based on role
    } else {
      setError('Please fill in all fields');
    }
  };

  return (
    <div className="signin-container">
      <div className="signin-left">
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/724/18/desktop-wallpaper-7-studying-study-boy.jpg"
          alt="Signin Visual"
          className="signin-image"
        />
      </div>
      <div className="signin-right">
        <div className="signin-content">
          <h1>Sign In</h1>
          <p>Welcome back! Please sign in to continue.</p>
          {error && <div className="alert alert-danger">{error}</div>}
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
          <div className="role-selection">
            <label>
              <input
                type="radio"
                name="role"
                value="user"
                checked={role === 'user'}
                onChange={() => setRole('user')}
              />
              User
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="admin"
                checked={role === 'admin'}
                onChange={() => setRole('admin')}
              />
              Admin
            </label>
          </div>
          <button className="btn btn-primary w-100" onClick={handleSignIn}>
            Sign In
          </button>
          <div className="signin-footer">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;