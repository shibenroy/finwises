
import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Trophy, 
  Star, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  Zap,
  Award,
  Brain,
  FileText
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFinance } from '@/contexts/FinanceContext';
import { useToast } from '@/hooks/use-toast';

const FinancialEducation = () => {
  const { state, dispatch } = useFinance();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('courses');

  const handleCourseAction = (courseId: string, action: string) => {
    const course = state.courses.find(c => c.id === courseId);
    if (!course) return;

    if (action === 'continue' && course.progress < 100) {
      const newProgress = Math.min(course.progress + 25, 100);
      dispatch({ 
        type: 'UPDATE_COURSE_PROGRESS', 
        payload: { courseId, progress: newProgress } 
      });
      
      toast({
        title: "Progress Updated",
        description: `Course progress: ${newProgress}%`,
      });
    } else if (action === 'review') {
      toast({
        title: "Course Review",
        description: "Opening course review mode...",
      });
    }
  };

  const courses = [
    {
      id: '1',
      title: 'Introduction to Personal Finance',
      description: 'Learn the basics of managing your money, budgeting, and financial planning.',
      duration: '2 hours',
      level: 'Beginner',
      progress: 0,
      rating: 4.8,
      students: 1250,
      modules: 6,
      completed: 0,
      thumbnail: '💰',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Saving and Investment Basics',
      description: 'Understand different saving options and basic investment principles.',
      duration: '3 hours',
      level: 'Beginner',
      progress: 0,
      rating: 4.7,
      students: 980,
      modules: 8,
      completed: 0,
      thumbnail: '📈',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Understanding Credit and Loans',
      description: 'Learn about credit scores, loans, and responsible borrowing.',
      duration: '1.5 hours',
      level: 'Beginner',
      progress: 0,
      rating: 4.6,
      students: 750,
      modules: 4,
      completed: 0,
      thumbnail: '🏦',
      status: 'in-progress'
    }
  ];

  const articles = [
    {
      id: 1,
      title: 'How to Create Your First Budget',
      category: 'Budgeting',
      readTime: '5 min',
      content: 'A budget is a plan for your money. Start by listing your income and expenses...',
      trending: true
    },
    {
      id: 2,
      title: 'Emergency Fund: Why You Need One',
      category: 'Saving',
      readTime: '4 min',
      content: 'An emergency fund is money set aside for unexpected expenses...',
      trending: false
    },
    {
      id: 3,
      title: 'Understanding Interest Rates',
      category: 'Loans',
      readTime: '6 min',
      content: 'Interest rates determine how much you pay for borrowing money...',
      trending: true
    },
    {
      id: 4,
      title: 'Simple Investment Tips for Beginners',
      category: 'Investment',
      readTime: '7 min',
      content: 'Investing can help your money grow over time. Start with these basics...',
      trending: false
    }
  ];

  const userStats = {
    coursesCompleted: 0,
    totalHours: 0,
    streakDays: 1,
    rank: 'Bronze',
    points: 100
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Education</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Learn and improve your financial knowledge</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{userStats.points}</div>
            <div className="text-sm text-gray-500">Points</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{userStats.streakDays}</div>
            <div className="text-sm text-gray-500">Day Streak</div>
          </div>
          <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white">
            {userStats.rank} Member
          </Badge>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Courses Available</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <Trophy className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Articles</p>
                <p className="text-2xl font-bold">{articles.length}</p>
              </div>
              <FileText className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Your Streak</p>
                <p className="text-2xl font-bold">{userStats.streakDays} days</p>
              </div>
              <Zap className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100 text-sm">Points</p>
                <p className="text-2xl font-bold">{userStats.points}</p>
              </div>
              <Award className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="courses">Courses</TabsTrigger>
          <TabsTrigger value="articles">Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-4xl">{course.thumbnail}</div>
                    <Badge className={getLevelColor(course.level)}>
                      {course.level}
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{course.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{course.description}</p>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students} students</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Progress</span>
                      <span>{course.completed}/{course.modules} modules</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      {course.modules} modules
                    </div>
                    <Button 
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      onClick={() => handleCourseAction(course.id, 'continue')}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Start Learning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="secondary">{article.category}</Badge>
                    {article.trending && (
                      <Badge className="bg-red-100 text-red-800">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{article.content}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </span>
                    <Button variant="outline" size="sm">
                      <FileText className="w-4 h-4 mr-2" />
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialEducation;
