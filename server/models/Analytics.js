
const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
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

module.exports = AnalyticsSchema;
