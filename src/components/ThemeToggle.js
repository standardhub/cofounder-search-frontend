import React from 'react';
import './ThemeToggle.css';

const ThemeToggle = ({ darkMode, setDarkMode }) => {
  return (
    <button 
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
      aria-label="Toggle dark mode"
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
};

export default ThemeToggle;