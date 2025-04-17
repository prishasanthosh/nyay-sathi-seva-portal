
import axios from 'axios';

// Create axios instance
const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth API
export const authAPI = {
  register: async (userData: any) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
  
  login: async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },
  
  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },
  
  updateProfile: async (userData: any) => {
    const response = await api.put('/auth/profile', userData);
    return response.data;
  }
};

// Grievance API
export const grievanceAPI = {
  submitGrievance: async (grievanceData: any) => {
    const response = await api.post('/grievances', grievanceData);
    return response.data;
  },
  
  getMyGrievances: async () => {
    const response = await api.get('/grievances/my-grievances');
    return response.data;
  },
  
  trackGrievance: async (trackingId: string) => {
    const response = await api.get(`/grievances/track/${trackingId}`);
    return response.data;
  },
  
  addComment: async (grievanceId: string, text: string) => {
    const response = await api.post(`/grievances/${grievanceId}/comments`, { text });
    return response.data;
  },
  
  updateStatus: async (grievanceId: string, status: string, comments: string) => {
    const response = await api.put(`/grievances/${grievanceId}/status`, { status, comments });
    return response.data;
  }
};

// Department API
export const departmentAPI = {
  getAllDepartments: async () => {
    const response = await api.get('/departments');
    return response.data;
  },
  
  getDepartmentByCode: async (code: string) => {
    const response = await api.get(`/departments/${code}`);
    return response.data;
  }
};

export default api;
