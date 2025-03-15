import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './OTP.css';

function OTP({ email }) {  // Get email from props
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/create-user/', {
        email: email,
        otp_code: otp,
      });

      if (response.status === 200) {
        navigate('/signin'); // Redirect to sign-in page after successful verification
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Error verifying OTP. Please try again.');
    }
  };

  return (
    <div className="otp-overlay">
      <div className="otp-popup">
        <h2>Enter OTP</h2>
        <p>A 6-digit OTP has been sent to your email.</p>
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          type="text"
          className="form-control my-2"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength={6}  // Assuming 6-digit OTP
        />
        <button className="btn btn-primary w-100" onClick={handleVerify}>
          Verify OTP
        </button>
      </div>
    </div>
  );
}

export default OTP;
