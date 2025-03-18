const express = require('express');
const router = express.Router();
const inchargeController = require('../controllers/inchargeController');

// Route to get registered users for an event
router.get('/events/:eventId/registered-users', inchargeController.getRegisteredUsers);

// Route to deregister a user from an event
router.delete('/events/:eventId/deregister/:userId', inchargeController.deregisterUserFromEvent);

module.exports = router;
