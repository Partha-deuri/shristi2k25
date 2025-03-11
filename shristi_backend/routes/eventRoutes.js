const express = require('express');
const { getEvents, createEvent, registerForEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { auth, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getEvents);
router.post('/', auth, isAdmin, createEvent);
router.post('/:id/register', auth, registerForEvent);
router.put('/:id', auth, isAdmin, updateEvent);
router.delete('/:id', auth, isAdmin, deleteEvent);

module.exports = router;