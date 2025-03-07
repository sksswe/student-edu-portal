import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './SignUp.css';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = () => {
    if (email && password && confirmPassword) {
      if (password === confirmPassword) {
        // Simulate a successful sign-up
        setError('');
        localStorage.setItem('isAuthenticated', 'true'); // Set authentication status
        localStorage.setItem('role', role); // Save the user's role
        navigate(role === 'admin' ? '/admin-dashboard' : '/user-dashboard'); // Redirect based on role
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
        <div className="signup-content">
          <h1>Sign Up</h1>
          <p>Choose your role and create an account.</p>
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
          src="https://media.istockphoto.com/id/1365149156/photo/woman-designer-working-from-home-having-meeting-online-student-girl-studying-in-her-room.jpg?s=1024x1024&w=is&k=20&c=W63JPFfTPT4pfbw5hc9OQDTmsnyW3vIcSLdwjFjQSaU="
          alt="Signup Visual"
          className="signup-image"
        />
      </div>
    </div>
  );
}

export default SignUp;