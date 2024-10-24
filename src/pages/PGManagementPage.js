// src/pages/PGManagementPage.js
import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import PGList from '../components/PGList';
import AddPG from '../components/AddPG';


const PGManagementPage = () => {
    const [pgListings, setPgListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchPGListings = async () => {
            setLoading(true);
            try {
                const ownerId = localStorage.getItem('ownerId'); // Replace with actual owner ID retrieval
                const response = await axios.get(`/api/owners/pg/${ownerId}`);
                setPgListings(response.data);
            } catch (error) {
                console.error('Error fetching PG listings:', error);
                setError('Failed to fetch PG listings. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchPGListings();
    }, []);

    return (
        <div>
            <h1>PG Management</h1>
            <AddPG setPgListings={setPgListings} />
            <h2>Your PG Listings</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <div className="error">{error}</div>
            ) : pgListings.length === 0 ? (
                <p>No PG listings available.</p>
            ) : (
                <PGList pgListings={pgListings} setPgListings={setPgListings} />

            )}
        </div>
    );
};

export default PGManagementPage;
