const express = require('express');
const router = express.Router();
const { userVerification } = require('../Middlewares/AuthMiddleware');
const uploader = require('../Middlewares/multer');
const {
  createAction,
  updateAction,
  deleteAction,
  getActionsByComplaintId,
  //getAllActions,
} = require('../Controllers/actionController');

// User verification middleware
router.use(userVerification);

// Create Action route
router.post('/actions', uploader.single('photo'), createAction);

// Update Action route
router.put('/actions/:id', updateAction);

// Delete Action route
router.delete('/actions/:id', deleteAction);

// Get Actions by Comsplaint ID route
router.get('/get/:complaintId', getActionsByComplaintId);

module.exports = router;
