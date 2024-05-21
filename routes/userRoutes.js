const express = require('express');
const router = express.Router();

const authMiddleware = require('../middleware/auth');
const { signup, login,  getUsersByName, getAllUsers, } = require('../controllers/userController');

router.post('/signup', signup);
router.post('/login', login);
router.get('/search/:name', authMiddleware, getUsersByName); // Route to search for users by name
router.get('/search-all', authMiddleware, getAllUsers);

module.exports = router;
