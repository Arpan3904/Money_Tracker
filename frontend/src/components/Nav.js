import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Nav = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    // Function to handle navigation
    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <div className='nav-bar'>
            <div className='logo'>
                <a href='#'>Money Tracker</a>
            </div>
            <ul>
                <li><a onClick={() => handleNavigation('/dashboard')}>Home</a></li>
                <li><a onClick={() => handleNavigation('/groups')}>Expenses</a></li>
                <li><a onClick={() => handleNavigation('/')}>Logout</a></li>
            </ul>
        </div>
    );
}

export default Nav;
