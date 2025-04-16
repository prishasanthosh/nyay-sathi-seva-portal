
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  BarChart,
  Activity,
  Search,
  Clock,
  CheckCircle,
  XCircle,
  RefreshCw,
  Filter,
  FileText,
  Plus,
  Eye,
} from 'lucide-react';
import { BarChart as Chart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type GrievanceStatus = 'pending' | 'in_progress' | 'resolved' | 'rejected';

interface Grievance {
  id: string;
  subject: string;
  department: string;
  category: string;
  status: GrievanceStatus;
  date: string;
}

const Dashboard = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample grievance data
  const grievances: Grievance[] = [
    {
      id: 'GR123456',
      subject: 'Water Supply Disruption in Neighborhood',
      department: 'Municipal Water Works Department',
      category: 'Water Supply',
      status: 'in_progress',
      date: '2025-04-10',
    },
    {
      id: 'GR654321',
      subject: 'Street Light Not Working',
      department: 'Electricity Department',
      category: 'Electricity',
      status: 'resolved',
      date: '2025-04-05',
    },
    {
      id: 'GR789123',
      subject: 'Garbage Collection Issue',
      department: 'Sanitation Department',
      category: 'Sanitation',
      status: 'pending',
      date: '2025-04-14',
    },
    {
      id: 'GR456789',
      subject: 'Road Repair Request',
      department: 'Public Works Department',
      category: 'Roads and Infrastructure',
      status: 'rejected',
      date: '2025-04-01',
    },
    {
      id: 'GR987654',
      subject: 'Public Park Maintenance',
      department: 'Parks and Recreation Department',
      category: 'Public Services',
      status: 'in_progress',
      date: '2025-04-08',
    },
  ];

  // Filter grievances based on search query
  const filteredGrievances = grievances.filter(
    (grievance) =>
      grievance.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      grievance.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get counts for dashboard stats
  const pendingCount = grievances.filter((g) => g.status === 'pending').length;
  const inProgressCount = grievances.filter((g) => g.status === 'in_progress').length;
  const resolvedCount = grievances.filter((g) => g.status === 'resolved').length;
  const rejectedCount = grievances.filter((g) => g.status === 'rejected').length;
  const totalCount = grievances.length;

  // Chart data
  const chartData = [
    { name: 'Pending', value: pendingCount, fill: '#F59E0B' },
    { name: 'In Progress', value: inProgressCount, fill: '#3B82F6' },
    { name: 'Resolved', value: resolvedCount, fill: '#10B981' },
    { name: 'Rejected', value: rejectedCount, fill: '#EF4444' },
  ];

  // Category breakdown data
  const categoryData = [
    { name: 'Water Supply', value: 1, fill: '#3B82F6' },
    { name: 'Electricity', value: 1, fill: '#F59E0B' },
    { name: 'Sanitation', value: 1, fill: '#8B5CF6' },
    { name: 'Roads', value: 1, fill: '#EC4899' },
    { name: 'Public Services', value: 1, fill: '#10B981' },
  ];

  const getStatusBadge = (status: GrievanceStatus) => {
    switch (status) {
      case 'pending':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" /> {t('pending')}
          </div>
        );
      case 'in_progress':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <RefreshCw className="h-3 w-3 mr-1" /> {t('in_progress')}
          </div>
        );
      case 'resolved':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" /> {t('resolved')}
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle className="h-3 w-3 mr-1" /> {t('rejected')}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('dashboard')}</h1>
              <p className="text-gray-600">Track and manage your grievances</p>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Link to="/grievances/new">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  {t('file_grievance')}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Grievances</p>
                    <h3 className="text-3xl font-bold mt-1">{totalCount}</h3>
                  </div>
                  <div className="bg-india-blue/10 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-india-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('pending')}</p>
                    <h3 className="text-3xl font-bold mt-1">{pendingCount}</h3>
                  </div>
                  <div className="bg-yellow-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('in_progress')}</p>
                    <h3 className="text-3xl font-bold mt-1">{inProgressCount}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <RefreshCw className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('resolved')}</p>
                    <h3 className="text-3xl font-bold mt-1">{resolvedCount}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500">{t('rejected')}</p>
                    <h3 className="text-3xl font-bold mt-1">{rejectedCount}</h3>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <XCircle className="h-6 w-6 text-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts and Tables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl text-india-blue">Grievance Status</CardTitle>
                <CardDescription>
                  Overview of your grievances by status
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <Chart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" radius={[4, 4, 0, 0]} />
                    </Chart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl text-india-blue">Categories</CardTitle>
                <CardDescription>
                  Breakdown by grievance category
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <Chart data={categoryData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <Tooltip />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} />
                    </Chart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Grievances List */}
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <CardTitle className="text-xl text-india-blue">{t('my_grievances')}</CardTitle>
                  <CardDescription>
                    View and manage all your submitted grievances
                  </CardDescription>
                </div>
                
                <div className="mt-4 md:mt-0 w-full md:w-auto">
                  <div className="flex space-x-2">
                    <div className="relative w-full md:w-64">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input 
                        placeholder="Search grievances..." 
                        className="pl-8"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="w-full mb-6">
                  <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                  <TabsTrigger value="pending" className="flex-1">Pending</TabsTrigger>
                  <TabsTrigger value="inProgress" className="flex-1">In Progress</TabsTrigger>
                  <TabsTrigger value="resolved" className="flex-1">Resolved</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('grievance_id')}</TableHead>
                          <TableHead>{t('subject')}</TableHead>
                          <TableHead className="hidden md:table-cell">{t('date_filed')}</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>{t('status')}</TableHead>
                          <TableHead className="text-right">{t('view_details')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGrievances.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              No grievances found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredGrievances.map((grievance) => (
                            <TableRow key={grievance.id}>
                              <TableCell className="font-medium">{grievance.id}</TableCell>
                              <TableCell className="max-w-[200px] truncate">
                                {grievance.subject}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {new Date(grievance.date).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="hidden md:table-cell">
                                {grievance.category}
                              </TableCell>
                              <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                              <TableCell className="text-right">
                                <Link to={`/grievances/track?id=${grievance.id}`}>
                                  <Button variant="ghost" size="sm">
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </Button>
                                </Link>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="pending">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('grievance_id')}</TableHead>
                          <TableHead>{t('subject')}</TableHead>
                          <TableHead className="hidden md:table-cell">{t('date_filed')}</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>{t('status')}</TableHead>
                          <TableHead className="text-right">{t('view_details')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGrievances.filter(g => g.status === 'pending').length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              No pending grievances found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredGrievances
                            .filter(g => g.status === 'pending')
                            .map((grievance) => (
                              <TableRow key={grievance.id}>
                                <TableCell className="font-medium">{grievance.id}</TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                  {grievance.subject}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {new Date(grievance.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {grievance.category}
                                </TableCell>
                                <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                                <TableCell className="text-right">
                                  <Link to={`/grievances/track?id=${grievance.id}`}>
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="inProgress">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('grievance_id')}</TableHead>
                          <TableHead>{t('subject')}</TableHead>
                          <TableHead className="hidden md:table-cell">{t('date_filed')}</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>{t('status')}</TableHead>
                          <TableHead className="text-right">{t('view_details')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGrievances.filter(g => g.status === 'in_progress').length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              No grievances in progress found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredGrievances
                            .filter(g => g.status === 'in_progress')
                            .map((grievance) => (
                              <TableRow key={grievance.id}>
                                <TableCell className="font-medium">{grievance.id}</TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                  {grievance.subject}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {new Date(grievance.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {grievance.category}
                                </TableCell>
                                <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                                <TableCell className="text-right">
                                  <Link to={`/grievances/track?id=${grievance.id}`}>
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="resolved">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>{t('grievance_id')}</TableHead>
                          <TableHead>{t('subject')}</TableHead>
                          <TableHead className="hidden md:table-cell">{t('date_filed')}</TableHead>
                          <TableHead className="hidden md:table-cell">Category</TableHead>
                          <TableHead>{t('status')}</TableHead>
                          <TableHead className="text-right">{t('view_details')}</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredGrievances.filter(g => g.status === 'resolved').length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              No resolved grievances found
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredGrievances
                            .filter(g => g.status === 'resolved')
                            .map((grievance) => (
                              <TableRow key={grievance.id}>
                                <TableCell className="font-medium">{grievance.id}</TableCell>
                                <TableCell className="max-w-[200px] truncate">
                                  {grievance.subject}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {new Date(grievance.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="hidden md:table-cell">
                                  {grievance.category}
                                </TableCell>
                                <TableCell>{getStatusBadge(grievance.status)}</TableCell>
                                <TableCell className="text-right">
                                  <Link to={`/grievances/track?id=${grievance.id}`}>
                                    <Button variant="ghost" size="sm">
                                      <Eye className="h-4 w-4 mr-1" />
                                      View
                                    </Button>
                                  </Link>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
