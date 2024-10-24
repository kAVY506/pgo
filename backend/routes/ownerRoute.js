const express = require('express');
const router = express.Router();
const ownerController = require('../Controllers/ownerController');


// Owner registration
router.post('/register', ownerController.registerOwner);

// PG management
router.post('/pg/add', ownerController.addPG);
router.get('/pg/:ownerId', ownerController.getPGListings);
router.put('/pg/:pgId', ownerController.updatePG);
router.delete('/pg/:pgId', ownerController.deletePG);

// Inquiry management
router.put('/pg/:pgId/inquiry/:inquiryId/respond', ownerController.respondToInquiry);

module.exports = router;
