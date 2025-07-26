
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
  Plus,
  Menu
} from 'lucide-react';
import { toast } from 'sonner';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

interface MobileStudentDashboardProps {
  onBack: () => void;
}

const MobileStudentDashboard = ({ onBack }: MobileStudentDashboardProps) => {
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
    <div className="min-h-screen bg-gray-50 pb-safe">
      {/* Mobile Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" onClick={onBack} size="sm" className="p-2">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">LecturePing</h1>
                <p className="text-xs text-gray-600">Alex Thompson</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Button variant="ghost" size="sm">
                  <Bell className="w-4 h-4" />
                </Button>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
              
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="w-5 h-5" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader>
                    <DrawerTitle>Menu</DrawerTitle>
                  </DrawerHeader>
                  <div className="px-4 pb-6 space-y-2">
                    <Button className="w-full justify-start" variant="ghost">
                      <Settings className="w-4 h-4 mr-3" />
                      Settings
                    </Button>
                    <div className="flex items-center justify-between p-2">
                      <span className="flex items-center">
                        <Bell className="w-4 h-4 mr-3" />
                        Push Notifications
                      </span>
                      <Switch 
                        checked={notificationsEnabled}
                        onCheckedChange={setNotificationsEnabled}
                      />
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Courses</p>
                <p className="text-xl font-bold text-blue-600">{courses.length}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Calendar className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">This Week</p>
                <p className="text-xl font-bold text-green-600">6</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <CheckCircle className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Attendance</p>
                <p className="text-xl font-bold text-purple-600">94%</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <AlertCircle className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Unread</p>
                <p className="text-xl font-bold text-orange-600">3</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Join Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowJoinCourse(true)}
            className="bg-green-600 hover:bg-green-700 rounded-full px-8 py-3 shadow-lg"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Join Course
          </Button>
        </div>

        {/* Today's Schedule */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Calendar className="w-5 h-5" />
              <span>Today's Schedule</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingLectures.slice(0, 2).map((lecture) => (
                <div key={lecture.id} className="p-4 border rounded-lg bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-base">{lecture.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      lecture.status === 'upcoming' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-green-100 text-green-700'
                    }`}>
                      {lecture.status === 'upcoming' ? 'Upcoming' : 'Reminder Set'}
                    </span>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Clock className="w-4 h-4 mr-2" />
                      {lecture.time}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      {lecture.room}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {lecture.course}
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm"
                      onClick={() => markAttendance(lecture.title)}
                      className="bg-green-600 hover:bg-green-700 flex-1"
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Mark Attendance
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Set Reminder
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* My Courses */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">My Courses</CardTitle>
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
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Recent Notifications</CardTitle>
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
      </main>

      {/* Mobile Join Course Modal */}
      {showJoinCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-0 z-50">
          <div className="w-full bg-white rounded-t-xl">
            <div className="sticky top-0 bg-white border-b px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Join a Course</h2>
                <Button variant="ghost" onClick={() => setShowJoinCourse(false)}>
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-6">
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
              
              <div className="flex space-x-2 pb-safe">
                <Button variant="outline" onClick={() => setShowJoinCourse(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleJoinCourse} className="bg-green-600 hover:bg-green-700 flex-1">
                  Join Course
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileStudentDashboard;
