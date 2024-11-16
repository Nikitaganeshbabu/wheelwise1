import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const navigate = useNavigate();


  const register = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const data = await response.json();
      console.log('Registration successful:', data);
      alert('Registration successful! Please log in.');
      navigate('/login');
    } catch (error) {
      console.error('Error during registration:', error.message);
      alert(`Registration failed: ${error.message}`);
    }
  };

  // Function to handle user login
  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8080/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid email or password');
      }
  
      const data = await response.json();
      console.log('Login successful:', data);
  
      setUser(data); // Store user data in state
      navigate('/'); 
    } catch (error) {
      console.error('Error during login:', error.message);
      throw error;
    }
  };
  

  // Function to handle user logout
  const logout = async () => {
    try {
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
  
      const data = await response.json();
      console.log('Logout successful:', data.message);
  
      setUser(null); 
      navigate('/login'); 
    } catch (error) {
      console.error('Error during logout:', error.message);
      alert(`Logout failed: ${error.message}`);
    }
  };
  

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
