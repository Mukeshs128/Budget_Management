import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navigation from './components/navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income';
import Expenses from './components/Expenses/Expenses';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [active, setActive] = useState(1);

  // Check if the user is logged in
  const isLoggedIn = () => {
    return !!localStorage.getItem('token'); // Checks for a JWT token in localStorage
  };

  // Protected Route Component
  const ProtectedRoute = ({ children }) => {
    return isLoggedIn() ? children : <Navigate to="/login" />;
  };

  // Main Content Display Logic
  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <TransactionHistory />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <div className="App" style={{ display: 'flex' }}>
        {/* Show Navigation only if logged in */}
        {isLoggedIn() && <Navigation active={active} setActive={setActive} />}
        <main style={{ flexGrow: 1 }}>
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  {displayData()}
                </ProtectedRoute>
              }
            />

            {/* Redirect to Dashboard or Login */}
            <Route
              path="/"
              element={isLoggedIn() ? <Navigate to="/dashboard" /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
