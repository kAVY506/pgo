// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Remove the duplicate 'Routes'
import OwnerDashboardPage from './pages/OwnerDashboardPage';
import PGManagementPage from './pages/PGManagementPage';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<OwnerDashboardPage />} />
            <Route path="/pg-management" element={<PGManagementPage />} />
        </Routes>
    );
};

export default App;
