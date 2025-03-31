const express = require('express');
const { getEvents, createEvent, registerForEvent, updateEvent, deleteEvent, getDepartmentWiseEvents, getEventById, getDepartmentWiseEventsIC, getEventByIdPublic, isRegistered } = require('../controllers/eventController');
const { auth, isAdmin, isIncharge } = require('../middleware/auth');

const router = express.Router();

router.get('/', getEvents);
router.get('/dept/:dept', getDepartmentWiseEvents);
router.get('/department', auth, isIncharge,  getDepartmentWiseEventsIC); // Updated route for department-wise events
router.get('/:id', getEventByIdPublic); // New route to fetch event by ID
router.get('/ic/:id', auth, isIncharge, getEventById); // New route to fetch event by ID
router.get('/:id/is-registered', auth, isRegistered); // New route to check if registered
router.post('/:id/register', auth, registerForEvent);

router.post('/', auth, isIncharge, createEvent);
router.put('/:id', auth, isIncharge, updateEvent);
router.delete('/:id', auth, isIncharge, deleteEvent);

module.exports = router;