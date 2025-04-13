
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';
import OTP from '../OTP/OTP';

function SignUp() {
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
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
          name,
          email,
          password,
          role: 'user', 
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setError('');  // Clear any previous error messages
        setOtpSent(true);
        setShowOTP(true);
      } else {
        // Get error message from API response directly
        if (data.username) {
          setError(data.username[0]); // Display username error
        } else if (data.email) {
          setError(data.email[0]); // Display email error
        } else {
          setError('Sign-up failed');
        }
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
          <p>Fill-up your information to create an account.</p>
          {error && <div className="alert alert-danger">{error}</div>}
          
          <input
            type="text"
            className="form-control my-2"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            className="form-control my-2"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
          src="/young-girl-learning-how-to-draw-dzqormhxkpuojcj0.webp"
          alt="Signup Visual"
          className="signup-image"
        />
      </div>

      {showOTP && <OTP email={email} onClose={() => setShowOTP(false)} navigate={navigate} />}
    </div>
  );
}

export default SignUp;
