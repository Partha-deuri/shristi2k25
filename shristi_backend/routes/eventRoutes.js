const express = require('express');
const { getEvents, createEvent, registerForEvent, updateEvent, deleteEvent, getDepartmentWiseEvents } = require('../controllers/eventController');
const { auth, isAdmin, isIncharge } = require('../middleware/auth');

const router = express.Router();

router.get('/', getEvents);
router.get('/department', auth, isIncharge, getDepartmentWiseEvents); // Updated route for department-wise events
router.post('/:id/register', auth, registerForEvent);

router.post('/', auth, isIncharge, createEvent);
router.put('/:id', auth, isIncharge, updateEvent);
router.delete('/:id', auth, isIncharge, deleteEvent);

module.exports = router;