import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';
import OTP from '../OTP/OTP';

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          role: 'user', // Always set role to 'user'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        setOtpSent(true);
        setShowOTP(true);
      } else {
        setError(data.error || 'Sign-up failed');
      }
    } catch (error) {
      setError('Failed to connect to the server');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-left">
        <div className="signup-content">
          <h1>Sign Up</h1>
          <p>Choose your role and create an account.</p>
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

          {/* Removed the role selection part */}
          
          <button className="btn btn-primary w-100" onClick={handleSignUp} disabled={loading}>
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          <div className="signup-footer">
            <p>Already have an account? <Link to="/signin">Sign in</Link></p>
            <Link to="/">Home</Link>
          </div>
        </div>
      </div>

      <div className="signup-right">
        <img
          src="https://wallpapers.com/images/high/young-girl-learning-how-to-draw-dzqormhxkpuojcj0.webp"
          alt="Signup Visual"
          className="signup-image"
        />
      </div>

      {showOTP && <OTP email={email} onClose={() => setShowOTP(false)} navigate={navigate} />}
    </div>
  );
}

export default SignUp;
