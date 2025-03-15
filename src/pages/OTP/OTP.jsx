import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OTP.css';

function OTP({ generatedOTP, onVerify }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = () => {
    if (otp === generatedOTP) {
      setError('');
      onVerify(); // Call the onVerify function passed from SignUp
      navigate('/signin'); // Redirect to Sign In page
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-popup">
        <h2>Enter OTP</h2>
        <p>A 4-digit OTP has been sent to your email.</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={4}
        />
        <button className="btn btn-primary w-100" onClick={handleVerify}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default OTP;