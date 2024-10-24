// src/components/AddPG.js
import React, { useState } from 'react';
import axios from 'axios';

const AddPG = ({ setPgListings }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availableRooms, setAvailableRooms] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const ownerId = 'YOUR_OWNER_ID'; // Replace with actual owner ID
            const response = await axios.post(`/api/owners/pg/add`, {
                owner: ownerId,
                name,
                address,
                description,
                price,
                availableRooms,
            });
            setPgListings(prev => [...prev, response.data]);
            setName('');
            setAddress('');
            setDescription('');
            setPrice('');
            setAvailableRooms('');
        } catch (error) {
            console.error('Error adding PG:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New PG Listing</h2>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Available Rooms"
                value={availableRooms}
                onChange={(e) => setAvailableRooms(e.target.value)}
                required
            />
            <button type="submit">Add PG</button>
        </form>
    );
};

export default AddPG;
