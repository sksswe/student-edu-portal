import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import OTP from '../OTP/OTP'; // Import the OTP component
import './SignUp.css';

function SignUp() {
  const [id, setId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [showOTP, setShowOTP] = useState(false); // State to control OTP popup visibility
  const [generatedOTP, setGeneratedOTP] = useState(''); // State to store the generated OTP
  const navigate = useNavigate();

  const generateOTP = () => {
    const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP
    setGeneratedOTP(otp.toString());
    return otp.toString();
  };

  const handleSignUp = () => {
    if (id && email && password && confirmPassword) {
      if (password === confirmPassword) {
        setError('');
        const otp = generateOTP(); // Generate OTP
        alert(`OTP sent to ${email}: ${otp}`); // Simulate sending OTP (for demo purposes)
        setShowOTP(true); // Show the OTP popup
      } else {
        setError('Passwords do not match');
      }
    } else {
      setError('Please fill in all fields');
    }
  };

  const handleOTPVerify = () => {
    // Save user data to localStorage (simulate successful sign-up)
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('role', role);
    localStorage.setItem('id', id);
    setShowOTP(false); // Hide the OTP popup
    navigate('/signin'); // Redirect to Sign In page
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
            placeholder="ID"
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
          <input
            type="password"
            className="form-control my-2"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
          <button className="btn btn-primary w-100" onClick={handleSignUp}>
            Sign Up
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

      {/* OTP Popup */}
      {showOTP && (
        <OTP
          generatedOTP={generatedOTP}
          onVerify={handleOTPVerify}
        />
      )}
    </div>
  );
}

export default SignUp;