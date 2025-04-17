
const express = require('express');
const { Grievance } = require('../models/index');
const { classifyComplaint } = require('../services/aiModel');
const { generateTrackingId } = require('../utils/helpers');

const router = express.Router();

// Create a new grievance
router.post('/', async (req, res) => {
  try {
    const { subject, description, category, state, district, address } = req.body;
    
    // Generate unique tracking ID
    const trackingId = generateTrackingId();
    
    // Analyze complaint using AI model
    const analysisResult = await classifyComplaint(description);
    
    // Create new grievance
    const newGrievance = new Grievance({
      trackingId,
      userId: req.user._id,
      subject,
      description,
      originalLanguage: 'en', // Assuming English for simplicity
      department: analysisResult.department,
      tags: analysisResult.tags,
      confidenceScore: analysisResult.confidence,
      urgency: 'medium', // Default urgency
      state,
      district,
      address,
      status: 'pending'
    });
    
    await newGrievance.save();
    
    res.status(201).json({ 
      message: 'Grievance submitted successfully',
      trackingId,
      grievance: newGrievance
    });
  } catch (error) {
    console.error('Create grievance error:', error);
    res.status(500).json({ message: 'Server error while submitting grievance' });
  }
});

// Get all grievances for current user
router.get('/my-grievances', async (req, res) => {
  try {
    const grievances = await Grievance.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    
    res.json(grievances);
  } catch (error) {
    console.error('Get grievances error:', error);
    res.status(500).json({ message: 'Server error while fetching grievances' });
  }
});

// Get a single grievance by tracking ID
router.get('/track/:trackingId', async (req, res) => {
  try {
    const { trackingId } = req.params;
    
    const grievance = await Grievance.findOne({ trackingId });
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    
    // Check if user has access (either own grievance or admin)
    if (
      grievance.userId !== req.user._id.toString() && 
      req.user.role !== 'department_admin' && 
      req.user.role !== 'super_admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to view this grievance' });
    }
    
    res.json(grievance);
  } catch (error) {
    console.error('Track grievance error:', error);
    res.status(500).json({ message: 'Server error while tracking grievance' });
  }
});

// Add a comment to a grievance
router.post('/:id/comments', async (req, res) => {
  try {
    const { id } = req.params;
    const { text } = req.body;
    
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    
    // Check if user has access
    if (
      grievance.userId !== req.user._id.toString() && 
      req.user.role !== 'department_admin' && 
      req.user.role !== 'super_admin'
    ) {
      return res.status(403).json({ message: 'Not authorized to comment on this grievance' });
    }
    
    // Add comment
    grievance.comments.push({
      userId: req.user._id,
      userRole: req.user.role,
      text,
      createdAt: Date.now()
    });
    
    await grievance.save();
    
    res.status(201).json(grievance);
  } catch (error) {
    console.error('Add comment error:', error);
    res.status(500).json({ message: 'Server error while adding comment' });
  }
});

// Update grievance status (admin only)
router.put('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, comments } = req.body;
    
    // Check if user is admin
    if (req.user.role !== 'department_admin' && req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Not authorized to update grievance status' });
    }
    
    const grievance = await Grievance.findById(id);
    if (!grievance) {
      return res.status(404).json({ message: 'Grievance not found' });
    }
    
    // Update status
    grievance.status = status;
    
    // Add status update to history
    grievance.statusHistory.push({
      status,
      updatedBy: req.user._id,
      updatedByRole: req.user.role,
      comments,
      updatedAt: Date.now()
    });
    
    grievance.updatedAt = Date.now();
    
    await grievance.save();
    
    res.json(grievance);
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
});

module.exports = router;
