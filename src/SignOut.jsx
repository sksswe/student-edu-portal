import React from 'react';

function SignOut() {
  const handleSignOut = () => {
    // Clear user session or token
    alert('Signed out successfully');
  };

  return (
    <button className="container" onClick={handleSignOut}>Sign Out</button>
  );
}

export default SignOut;
