import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './RegisterPage.css';
import ill from '../../assets/illustration.png';

const RegisterPage = () => {
  const { register } = useAuth();
  const [input, setInput] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const newErrors = { name: '', email: '', password: '' };

    // Validate Name
    if (!input.name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }

    // Validate Email
    if (!validateEmail(input.email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }

    // Validate Password
    if (input.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      // Save user data in localStorage after successful registration
      const user = { name: input.name, email: input.email, password: input.password };
      localStorage.setItem('user', JSON.stringify(user)); // Store user details
      register(input);
      // Redirect user to login page after successful registration (optional)
      // Example: history.push("/login");
    }
  };

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  return (
    <div className="register-page">
      <div className="image-container">
        <img src={ill} alt="Register" className="register-image" />
      </div>
      <div className="form-container">
        <form onSubmit={handleSubmit} className="register-form">
          <h2>Join Us</h2>

          <label>Name</label>
          <input
            type="text"
            name="name"
            value={input.name}
            onChange={handleChange}
            required
          />
          {errors.name && <span className="error">{errors.name}</span>}

          <label>Email</label>
          <input
            type="email"
            name="email"
            value={input.email}
            onChange={handleChange}
            required
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handleChange}
            required
            minLength="6"
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
