
/**
 * MongoDB Schema Models
 * TypeScript interfaces representing the database schema
 */

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string; // Hashed password
  phone?: string;
  address?: string;
  state?: string;
  district?: string;
  role: 'citizen' | 'department_admin' | 'super_admin';
  department?: string; // For department_admin
  createdAt: Date;
  updatedAt: Date;
}

export interface IGrievance {
  _id?: string;
  trackingId: string; // Unique ID for public tracking
  userId: string; // Reference to the user who submitted
  subject: string;
  description: string;
  originalLanguage: string; // 'en', 'hi', 'ta'
  translatedDescription?: string; // English translation if original is not English
  
  // NLP Analysis Results
  department: string;
  tags: string[]; // Keywords extracted
  sentimentScore: number;
  urgency: 'low' | 'medium' | 'high';
  confidenceScore: number;
  
  // Similar complaints
  similarGrievances?: string[]; // IDs of similar grievances
  
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  assignedTo?: string; // User ID of department admin
  
  attachments?: IAttachment[];
  
  comments: IComment[];
  
  statusHistory: IStatusUpdate[];
  
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttachment {
  _id?: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: Date;
}

export interface IComment {
  _id?: string;
  userId: string; // Who made the comment
  userRole: 'citizen' | 'department_admin' | 'super_admin';
  text: string;
  createdAt: Date;
}

export interface IStatusUpdate {
  status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
  updatedBy: string; // User ID who updated
  updatedByRole: 'department_admin' | 'super_admin';
  comments?: string;
  updatedAt: Date;
}

export interface IDepartment {
  _id?: string;
  name: string;
  code: string; // Short code like 'WATER', 'ELEC'
  description: string;
  contactEmail: string;
  contactPhone?: string;
  adminUsers: string[]; // User IDs with admin access
  createdAt: Date;
  updatedAt: Date;
}

export interface IAnalytics {
  _id?: string;
  date: Date;
  totalGrievances: number;
  resolvedGrievances: number;
  pendingGrievances: number;
  inProgressGrievances: number;
  rejectedGrievances: number;
  
  departmentStats: {
    department: string;
    count: number;
    resolved: number;
    avgResolutionTime: number; // In hours
  }[];
  
  sentimentDistribution: {
    positive: number;
    neutral: number;
    negative: number;
  };
  
  urgencyDistribution: {
    low: number;
    medium: number;
    high: number;
  };
  
  languageDistribution: {
    en: number;
    hi: number;
    ta: number;
  };
}
