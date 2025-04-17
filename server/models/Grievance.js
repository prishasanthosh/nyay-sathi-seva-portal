
const mongoose = require('mongoose');

// Attachment Schema
const AttachmentSchema = new mongoose.Schema({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// Comment Schema
const CommentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  userRole: { 
    type: String, 
    enum: ['citizen', 'department_admin', 'super_admin'], 
    required: true 
  },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Status Update Schema
const StatusUpdateSchema = new mongoose.Schema({
  status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'resolved', 'rejected'], 
    required: true 
  },
  updatedBy: { type: String, required: true },
  updatedByRole: { 
    type: String, 
    enum: ['department_admin', 'super_admin'], 
    required: true 
  },
  comments: { type: String },
  updatedAt: { type: Date, default: Date.now }
});

// Grievance Schema
const GrievanceSchema = new mongoose.Schema({
  trackingId: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  subject: { type: String, required: true },
  description: { type: String, required: true },
  originalLanguage: { type: String, required: true }, // 'en', 'hi', 'ta'
  translatedDescription: { type: String },
  
  // NLP Analysis Results
  department: { type: String, required: true },
  tags: [{ type: String }],
  sentimentScore: { type: Number },
  urgency: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium' 
  },
  confidenceScore: { type: Number },
  
  // Similar complaints
  similarGrievances: [{ type: String }],
  
  status: { 
    type: String, 
    enum: ['pending', 'in_progress', 'resolved', 'rejected'], 
    default: 'pending' 
  },
  assignedTo: { type: String },
  
  attachments: [AttachmentSchema],
  
  comments: [CommentSchema],
  
  statusHistory: [StatusUpdateSchema],
  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = GrievanceSchema;
