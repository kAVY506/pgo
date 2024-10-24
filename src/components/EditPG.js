// src/components/EditPG.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditPG = ({ setPgListings }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [availableRooms, setAvailableRooms] = useState('');
    const { pgId } = useParams();
    const history = useHistory();

    useEffect(() => {
        const fetchPGDetails = async () => {
            const response = await axios.get(`/api/owners/pg/${pgId}`);
            const pg = response.data;
            setName(pg.name);
            setAddress(pg.address);
            setDescription(pg.description);
            setPrice(pg.price);
            setAvailableRooms(pg.availableRooms);
        };

        fetchPGDetails();
    }, [pgId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/owners/pg/${pgId}`, {
                name,
                address,
                description,
                price,
                availableRooms,
            });
            setPgListings(prev => prev.map(pg => (pg._id === pgId ? { ...pg, name, address, description, price, availableRooms } : pg)));
            history.push('/pg-management');
        } catch (error) {
            console.error('Error updating PG:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit PG Listing</h2>
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
            <button type="submit">Update PG</button>
        </form>
    );
};

export default EditPG;
