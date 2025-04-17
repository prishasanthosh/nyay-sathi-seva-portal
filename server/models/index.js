
const mongoose = require('mongoose');
const UserSchema = require('./User');
const GrievanceSchema = require('./Grievance');
const DepartmentSchema = require('./Department');
const AnalyticsSchema = require('./Analytics');

// Create models
const User = mongoose.model('User', UserSchema);
const Grievance = mongoose.model('Grievance', GrievanceSchema);
const Department = mongoose.model('Department', DepartmentSchema);
const Analytics = mongoose.model('Analytics', AnalyticsSchema);

module.exports = {
  User,
  Grievance,
  Department,
  Analytics
};
