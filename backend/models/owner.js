const mongoose = require('mongoose');

// PG Listing Model
const pgSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    availableRooms: { type: Number, required: true },
    inquiries: [
        {
            user: { type: String, required: true },
            message: { type: String, required: true },
            response: { type: String },
        }
    ]
}, { timestamps: true });

// Owner Model
const ownerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pgListings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PG' }]
}, { timestamps: true });

const Owner = mongoose.model('Owner', ownerSchema);
const PG = mongoose.model('PG', pgSchema);

module.exports = { Owner, PG };
