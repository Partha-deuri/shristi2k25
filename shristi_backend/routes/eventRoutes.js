const express = require('express');
const { getEvents, createEvent, registerForEvent, updateEvent, deleteEvent } = require('../controllers/eventController');
const { auth, isAdmin, isIncharge } = require('../middleware/auth');

const router = express.Router();

router.get('/', getEvents);
router.post('/:id/register', auth, registerForEvent);

router.post('/', auth, isIncharge, createEvent);
router.put('/:id', auth, isIncharge, updateEvent);
router.delete('/:id', auth, isIncharge, deleteEvent);

module.exports = router;