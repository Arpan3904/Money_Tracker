import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const navigate = useNavigate(); // Move useNavigate inside the component function

    const linkStyle = {
        textDecoration: 'none',
        color: 'inherit',
    };

    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            if (response.ok) {
                const responseData = await response.json();
                window.alert("Registered Successfully"); // Correct 'windows' to 'window'
                navigate("/");
            } else {
                const errorData = await response.json();
                window.alert('Error during Register');
            }
        } catch (error) {
            // Handle network errors or other exceptions
        }
    };

    return (
        <div className='container'> {/* Corrected className */}
            <div className='center'>
                <h1>Register</h1>
                <form action='' method='POST' onSubmit={handleSubmit}>
                    <div className='txt_field'>
                        <input type="text" name="username" required value={user.username} onChange={handleChange}/>
                        <label>Name</label>
                    </div>
                    <div className='txt_field'>
                        <input type="email" name="email" required value={user.email} onChange={handleChange}/>
                        <span></span>
                        <label>Email</label>
                    </div>
                    <div className='txt_field'>
                        <input type="password" name="password" required value={user.password} onChange={handleChange}/>
                        <span></span>
                        <label>Password</label>
                    </div>
                    <div className='txt_field'>
                        <input type="password" name="cpassword" required/>
                        <span></span>
                        <label>Confirm Password</label>
                    </div>
                    <input name="submit" type="Submit" value="Sign Up"/>
                    <Link to="/" style={linkStyle}>
                        <div className="signup_link"> {/* Corrected className */}
                            Have an Account? Login
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default Account;
