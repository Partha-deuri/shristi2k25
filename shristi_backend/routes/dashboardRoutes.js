const express = require('express');

const { auth, isAdmin } = require('../middleware/auth');
const { getUser, getEvent, getNotifications, getName } = require('../controllers/dashboardController');

const router = express.Router();

router.get('/user', auth, getUser);
router.get('/userpic', auth, getName);
router.get('/event', auth,  getEvent);
router.get('/notifications', auth, getNotifications);

module.exports = router; 