// src/pages/OwnerDashboardPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OwnerDashboardPage = () => {
    const [pgListings, setPgListings] = useState([]);

    useEffect(() => {
        const fetchPGListings = async () => {
            try {
                const ownerId = 'YOUR_OWNER_ID'; // Replace with actual owner ID
                const response = await axios.get(`/api/owners/pg/${ownerId}`);
                setPgListings(response.data);
            } catch (error) {
                console.error('Error fetching PG listings:', error);
            }
        };

        fetchPGListings();
    }, []);

    return (
        <div>
            <h1>Owner Dashboard</h1>
            <h2>Your PG Listings</h2>
            <ul>
                {pgListings.map(pg => (
                    <li key={pg._id}>
                        <h3>{pg.name}</h3>
                        <p>{pg.description}</p>
                        <p>Price: ${pg.price}</p>
                        <p>Available Rooms: {pg.availableRooms}</p>
                    </li>
                ))}
            </ul>
            {/* Add functionalities for adding/editing/deleting PGs */}
        </div>
    );
};

export default OwnerDashboardPage;
