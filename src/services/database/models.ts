
import mongoose, { Schema, Document } from 'mongoose';
import type { 
  IUser, 
  IGrievance, 
  IAttachment, 
  IComment, 
  IStatusUpdate, 
  IDepartment, 
  IAnalytics 
} from '@/models/schema';

// User Schema
const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
  phone: { type: String },
  address: { type: String },
  state: { type: String },
  district: { type: String },
  role: { 
    type: String, 
    enum: ['citizen', 'department_admin', 'super_admin'], 
    default: 'citizen' 
  },
  department: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Attachment Schema
const AttachmentSchema = new Schema<IAttachment>({
  fileName: { type: String, required: true },
  fileType: { type: String, required: true },
  fileSize: { type: Number, required: true },
  url: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

// Comment Schema
const CommentSchema = new Schema<IComment>({
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
const StatusUpdateSchema = new Schema<IStatusUpdate>({
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
const GrievanceSchema = new Schema<IGrievance>({
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

// Department Schema
const DepartmentSchema = new Schema<IDepartment>({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  contactEmail: { type: String, required: true },
  contactPhone: { type: String },
  adminUsers: [{ type: String }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Analytics Schema
const AnalyticsSchema = new Schema<IAnalytics>({
  date: { type: Date, required: true },
  totalGrievances: { type: Number, default: 0 },
  resolvedGrievances: { type: Number, default: 0 },
  pendingGrievances: { type: Number, default: 0 },
  inProgressGrievances: { type: Number, default: 0 },
  rejectedGrievances: { type: Number, default: 0 },
  
  departmentStats: [{
    department: { type: String },
    count: { type: Number },
    resolved: { type: Number },
    avgResolutionTime: { type: Number }
  }],
  
  sentimentDistribution: {
    positive: { type: Number, default: 0 },
    neutral: { type: Number, default: 0 },
    negative: { type: Number, default: 0 }
  },
  
  urgencyDistribution: {
    low: { type: Number, default: 0 },
    medium: { type: Number, default: 0 },
    high: { type: Number, default: 0 }
  },
  
  languageDistribution: {
    en: { type: Number, default: 0 },
    hi: { type: Number, default: 0 },
    ta: { type: Number, default: 0 }
  }
});

// Create models if mongoose is available
export const getModels = () => {
  if (!mongoose.models) {
    return null;
  }
  
  try {
    return {
      User: mongoose.models.User || mongoose.model('User', UserSchema),
      Grievance: mongoose.models.Grievance || mongoose.model('Grievance', GrievanceSchema),
      Department: mongoose.models.Department || mongoose.model('Department', DepartmentSchema),
      Analytics: mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema)
    };
  } catch (error) {
    console.error('Error creating Mongoose models:', error);
    return null;
  }
};
