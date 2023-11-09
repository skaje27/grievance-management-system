const express = require('express');
const router = express.Router();
const { userVerification } = require('../Middlewares/AuthMiddleware');
const uploader = require('../Middlewares/multer')
const {
  registerComplaint,
  getAllComplaints,
  deleteComplaint,
  getComplaintByDepartment, // Ensure this function is correctly imported
} = require('../Controllers/complaintController');

// User verification middleware
router.use(userVerification);

// Register Complaint route
router.post('/register', uploader.single("photo"), registerComplaint);

// Get Complaints route
router.get('/complaints', getAllComplaints);

router.get("/department", getComplaintByDepartment)

// Delete Complaint route
router.delete('/complaints/:id', deleteComplaint);

module.exports = router;
