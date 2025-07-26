
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  ArrowLeft, 
  Bell, 
  Calendar, 
  Clock, 
  BookOpen,
  Settings,
  QrCode,
  MapPin,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';

interface StudentDashboardProps {
  onBack: () => void;
}

const StudentDashboard = ({ onBack }: StudentDashboardProps) => {
  const [showJoinCourse, setShowJoinCourse] = useState(false);
  const [courseCode, setCourseCode] = useState('');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const [courses] = useState([
    {
      id: 1,
      name: 'Web Development',
      code: 'CS301',
      lecturer: 'Prof. Sarah Johnson',
      color: 'blue'
    },
    {
      id: 2,
      name: 'Database Systems',
      code: 'CS401',
      lecturer: 'Dr. Michael Chen',
      color: 'green'
    }
  ]);

  const [upcomingLectures] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      course: 'Web Development',
      date: '2024-07-28',
      time: '10:00',
      room: 'Room 205',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Database Design Principles',
      course: 'Database Systems',
      date: '2024-07-28',
      time: '14:00',
      room: 'Room 301',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'React Hooks Deep Dive',
      course: 'Web Development',
      date: '2024-07-29',
      time: '10:00',
      room: 'Room 205',
      status: 'reminder-set'
    }
  ]);

  const [notifications] = useState([
    {
      id: 1,
      title: 'Lecture Starting Soon',
      message: 'Introduction to React starts in 30 minutes (Room 205)',
      time: '9:30 AM',
      type: 'reminder',
      read: false
    },
    {
      id: 2,
      title: 'Schedule Update',
      message: 'Database Design lecture moved to Room 301',
      time: 'Yesterday',
      type: 'update',
      read: true
    },
    {
      id: 3,
      title: 'New Course Material',
      message: 'React documentation uploaded to course portal',
      time: '2 days ago',
      type: 'info',
      read: true
    }
  ]);

  const handleJoinCourse = () => {
    if (!courseCode) {
      toast.error('Please enter a course code');
      return;
    }
    
    toast.success(`Successfully joined course: ${courseCode}`);
    setCourseCode('');
    setShowJoinCourse(false);
  };

  const markAttendance = (lectureTitle: string) => {
    toast.success(`Attendance marked for "${lectureTitle}"`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Student Dashboard</h1>
                <p className="text-gray-600">Alex Thompson</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <div className="relative">
                <Button variant="outline" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Courses Enrolled</p>
                  <p className="text-3xl font-bold text-blue-600">{courses.length}</p>
                </div>
                <BookOpen className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-3xl font-bold text-green-600">6</p>
                </div>
                <Calendar className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                  <p className="text-3xl font-bold text-purple-600">94%</p>
                </div>
                <CheckCircle className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Unread Alerts</p>
                  <p className="text-3xl font-bold text-orange-600">3</p>
                </div>
                <AlertCircle className="w-10 h-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="w-5 h-5" />
                    <span>Today's Schedule</span>
                  </CardTitle>
                  <Button 
                    onClick={() => setShowJoinCourse(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Join Course
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingLectures.map((lecture) => (
                    <div key={lecture.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{lecture.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          lecture.status === 'upcoming' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {lecture.status === 'upcoming' ? 'Upcoming' : 'Reminder Set'}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {lecture.time}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {lecture.room}
                        </span>
                        <span className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-1" />
                          {lecture.course}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm"
                          onClick={() => markAttendance(lecture.title)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Mark Attendance
                        </Button>
                        <Button variant="outline" size="sm">
                          Set Reminder
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div>
            {/* Notification Settings */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Push Notifications</span>
                  <Switch 
                    checked={notificationsEnabled}
                    onCheckedChange={setNotificationsEnabled}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span>Email Alerts</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span>30min Reminders</span>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            {/* My Courses */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>My Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {courses.map((course) => (
                    <div key={course.id} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{course.name}</h4>
                          <p className="text-sm text-gray-600">{course.code}</p>
                          <p className="text-sm text-gray-500">{course.lecturer}</p>
                        </div>
                        <div className={`w-3 h-3 rounded-full bg-${course.color}-500`}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {notifications.map((notification) => (
                    <div 
                      key={notification.id} 
                      className={`p-3 rounded-lg border ${
                        !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-1">
                        <h5 className="font-medium text-sm">{notification.title}</h5>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1"></div>
                        )}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{notification.message}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Join Course Modal */}
      {showJoinCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Join a Course</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Course Code</label>
                <Input
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  placeholder="Enter course code (e.g., CS301)"
                />
              </div>
              <div className="text-center py-4">
                <p className="text-gray-600 mb-4">Or scan QR code</p>
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-lg">
                  <QrCode className="w-8 h-8 text-gray-400" />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowJoinCourse(false)}>
                  Cancel
                </Button>
                <Button onClick={handleJoinCourse} className="bg-green-600 hover:bg-green-700">
                  Join Course
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
