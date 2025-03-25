const express = require('express');
const { getRegisteredUsers, deregisterUserFromEvent, inchargeSignup, inchargeLogin, getIncharge } = require('../controllers/inchargeController');
const { isIncharge, auth } = require('../middleware/auth');
const router = express.Router();

// Route to get registered users for an event
router.get('/events/:eventId/registered-users', auth, isIncharge, getRegisteredUsers);

// Route to deregister a user from an event
router.delete('/events/:eventId/deregister/:userId', auth, isIncharge, deregisterUserFromEvent);

router.get('/details', auth, isIncharge, getIncharge);
// Route for incharge signup
router.post('/signup', inchargeSignup);

// Route for incharge login
router.post('/login', inchargeLogin);

module.exports = router;
