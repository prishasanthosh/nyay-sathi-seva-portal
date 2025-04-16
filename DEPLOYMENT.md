
# Nyay Sathi Seva Portal - Deployment Guide

This document provides step-by-step instructions for deploying the Nyay Sathi Seva Portal application.

## Prerequisites

Before you begin, ensure you have the following:

1. MongoDB Atlas account (or local MongoDB installation)
2. Node.js and npm installed
3. Git installed

## Step 1: Set Up MongoDB

1. **Create a MongoDB Atlas Account** (Recommended for production)
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account
   - Create a new cluster
   - Set up database access (username and password)
   - Set up network access (IP whitelist)
   - Get your connection string

2. **For Local Development**
   - Install MongoDB Community Edition
   - Start the MongoDB service
   - Connection string will be: `mongodb://localhost:27017/nyay_sathi`

## Step 2: Clone and Set Up the Repository

1. Clone the repository:
   ```
   git clone <repository-url>
   cd nyay-sathi-seva-portal
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=<your-mongodb-connection-string>
   NODE_ENV=production
   PORT=3000
   ```

## Step 3: Build the Application

1. Build the frontend React application:
   ```
   npm run build
   ```

2. This will create a `dist` folder with the compiled application.

## Step 4: Deploy the Application

### Option 1: Deploy to Netlify (Static Frontend)

1. Create a `netlify.toml` file in the root directory:
   ```toml
   [build]
     publish = "dist"
     command = "npm run build"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. Deploy to Netlify:
   - Sign up for Netlify
   - Connect your repository
   - Configure build settings
   - Set environment variables
   - Deploy

### Option 2: Deploy to Vercel

1. Install Vercel CLI:
   ```
   npm install -g vercel
   ```

2. Deploy to Vercel:
   ```
   vercel
   ```

3. Follow the prompts and link your project.

### Option 3: Deploy to a VPS or Traditional Hosting

1. Set up a Node.js server:

   Create a `server.js` file:
   ```javascript
   const express = require('express');
   const path = require('path');
   const connectDB = require('./server/connection');
   
   const app = express();
   const PORT = process.env.PORT || 3000;
   
   // Connect to MongoDB
   connectDB();
   
   // Middleware
   app.use(express.json());
   
   // Serve static files
   app.use(express.static(path.join(__dirname, 'dist')));
   
   // API routes would go here
   
   // Serve the React app for any other requests
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
   });
   
   app.listen(PORT, () => {
     console.log(`Server running on port ${PORT}`);
   });
   ```

2. Start the server:
   ```
   node server.js
   ```

## Step 5: Set Up Continuous Integration/Deployment (Optional)

1. Configure GitHub Actions for CI/CD:
   - Create a `.github/workflows/deploy.yml` file
   - Set up workflow to test, build, and deploy on changes to main branch

## Step 6: Post-Deployment Tasks

1. **Set up monitoring** using tools like:
   - Sentry for error tracking
   - Google Analytics for usage tracking
   - Uptime Robot for monitoring

2. **Configure backups**:
   - Set up regular database backups
   - Store backups securely

3. **SSL Certificate**:
   - If you're not using Netlify, Vercel, or another platform with automatic SSL,
     set up an SSL certificate using Let's Encrypt or similar service

## Troubleshooting

If you encounter issues:

1. Check the server logs
2. Ensure MongoDB connection is working
3. Verify environment variables are set correctly
4. Check for errors in the browser console

## Updating the Application

To update the deployed application:

1. Pull the latest changes
2. Install any new dependencies
3. Build the application
4. Deploy the application

For continuous deployment setups, pushing to the main branch should trigger automatic updates.
