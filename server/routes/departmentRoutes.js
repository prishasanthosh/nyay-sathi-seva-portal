
const express = require('express');
const { Department } = require('../models/index');

const router = express.Router();

// Get all departments
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (error) {
    console.error('Get departments error:', error);
    res.status(500).json({ message: 'Server error while fetching departments' });
  }
});

// Get department by code
router.get('/:code', async (req, res) => {
  try {
    const { code } = req.params;
    
    const department = await Department.findOne({ code });
    if (!department) {
      return res.status(404).json({ message: 'Department not found' });
    }
    
    res.json(department);
  } catch (error) {
    console.error('Get department error:', error);
    res.status(500).json({ message: 'Server error while fetching department' });
  }
});

module.exports = router;
