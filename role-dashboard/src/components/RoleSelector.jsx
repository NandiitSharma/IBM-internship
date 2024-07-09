import React, { useState } from 'react';

function RoleSelector({ setRole, fetchData }) {
  const [selectedRole, setSelectedRole] = useState('');

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRole(role);
    setRole(role);
    fetchData(role);
  };

  return (
    <div>
      <label htmlFor="role">Select your role:</label>
      <select id="role" value={selectedRole} onChange={handleRoleChange}>
        <option value="">--Select Role--</option>
        <option value="Manager">Manager</option>
        <option value="Administration Head">Administration Head</option>
        <option value="Delivery Agent">Delivery Agent</option>
        <option value="Marketing Head">Marketing Head</option>
      </select>
    </div>
  );
}

export default RoleSelector;
