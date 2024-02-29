import React, {Component, useEffect, useState} from 'react';
import axios from "axios";
import {Link} from "react-router-dom";

const Dashboard = ({ moneymanager }) => {
    const [oweData, setOweData] = useState([]);
    const [ownData, setOwnData] = useState([]);
    useEffect(() => {
    fetchOweOwnData();
}, []);
    const fetchOweOwnData = async () => {
        try {
            const uname = localStorage.getItem('uname');
            const response = await axios.get(`http://localhost:8080/api/users/checkuser/${uname}`); // Assuming this endpoint returns owe and own amounts for the user
            setOweData(response.data.oweAmount);
            setOwnData(response.data.ownAmount);
            console.log("aa"+response.data);
        } catch (error) {
            console.error('Fetch owe and own data error:', error);
        }
    };
        return (
            <div className='dashboard-container'>
                <div className='rounded-blocks'>
                    <div className='left-section'>
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
                    </div>
                    <div className='center-section'>
                        <div className='button-section'>
                            <Link to='/addexpense'>
                                <button className='action-button1'>Add Expense</button>
                            </Link>
                            <button className='action-button2'>Settle Up</button>
                        </div>
                        <div className='info-boxes'>
                            <div className='info-box total-expense'>
                                <p className='infotext'>Total Expense</p>
                                <p className='infotext'>{oweData}</p>
                            </div>
                            <div className='info-box total-owe'>
                                <p className='infotext' >Total Owe</p>
                                <p className='infotext' style={{color:"red"}}>{oweData}</p>
                            </div>
                            <div className='info-box your-own'>
                                <p className='infotext' >Your Own</p>
                                <strong><p className='infotext' style={{color:"green"}}>{ownData}</p></strong>
                            </div>
                        </div>
                        <div className='owe-list'>
                            <div className='your-owe'>
                                <h2 className='h2'>Your Owe</h2>
                                <ul>
                                    <li>John owes you $50</li>
                                    <li>Jane owes you $30</li>
                                </ul>
                            </div>
                            <div className='your-own'>
                                <h2 className='h2'>Your Owed</h2>
                                <ul>
                                    <li>You owe John $20</li>
                                    <li>You owe Jane $10</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='right-section'>
                        <div className='activities'>
                            <h2 className='h2'></h2>
                        </div>

                    </div>
                </div>
            </div>
        );
}

export default Dashboard;
