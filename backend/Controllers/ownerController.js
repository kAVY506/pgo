const { Owner, PG } = require('../models/owner');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register owner
exports.registerOwner = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const ownerExists = await Owner.findOne({ email });
        if (ownerExists) return res.status(400).json({ message: 'Owner already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const owner = new Owner({ name, email, password: hashedPassword });
        await owner.save();
        res.status(201).json({ message: 'Owner registered successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add PG Listing
exports.addPG = async (req, res) => {
    const { ownerId, name, address, description, price, availableRooms } = req.body;
    try {
        const pg = new PG({ owner: ownerId, name, address, description, price, availableRooms });
        await pg.save();
        await Owner.findByIdAndUpdate(ownerId, { $push: { pgListings: pg._id } });
        res.status(201).json({ message: 'PG added successfully', pg });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// View PG Listings
exports.getPGListings = async (req, res) => {
    try {
        const listings = await PG.find({ owner: req.params.ownerId }).populate('owner');
        res.status(200).json(listings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Update PG Listing
exports.updatePG = async (req, res) => {
    try {
        const updatedPG = await PG.findByIdAndUpdate(req.params.pgId, req.body, { new: true });
        res.status(200).json(updatedPG);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete PG Listing
exports.deletePG = async (req, res) => {
    try {
        await PG.findByIdAndDelete(req.params.pgId);
        res.status(200).json({ message: 'PG listing deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Respond to Inquiry
exports.respondToInquiry = async (req, res) => {
    try {
        const { pgId, inquiryId } = req.params;
        const { response } = req.body;
        const pg = await PG.findById(pgId);
        const inquiry = pg.inquiries.id(inquiryId);
        inquiry.response = response;
        await pg.save();
        res.status(200).json({ message: 'Response sent' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
