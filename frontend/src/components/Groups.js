import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Nav from "./Nav";

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
                    <Nav />
                </div>
                <div className='center-section'>
                    <div className='activities' style={{overflowY: 'auto', maxHeight: '400px'}}>
                        <h2 className='h2'>Expenses for Group {selectedGroupName}</h2>
                        <ul>
                            {expenses.map(expense => (
                                <div key={expense.id} className="expense-box" style={{
                                    border: '2px solid #ccc',
                                    padding: '10px',
                                    marginBottom: '20px',
                                    borderRadius: '5px'
                                }}>
                                    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px'}}>
                                        <div>
                                            <p><strong>Description:</strong></p>
                                            <p>{expense.description}</p>
                                        </div>
                                        <div>
                                            <p><strong>Amount:</strong></p>
                                            <p>{expense.amount}</p>
                                        </div>
                                        <div>
                                            <p><strong>Date:</strong></p>
                                            <p>{expense.createdAt.toString()}</p>
                                        </div>
                                        <div>
                                            <p><strong>Paid By:</strong></p>
                                            <p>{expense.paidBy}</p>
                                        </div>
                                    </div>
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
                                <li
                                    key={group.id}
                                    onClick={() => handleGroupClick(group.id, group.groupName)}
                                    style={{
                                        background: 'transparent',
                                        border: 'none',
                                        cursor: 'pointer',
                                        padding: '10px',
                                        margin: '5px',
                                        borderRadius: '5px',
                                        transition: 'background 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => {
                                        e.target.style.background = 'blue'; }}
                                    onMouseLeave={(e) => { e.target.style.background = 'transparent'; }}
                                >
                                    {group.groupName}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <Link to='/addgroup'>
                        <button className='action-button3' style={{marginLeft:'70vw'}}>Add Group</button>
                    </Link>

                </div>

            </div>
        </div>
    );
}

export default Dashboard;
