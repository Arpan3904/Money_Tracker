// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Authentication from './components/Authentication';
import Account from './components/Account';
import Dashboard from "./components/Dashboard";
import Groups from "./components/Groups";
import AddExpense from './components/AddExpense';

import AddGroup from './components/AddGroup'

// import Default from "./components/Default";
const App = () => {
    const [user, setUser] = useState(null);
    const [expenses, setExpenses] = useState([]);


    return (
        <Router>
            <div>
                <Routes>
                    <Route path="/" element={<Authentication setUser={setUser} />} />
                    <Route path="/signup" element={<Account setUser={setUser} />} />
                    <Route path="/groups" element={<Groups/>} />
            {/*<Route path="/settle" element={<Settle />} />*/}
            {/*<Route path="/" element={<Default/>} />*/}
                    <Route path="/dashboard" element={<Dashboard/>} />
                    <Route path="/addgroup" element={<AddGroup/>} />
                    <Route path="/addexpense" element={<AddExpense/>} />


                </Routes>
            </div>
        </Router>
    );
};

export default App;