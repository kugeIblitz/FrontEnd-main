// UserProfile.js
import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div>
      <h2>{user.name}</h2>
      <p>User ID: {user.id}</p>
      {/* Add more user profile information here */}
    </div>
  );
};

export default UserProfile;

