import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import Nav from "./Nav";

const Dashboard = ({ moneymanager }) => {
    const [oweData, setOweData] = useState([]);
    const [ownData, setOwnData] = useState([]);
    const [totalData, setTotalData] = useState([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const uname = localStorage.getItem('uname');
        setUsername(uname);
        fetchOweOwnTotalData();
    }, []);

    const fetchOweOwnTotalData = async () => {
        try {
            const uname = localStorage.getItem('uname');
            const response = await axios.get(`http://localhost:8080/api/users/checkuser/${uname}`);
            setOweData(response.data.oweAmount);
            setOwnData(response.data.ownAmount);
            setTotalData(response.data.totalExpense)
        } catch (error) {
            console.error('Fetch owe and own data error:', error);
        }
    };

    const handleSettleUp = async () => {
        if (window.confirm("Are you sure you want to Settle Up?")) {
            const uname = localStorage.getItem('uname');

            const response1 = await axios.put(`http://localhost:8080/api/settle/${uname}`);
            if(response1.status==200)
            {
                setOweData(0);
                setOwnData(0);
            }
        }};

    return (
        <div className='dashboard-container'>
            <div className='rounded-blocks'>
                <div className='left-section'>
                    <Nav />
                </div>

                <div className='center-section'>
                    <h1 className='Dashboard-uname'>HELLO  <span className="username">{username}</span> !</h1>
                    <div className='button-section'>
                        <Link to='/addexpense'>
                            <button className='action-button1'>Add Expense</button>
                        </Link>
                        <button className='action-button2' onClick={handleSettleUp}>Settle Up</button>
                    </div>
                    <div className='info-boxes'>
                        <div className='info-box total-expense'>
                            <p className='infotext'>Total Expense</p>
                            <p className='infotext'>{totalData}</p>
                        </div>
                        <div className='info-box total-owe'>
                            <p className='infotext'>Total Owe</p>
                            <p className='infotext' style={{ color: "red" }}>{oweData}</p>
                        </div>
                        <div className='info-box your-own'>
                            <p className='infotext'>Your Own</p>
                            <strong><p className='infotext' style={{ color: "green" }}>{ownData}</p></strong>
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
