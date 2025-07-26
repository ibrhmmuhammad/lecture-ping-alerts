
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
  Send,
  Menu
} from 'lucide-react';
import { toast } from 'sonner';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from '@/components/ui/drawer';

interface MobileLecturerDashboardProps {
  onBack: () => void;
}

const MobileLecturerDashboard = ({ onBack }: MobileLecturerDashboardProps) => {
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
                <p className="text-xs text-gray-600">Prof. Sarah Johnson</p>
              </div>
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
                  <Button className="w-full justify-start" variant="ghost">
                    <BarChart3 className="w-4 h-4 mr-3" />
                    Analytics
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <Bell className="w-4 h-4 mr-3" />
                    Notifications
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </header>

      <main className="px-4 py-4 space-y-6">
        {/* Stats Grid - Mobile Optimized */}
        <div className="grid grid-cols-2 gap-3">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Users className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Students</p>
                <p className="text-xl font-bold text-blue-600">142</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Calendar className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">This Week</p>
                <p className="text-xl font-bold text-green-600">8</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <Bell className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Notifications</p>
                <p className="text-xl font-bold text-purple-600">27</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <BarChart3 className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                <p className="text-xs text-gray-600">Attendance</p>
                <p className="text-xl font-bold text-orange-600">89%</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Add Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowNewLecture(true)}
            className="bg-blue-600 hover:bg-blue-700 rounded-full px-8 py-3 shadow-lg"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Schedule Lecture
          </Button>
        </div>

        {/* Lectures List */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <BookOpen className="w-5 h-5" />
              <span>Upcoming Lectures</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lectures.map((lecture) => (
                <div key={lecture.id} className="p-4 border rounded-lg bg-white">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-base">{lecture.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      lecture.status === 'scheduled' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {lecture.status}
                    </span>
                  </div>
                  
                  <div className="space-y-1 mb-3">
                    <div className="flex items-center text-gray-600 text-sm">
                      <Calendar className="w-4 h-4 mr-2" />
                      {lecture.date} at {lecture.time}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      {lecture.students} students enrolled
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => sendNotification(lecture.title)}
                      className="flex-1"
                    >
                      <Send className="w-3 h-3 mr-1" />
                      Notify
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Mobile New Lecture Modal */}
      {showNewLecture && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center p-0 z-50">
          <div className="w-full bg-white rounded-t-xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b px-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Schedule New Lecture</h2>
                <Button variant="ghost" onClick={() => setShowNewLecture(false)}>
                  ✕
                </Button>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div>
                <Label htmlFor="title" className="text-sm font-medium">Lecture Title</Label>
                <Input
                  id="title"
                  value={newLecture.title}
                  onChange={(e) => setNewLecture({ ...newLecture, title: e.target.value })}
                  placeholder="Enter lecture title"
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                <Input
                  id="subject"
                  value={newLecture.subject}
                  onChange={(e) => setNewLecture({ ...newLecture, subject: e.target.value })}
                  placeholder="Enter subject"
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newLecture.date}
                    onChange={(e) => setNewLecture({ ...newLecture, date: e.target.value })}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={newLecture.time}
                    onChange={(e) => setNewLecture({ ...newLecture, time: e.target.value })}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                <Textarea
                  id="description"
                  value={newLecture.description}
                  onChange={(e) => setNewLecture({ ...newLecture, description: e.target.value })}
                  placeholder="Enter lecture description"
                  rows={3}
                  className="mt-1"
                />
              </div>
              
              <div className="flex space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowNewLecture(false)} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={handleAddLecture} className="bg-blue-600 hover:bg-blue-700 flex-1">
                  Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileLecturerDashboard;
