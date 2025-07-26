import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GraduationCap, Users, Bell, Calendar } from 'lucide-react';
import LecturerDashboard from '@/components/LecturerDashboard';
import StudentDashboard from '@/components/StudentDashboard';
import MobileLecturerDashboard from '@/components/MobileLecturerDashboard';
import MobileStudentDashboard from '@/components/MobileStudentDashboard';

const Index = () => {
  const [userRole, setUserRole] = useState<'lecturer' | 'student' | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (userRole === 'lecturer') {
    return isMobile ? 
      <MobileLecturerDashboard onBack={() => setUserRole(null)} /> : 
      <LecturerDashboard onBack={() => setUserRole(null)} />;
  }

  if (userRole === 'student') {
    return isMobile ? 
      <MobileStudentDashboard onBack={() => setUserRole(null)} /> : 
      <StudentDashboard onBack={() => setUserRole(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Bell className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">LecturePing</h1>
              <p className="text-gray-600">Never miss a lecture again</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-6">
            Real-time Lecture Notifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Connect lecturers and students with instant notifications, scheduling, 
            and attendance tracking. Choose your role to get started.
          </p>
        </div>

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-blue-300"
            onClick={() => setUserRole('lecturer')}
          >
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">I'm a Lecturer</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Schedule lectures, send notifications, and track engagement with your students.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Access Lecturer Dashboard
              </Button>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105 border-2 hover:border-green-300"
            onClick={() => setUserRole('student')}
          >
            <CardHeader className="text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl">I'm a Student</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-6">
                Receive lecture alerts, view your schedule, and never miss important updates.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Access Student Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Bell className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle className="text-lg">Push Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Real-time alerts for lecture updates, schedule changes, and reminders.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle className="text-lg">Smart Scheduling</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Intuitive calendar view with one-time and recurring lecture support.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg">Easy Enrollment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Join courses with simple codes or automatic enrollment systems.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
              <p className="text-gray-600">Notification Delivery Rate</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">45min</div>
              <p className="text-gray-600">Average Setup Time</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">24/7</div>
              <p className="text-gray-600">Real-time Monitoring</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 LecturePing. Connecting education through technology.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
