import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://127.0.0.1:8000/api/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      // Save authentication data with Bearer token and refresh_token
      localStorage.setItem('token', data.access_token);  // Access token for authentication
      localStorage.setItem('refresh_token', data.refresh_token);  // Refresh token
      localStorage.setItem('username', username);
      localStorage.setItem('isAuthenticated', 'true');

      // Redirect user after login
      navigate('/user-dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignOut = async () => {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      alert('No refresh token found. Please log in again.');
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
      localStorage.removeItem('isAuthenticated');
      navigate('/signin');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      });

      if (response.ok) {
        // After refreshing the token, you can invalidate the session by logging out
        localStorage.removeItem('token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        localStorage.removeItem('isAuthenticated');
        navigate('/signin');
      } else {
        throw new Error('Failed to refresh token');
      }
    } catch (error) {
      console.error('Logout error:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('username');
      localStorage.removeItem('isAuthenticated');
      navigate('/signin');
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
            type="text"
            className="form-control my-2"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            className="form-control my-2"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button 
            className="btn btn-primary w-100" 
            onClick={handleSignIn}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
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
