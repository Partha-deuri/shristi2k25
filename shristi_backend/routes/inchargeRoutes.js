const express = require('express');
const { getRegisteredUsers, deregisterUserFromEvent } = require('../controllers/inchargeController');
const router = express.Router();


// Route to get registered users for an event
router.get('/events/:eventId/registered-users', getRegisteredUsers);

// Route to deregister a user from an event
router.delete('/events/:eventId/deregister/:userId', deregisterUserFromEvent);

module.exports = router;
