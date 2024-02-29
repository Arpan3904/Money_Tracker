import React from 'react';

const Nav = () => {
    return (
        <div className='nav-bar'>
            <div className='logo'>
                <a href='#'>Money Tracker</a>
            </div>
            <ul>
                <li><a href='/Dashboard'>Home</a></li>
                <li><a href='/groups'>Groups</a></li>
                <li><a href='/'>Logout</a></li>
            </ul>
        </div>
    );
}

export default Nav;
