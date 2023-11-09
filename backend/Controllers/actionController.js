const Action = require('../Models/actionModel');
const Complaint = require('../Models/complaintModel');
const geocode = require('../util/geocode');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Controller function to register a new action
exports.createAction = async (req, res) => {
  try {
    const { complaintId, actionDescription, status } = req.body;
    const adminId = req.user._id;
    let photo = null;

    if (req.file) {
      // If a photo is uploaded, store it and get the file path
      photo = req.file.path;
    }

    // Check if the complaint with complaintId exists
    const complaint = await Complaint.findById(complaintId);

    if (!complaint) {
      return res.status(404).json({ message: 'Complaint not found', success: false });
    }

    // Extract location information from the image using your geocode module
    const location = photo ? await geocode.extractLocationFromImage(photo) : null;

    await Action.create({
      complaint: complaintId,
      user: adminId,
      actionDescription,
      status,
      location, // Include location if it's available
      attachment: photo,
    });

    res.status(201).json({ message: 'Action registered successfully', success: true });
  } catch (error) {
    console.error('Error registering action:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to update the status of an action
exports.updateAction = async (req, res) => {
  try {
    const { actionId } = req.params;
    const { status } = req.body;
    const adminId = req.user._id;

    // Check if the action with actionId exists
    const action = await Action.findById(actionId);

    if (!action) {
      return res.status(404).json({ message: 'Action not found', success: false });
    }

    // Check if the action is assigned to the current admin
    if (action.user.toString() !== adminId) {
      return res.status(403).json({ message: 'Access denied. Action is not assigned to you.', success: false });
    }

    action.status = status;

    await action.save();

    res.status(200).json({ message: 'Action status updated successfully', success: true });
  } catch (error) {
    console.error('Error updating action status:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to delete an action by its ID
exports.deleteAction = async (req, res) => {
  try {
    const { actionId } = req.params;
    const adminId = req.user._id;

    // Find the action by ID
    const action = await Action.findById(actionId);

    if (!action) {
      return res.status(404).json({ message: 'Action not found', success: false });
    }

    // Check if the action is assigned to the current admin
    if (action.user.toString() !== adminId) {
      return res.status(403).json({ message: 'Access denied. Action is not assigned to you.', success: false });
    }

    // Delete the action's attachment file if it exists
    if (action.attachment) {
      const attachmentPath = path.join(__dirname, '..', action.attachment);
      fs.unlinkSync(attachmentPath);
    }

    await action.remove();

    res.status(200).json({ message: 'Action deleted successfully', success: true });
  } catch (error) {
    console.error('Error deleting action:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getActionById = async (req, res) => {
  try {    
    const {id} = req.query
  const actionDescription = await Complaint.find({id})
    res.status(200).json(actionDescription);
  } catch (error) {
    console.error('Error fetching action description:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller function to get actions by complaint ID
exports.getActionsByComplaintId = async (req, res) => {
  try {
    const { complaintId } = req.params;

    // Find all actions associated with the given complaint ID
    const actions = await Action.find({ complaint: complaintId });

    if (!actions) {
      return res.status(404).json({ message: 'No actions found for this complaint', success: false });
    }

    // Extract the actionDescription and status from each action
    const actionData = actions.map((action) => ({
      actionDescription: action.actionDescription,
      status: action.status,
      attachment: action.attachment,
    }));

    res.status(200).json({ actions: actionData, success: true });
  } catch (error) {
    console.error('Error getting actions by complaint ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getActionById = async (req, res) => {
  try {
    const { id } = req.query;
    
    // Find the action by ID
    const action = await Action.findById(id);

    if (!action) {
      return res.status(404).json({ message: 'Action not found', success: false });
    }

    // Extract action details (actionDescription, status, attachment)
    const { actionDescription, status, attachment } = action;

    res.status(200).json({ actionDescription, status, image: attachment, success: true });
  } catch (error) {
    console.error('Error fetching action details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};