import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import logo from '../../assets/logo.png';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth(); 
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
  
    
      const response = await fetch('http://localhost:8080/signout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email, 
        }),
      });
  
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Logout failed');
      }
  
      const data = await response.json(); // Get the response message
      console.log('Logout successful:', data.message);
  
      await logout(); 
      alert(data.message);
    } catch (error) {
      console.error('Logout failed:', error.message);
      alert(`Logout failed: ${error.message}`);
    } finally {
      setLoading(false); 
    }
  };
  

  console.log('Current user:', user); // Log the current user

 
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="Wheel Wise Logo" className="logo-img" />
      </Link>
      <nav>
        <Link to="/" className="nav-link">Home</Link>
        {user ? (
          <>
            <span className="welcome-text">Welcome {user.firstName}</span>
            <button
              className="logout-btn"
              onClick={handleLogout}
              disabled={loading}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};


export default Header;
