import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AddExpense = () => {
    const [groups, setGroups] = useState([]);
    const [description, setDescription] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedGroup, setSelectedGroup] = useState([]);
    const [groupMembers, setGroupMembers] = useState([]);
    const [selectedMembers, setSelectedMembers] = useState('');
    const [equallySplit, setEquallySplit] = useState(true);
    const [amounts, setAmounts] = useState({});
    const [error, setError] = useState('');
    const [selectedGroupEntity,setSelectedGroupEntity]=useState([]);


    useEffect(() => {
        fetchGroups();
        // Call handleEquallySplitChange by default when component mounts
        handleEquallySplitChange();
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



    const fetchGroupMembers = async (selectedGroupId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/groups/${selectedGroupId}/members`);
            console.log(response.data);
            setGroupMembers(response.data);
        } catch (error) {
            console.error('Fetch group members error:', error);
        }
    };


    const fetchGroupById = async (selectedGroupId) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/groups1/${selectedGroupId}`);
            console.log(response.data);
            setSelectedGroupEntity(response.data);
        } catch (error) {
            console.error('Fetch group by ID error:', error);
            throw error;
        }
    };
    const updateOwn =async ()=> {
        const uname = localStorage.getItem('uname');
        console.log("in updateOwn"+amount);
        const response1 = await axios.put(`http://localhost:8080/api/ownamt/${uname}`, { ownAmount:amount });
        console.log(amount+"jay chhe.");
    }

    const updateOwe = async () => {
        const uname = localStorage.getItem('uname');
        console.log("in updateOwe" + amounts.arpan);
        const response1 = await axios.put(`http://localhost:8080/api/oweamt/${uname}`, amounts);
        console.log(amount + "jay chhe.");
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateAmounts()) {
            window.alert('Total amount for each member must be equal to the overall amount.');
            return;
        }

        // if (equallySplit) {
            // const equalAmount = parseFloat(amount) / groupMembers.length;

            // console.log("bbb"+groupMembers);

            // groupMembers.forEach(member => {
            //     console.log({member});
            //     handleAmountChange({member},{equalAmount});
            // });
            // console.log(amounts);



        // } else {
        //     // Clear amounts when switching back to unequally split
        //     setAmounts({});
        // }

        try {
            const amountsArray = Object.entries(amounts).map(([member, amount]) => ({ [member]: parseFloat(amount) }));
            const formattedAmounts = Object.assign({}, ...amountsArray);

            const currentDate = new Date();
            const formattedDate = currentDate.toISOString();

            const response = await fetch('http://localhost:8080/api/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    group: selectedGroupEntity,
                    description,
                    amount: parseFloat(amount),
                    paidBy: equallySplit ? 'equally' : 'unequally',
                    amounts: formattedAmounts,
                    createdAt: formattedDate,
                }),
            });
            updateOwn();
            updateOwe();



            if (!response.ok) {
                throw new Error('Failed to add expense. Please try again.');
            }


            const responseData = await response.json();

            // Handle successful expense addition (e.g., show success message)
            console.log('Expense added successfully:', responseData);

            setDescription('');
            setAmount('');
            setSelectedGroup('');
            setSelectedMembers([]);
            setAmounts({});
            setEquallySplit(true);
            setError('');
        } catch (error) {
            setError('Failed to add expense. Please try again.');
            console.error('Add expense error:', error);
        }
    };


    const validateAmounts = () => {
        if (equallySplit) {
            // In case of equally split, no need for validation
            return true;
        }

        // Calculate the total amount entered for each member
        const totalAmountForMembers = Object.values(amounts)
            .filter((amount) => amount !== '')
            .reduce((acc, curr) => acc + parseFloat(curr), 0);

        // Check if the total amount for each member is equal to the overall amount
        return parseFloat(totalAmountForMembers) === parseFloat(amount);
    };

    const handleCheckboxChange = (member) => {
        const updatedMembers = [...selectedMembers];

        if (updatedMembers.includes(member)) {
            updatedMembers.splice(updatedMembers.indexOf(member), 1);
        } else {
            updatedMembers.push(member);
        }

        setSelectedMembers(updatedMembers);


    };

    const handleEquallySplitChange = () => {
        setEquallySplit(!equallySplit);

        const equalAmount = parseFloat(amount) / groupMembers.length;
        if(!equallySplit) {
            groupMembers.forEach(member => {
                setAmounts((prevAmounts) => ({
                    ...prevAmounts,
                    [member]: equalAmount,
                })
                );
            });
        }
    };

    const handleGroupChange = async (e) => {
        const selectedGroupId = e.target.value;
        setSelectedGroup(e.target.value);
        console.log(selectedGroupId);
        if (selectedGroupId) {
            try {
                fetchGroupById(selectedGroupId);
                fetchGroupMembers(selectedGroupId);

                // Now you have the details of the selected group in the selectedGroup variable
                console.log('Selected Group:', selectedGroupEntity);


                // If needed, you can perform additional actions with the group details here
            } catch (error) {
                console.error('Failed to fetch group by ID:', error);
            }
        } else {
            setGroupMembers([]);
        }
    };

    const handleAmountChange = (member, value) => {


            setAmounts((prevAmounts) => ({
                ...prevAmounts,
                [member]: value,
            }));

    };

    const amountForMember = (member) => amounts[member] || '';


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
                    <h2 className='h2'>Add Expense</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-element">
                            <label className="label h2">Select Group:</label>
                            <select className="select" value={selectedGroup} onChange={handleGroupChange}>
                                <option value="">Select a group</option>
                                {groups.map(group => (
                                    <option key={group.id} value={group.id}>{group.groupName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-element">
                            <label className="label h2">Description:</label>
                            <input className="input" type="text" value={description}
                                   onChange={(e) => setDescription(e.target.value)}/>
                        </div>
                        <div className="form-element">
                            <label className="label h2">Amount:</label>
                            <input className="input" type="number" value={amount}
                                   onChange={(e) => setAmount(e.target.value)}/>
                        </div>
                        <div className="form-element">
                            <label className="label h2">Paid By</label>
                            {equallySplit ? (
                                <div>
                                    <input
                                        type="checkbox"
                                        id="equallySplitCheckbox"
                                        checked={equallySplit}
                                        onChange={handleEquallySplitChange}
                                    />
                                    <label htmlFor="equallySplitCheckbox" className='h2'>Equally Split</label>
                                </div>
                            ) : (
                                // Render checkboxes and text fields for each group member
                                <>
                                    <div>
                                        <input
                                            type="checkbox"
                                            id="equallySplitCheckbox"
                                            checked={equallySplit}
                                            onChange={handleEquallySplitChange}
                                        />
                                        <label htmlFor="equallySplitCheckbox" className='h2'>Equally Split</label>
                                    </div>
                                    {groupMembers.map(member => (
                                        <div key={member} className="checkbox h2">
                                            <input
                                                type="checkbox"
                                                id={member}
                                                value={member}
                                                checked={selectedMembers.includes(member)}
                                                onChange={() => handleCheckboxChange(member)}
                                            />
                                            <label htmlFor={member}>{member}</label>
                                            <input
                                                type="number"
                                                placeholder="Amount"
                                                value={amountForMember(member)}
                                                onChange={(e) => handleAmountChange(member, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                        {error && <p className="error">{error}</p>}
                        <button className="button" type="submit">Add Expense</button>
                    </form>
                </div>
                <div className='right-section'>
                    <div className='activities'>
                        <h2 className='h2'></h2>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddExpense;