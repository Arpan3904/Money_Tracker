import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Nav = () => {
    const navigate = useNavigate(); // Initialize useNavigate

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the specified path
    };

    return (
        <div className='nav-bar'>
            <div style={{fontSize:"30px",color:"white"}}>
                Money Tracker
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
