import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignIn.css';

function SignIn() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async () => {
    if (!id || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('https://your-backend-api.com/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id,
          email,
          password,
          role
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Sign in failed');
      }

      // Save authentication data
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('role', data.role || role);
      localStorage.setItem('id', data.id || id);
      localStorage.setItem('token', data.token); // Save the authentication token

      // Redirect based on role
      navigate(data.role === 'admin' ? '/admin-dashboard' : '/user-dashboard');
    } catch (error) {
      console.error('Sign in error:', error);
      setError(error.message || 'Sign in failed. Please try again.');
    } finally {
      setIsLoading(false);
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
            placeholder="User Name"
            value={id}
            onChange={(e) => setId(e.target.value)}
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




