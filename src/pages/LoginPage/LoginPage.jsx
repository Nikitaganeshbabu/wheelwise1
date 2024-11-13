import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './LoginPage.css'; // Assuming you have a CSS file similar to RegisterPage
import ill from '../../assets/illustration.png'; // Add the same illustration for consistency

const LoginPage = () => {
  const { login } = useAuth();
  const [input, setInput] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user from localStorage

    if (storedUser) {
      // Validate login credentials
      if (storedUser.email === input.email && storedUser.password === input.password) {
        // Successful login
        login(input);
        // Redirect to dashboard or home page (optional)
        // Example: history.push("/dashboard");
      } else {
        setError('Invalid email or password.');
      }
    } else {
      setError('No registered user found.');
    }
  };

  return (
    <div className="login-page">
      <div className="image-container">
        <img src={ill} alt="Login" className="login-image" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="login-form">
          <h2>Welcome Back</h2>

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
          />

          {error && <span className="error">{error}</span>}

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
