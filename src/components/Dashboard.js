import React from 'react';
import { useAuth } from '../auth/contexts/AuthContext';
import UserInfo from './UserInfo';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-nav">
          <h1>User Management Dashboard</h1>
          <div className="user-menu">
            <span className="welcome-text">Welcome, {user?.username}</span>
            <button onClick={handleLogout} className="logout-button">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="dashboard-section">
          <h2>User Information</h2>
          <div className="user-details">
            <div className="user-card">
              <h3>Current User</h3>
              <p><strong>Username:</strong> {user?.username}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>User ID:</strong> {user?.id}</p>
            </div>
          </div>
        </div>

        <div className="dashboard-section">
          <h2>Parse Data</h2>
          <UserInfo />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
