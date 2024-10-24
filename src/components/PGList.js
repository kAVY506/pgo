// src/components/PGList.js
import React from 'react';
import { Link } from 'react-router-dom';

const PGList = ({ pgListings, setPgListings }) => {
    const handleDelete = async (pgId) => {
        try {
            await axios.delete(`/api/owners/pg/${pgId}`);
            setPgListings((prev) => prev.filter(pg => pg._id !== pgId));
        } catch (error) {
            console.error('Error deleting PG:', error);
        }
    };

    return (
        <ul>
            {pgListings.map(pg => (
                <li key={pg._id}>
                    <h3>{pg.name}</h3>
                    <p>{pg.description}</p>
                    <p>Price: ${pg.price}</p>
                    <p>Available Rooms: {pg.availableRooms}</p>
                    <Link to={`/pg/edit/${pg._id}`}>
                        <button>Edit</button>
                    </Link>
                    <button onClick={() => handleDelete(pg._id)}>Delete</button>
                </li>
            ))}
        </ul>
    );
};

export default PGList;
