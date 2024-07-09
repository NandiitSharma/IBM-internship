import React, { useState } from 'react';
import RoleSelector from './components/RoleSelector';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [role, setRole] = useState('');
  const [data, setData] = useState([]);

  const fetchData = async (role) => {
    try {
      console.log(`Fetching data for role: ${role}`);
      const response = await fetch(`http://localhost:5000/get_data?role=${role}`);
      const result = await response.json();
      console.log('Fetched data:', result);
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="App">
      <RoleSelector setRole={setRole} fetchData={fetchData} />
      {role && <Dashboard role={role} data={data} />}
    </div>
  );
}

export default App;
