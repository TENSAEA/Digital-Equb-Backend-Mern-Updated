const express = require('express');
const router = express.Router();
const {
  createEqub,
  getUserCreatedEqubs,
  getAdminCreatedEqubs,
  joinEqub,
  getEqubById,
  getUserEqubs,
  updateEqub,
  deleteEqub,
  confirmDelete,
} = require('../controllers/equbController');

const authMiddleware = require('../middleware/auth');
const adminMiddleware = require('../middleware/adminMiddleware');
const equbAdminMiddleware = require('../middleware/equbAdminMiddleware');

router.post('/create', authMiddleware, createEqub);
router.get('/user-created', authMiddleware, getUserCreatedEqubs);
router.get('/available-equbs', authMiddleware, getAdminCreatedEqubs);
router.post('/join', authMiddleware, joinEqub);

router.get('/my-equbs', authMiddleware, getUserEqubs);
router.get('/:id', authMiddleware, getEqubById);
router.put('/:id', authMiddleware, equbAdminMiddleware, updateEqub);
router.delete('/:id', authMiddleware, equbAdminMiddleware, deleteEqub);
router.post('/confirm-delete/:id', authMiddleware, adminMiddleware, confirmDelete);

module.exports = router;
