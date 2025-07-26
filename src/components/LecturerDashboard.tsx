
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  ArrowLeft, 
  Plus, 
  Calendar, 
  Users, 
  Bell, 
  BookOpen,
  Settings,
  BarChart3,
  Clock,
  Send
} from 'lucide-react';
import { toast } from 'sonner';

interface LecturerDashboardProps {
  onBack: () => void;
}

const LecturerDashboard = ({ onBack }: LecturerDashboardProps) => {
  const [showNewLecture, setShowNewLecture] = useState(false);
  const [lectures, setLectures] = useState([
    {
      id: 1,
      title: 'Introduction to React',
      subject: 'Web Development',
      date: '2024-07-28',
      time: '10:00',
      students: 24,
      status: 'scheduled'
    },
    {
      id: 2,
      title: 'Database Design',
      subject: 'Computer Science',
      date: '2024-07-29',
      time: '14:00',
      students: 18,
      status: 'completed'
    }
  ]);

  const [newLecture, setNewLecture] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    description: '',
    recurring: false
  });

  const handleAddLecture = () => {
    if (!newLecture.title || !newLecture.date || !newLecture.time) {
      toast.error('Please fill in all required fields');
      return;
    }

    const lecture = {
      id: lectures.length + 1,
      ...newLecture,
      students: 0,
      status: 'scheduled'
    };

    setLectures([...lectures, lecture]);
    setNewLecture({ title: '', subject: '', date: '', time: '', description: '', recurring: false });
    setShowNewLecture(false);
    toast.success('Lecture scheduled successfully! Students will be notified.');
  };

  const sendNotification = (lectureTitle: string) => {
    toast.success(`Notification sent to all students for "${lectureTitle}"`);
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
                <h1 className="text-2xl font-bold text-gray-900">Lecturer Dashboard</h1>
                <p className="text-gray-600">Prof. Sarah Johnson</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-3xl font-bold text-blue-600">142</p>
                </div>
                <Users className="w-10 h-10 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">This Week</p>
                  <p className="text-3xl font-bold text-green-600">8</p>
                </div>
                <Calendar className="w-10 h-10 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Notifications Sent</p>
                  <p className="text-3xl font-bold text-purple-600">27</p>
                </div>
                <Bell className="w-10 h-10 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg. Attendance</p>
                  <p className="text-3xl font-bold text-orange-600">89%</p>
                </div>
                <BarChart3 className="w-10 h-10 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lectures Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="w-5 h-5" />
                    <span>Upcoming Lectures</span>
                  </CardTitle>
                  <Button 
                    onClick={() => setShowNewLecture(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Schedule Lecture
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lectures.map((lecture) => (
                    <div key={lecture.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-lg">{lecture.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          lecture.status === 'scheduled' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {lecture.status}
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600 text-sm space-x-4 mb-3">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {lecture.date}
                        </span>
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {lecture.time}
                        </span>
                        <span className="flex items-center">
                          <Users className="w-4 h-4 mr-1" />
                          {lecture.students} students
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{lecture.subject}</p>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => sendNotification(lecture.title)}
                        >
                          <Send className="w-3 h-3 mr-1" />
                          Notify Students
                        </Button>
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Send Announcement
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Students
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Database Design lecture completed</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Notification sent to 24 students</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>New student joined React course</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* New Lecture Modal */}
      {showNewLecture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Schedule New Lecture</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Lecture Title</Label>
                <Input
                  id="title"
                  value={newLecture.title}
                  onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
                  placeholder="Enter lecture title"
                />
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newLecture.subject}
                  onChange={(e) => setNewLecture({ ...newLecture, subject: e.target.value })}
                  placeholder="Enter subject"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newLecture.date}
                    onChange={(e) => setNewLecture({ ...newLecture, date: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newLecture.time}
                    onChange={(e) => setNewLecture({ ...newLecture, time: e.target.value })}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newLecture.description}
                  onChange={(e) => setNewLecture({ ...newLecture, description: e.target.value })}
                  placeholder="Enter lecture description"
                  rows={3}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowNewLecture(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLecture} className="bg-blue-600 hover:bg-blue-700">
                  Schedule Lecture
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LecturerDashboard;
