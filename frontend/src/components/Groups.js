import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Dashboard = ({ moneymanager }) => {
    const [groups, setGroups] = useState([]);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [selectedGroupName, setSelectedGroupName] = useState('');

    useEffect(() => {
        fetchGroups();
    }, []);

    const fetchGroups = async () => {
        try {
            const uname = localStorage.getItem('uname');
            const response = await axios.get(`http://localhost:8080/api/groups`);
            const filteredGroups = response.data.filter(group => group.members.includes(uname));
            setGroups(filteredGroups);
        } catch (error) {
            console.error('Fetch groups error:', error);
        }
    };

    const handleGroupClick = async (groupId, groupName) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/${groupId}/expenses`);
            setExpenses(response.data);
            setSelectedGroup(groupId);
            setSelectedGroupName(groupName);
        } catch (error) {
            console.error('Error fetching expenses:', error);
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
                    <div className='activities' style={{overflowY: 'auto', maxHeight: '400px'}}>
                        <h2 className='h2'>Expenses for Group {selectedGroupName}</h2>
                        <ul>
                            {expenses.map(expense => (
                                <div key={expense.id} className="expense-box">
                                    <h3>Expense Details</h3>
                                    <p><strong>Description:</strong> {expense.description}</p>
                                    <p><strong>Amount:</strong> {expense.amount}</p>
                                    <p><strong>Date:</strong> {new Date(expense.createdAt).toLocaleString()}</p>
                                    <p><strong>Paid By:</strong> {expense.paidBy}</p>
                                    {/* Additional details from amounts map */}
                                    <table>
                                        <thead>
                                        <tr>
                                            <th>Member</th>
                                            <th>Amount</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {Object.entries(expense.amounts).map(([member, amount]) => (
                                            <tr key={member}>
                                                <td><strong>{member}</strong></td>
                                                <td>{amount}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='right-section'>
                    <div>
                        <h2 className='h2'>Groups</h2>
                        <ul className="group-list h2">
                        {groups.map(group => (
                                <li key={group.id}
                                    onClick={() => handleGroupClick(group.id, group.groupName)}>{group.groupName}</li>
                            ))}
                        </ul>
                    </div>
                    <Link to='/addgroup'>
                        <button className='action-button3'>Add Group</button>
                    </Link>
                </div>

            </div>
        </div>
    );
}

export default Dashboard;
