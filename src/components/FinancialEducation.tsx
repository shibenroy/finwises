import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Trophy, 
  Star, 
  Clock, 
  Users, 
  TrendingUp,
  Target,
  CheckCircle,
  Lock,
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
import QuizModal from './QuizModal';

const FinancialEducation = () => {
  const { state, dispatch } = useFinance();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('courses');
  const [showQuiz, setShowQuiz] = useState(false);

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

  const startQuiz = () => {
    setShowQuiz(true);
  };

  const courses = [
    {
      id: '1',
      title: 'Budgeting Basics for Beginners',
      description: 'Learn the fundamentals of creating and maintaining a budget',
      duration: '2 hours',
      level: 'Beginner',
      progress: 75,
      rating: 4.8,
      students: 1250,
      modules: 6,
      completed: 4,
      thumbnail: '💰',
      status: 'in-progress'
    },
    {
      id: '2',
      title: 'Investment Fundamentals',
      description: 'Understanding stocks, bonds, and mutual funds',
      duration: '3 hours',
      level: 'Intermediate',
      progress: 30,
      rating: 4.9,
      students: 980,
      modules: 8,
      completed: 2,
      thumbnail: '📈',
      status: 'in-progress'
    },
    {
      id: '3',
      title: 'Credit Score Mastery',
      description: 'How to build and maintain an excellent credit score',
      duration: '1.5 hours',
      level: 'Beginner',
      progress: 100,
      rating: 4.7,
      students: 2100,
      modules: 4,
      completed: 4,
      thumbnail: '🏆',
      status: 'completed'
    },
    {
      id: '4',
      title: 'Advanced Trading Strategies',
      description: 'Technical analysis and trading psychology',
      duration: '4 hours',
      level: 'Advanced',
      progress: 0,
      rating: 4.6,
      students: 650,
      modules: 10,
      completed: 0,
      thumbnail: '📊',
      status: 'locked'
    }
  ];

  const articles = [
    {
      id: 1,
      title: '5 Common Budgeting Mistakes to Avoid',
      category: 'Budgeting',
      readTime: '5 min',
      author: 'Priya Sharma',
      date: '2 days ago',
      thumbnail: '📝',
      trending: true
    },
    {
      id: 2,
      title: 'How to Start Investing with ₹1,000',
      category: 'Investment',
      readTime: '7 min',
      author: 'Rahul Verma',
      date: '1 week ago',
      thumbnail: '💎',
      trending: false
    },
    {
      id: 3,
      title: 'Understanding EMI vs Interest Rates',
      category: 'Loans',
      readTime: '6 min',
      author: 'Anjali Patel',
      date: '3 days ago',
      thumbnail: '💳',
      trending: true
    }
  ];

  const achievements = [
    { id: 1, name: 'First Course Complete', icon: '🎓', earned: true },
    { id: 2, name: 'Quiz Master', icon: '🧠', earned: true },
    { id: 3, name: 'Budgeting Pro', icon: '💰', earned: true },
    { id: 4, name: 'Investment Starter', icon: '📈', earned: false },
    { id: 5, name: 'Credit Expert', icon: '🏆', earned: true },
    { id: 6, name: 'Trading Ninja', icon: '⚡', earned: false }
  ];

  const userStats = {
    coursesCompleted: 3,
    totalHours: 12.5,
    streakDays: 7,
    rank: 'Gold',
    points: 2450
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      case 'locked': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Financial Education</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Learn, grow, and master your finances</p>
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
                  <p className="text-blue-100 text-sm">Courses Completed</p>
                  <p className="text-2xl font-bold">{userStats.coursesCompleted}</p>
                </div>
                <Trophy className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Learning Hours</p>
                  <p className="text-2xl font-bold">{userStats.totalHours}</p>
                </div>
                <Clock className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Current Streak</p>
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
                  <p className="text-orange-100 text-sm">Total Points</p>
                  <p className="text-2xl font-bold">{userStats.points}</p>
                </div>
                <Award className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="quiz">Quiz</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {state.courses.map((course) => (
                <Card key={course.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{course.thumbnail}</div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getLevelColor(course.level)}>
                          {course.level}
                        </Badge>
                        <Badge className={getStatusColor(course.status)}>
                          {course.status === 'in-progress' ? 'In Progress' : 
                           course.status === 'completed' ? 'Completed' : 'Locked'}
                        </Badge>
                      </div>
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
                    
                    {course.status !== 'locked' && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{course.completed}/{course.modules} modules</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {course.modules} modules
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                        onClick={() => handleCourseAction(course.id, course.completed ? 'review' : 'continue')}
                      >
                        {course.completed ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Review
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Continue
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="articles" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {articles.map((article) => (
                <Card key={article.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-4xl">{article.thumbnail}</div>
                      {article.trending && (
                        <Badge className="bg-red-100 text-red-800">
                          <TrendingUp className="w-3 h-3 mr-1" />
                          Trending
                        </Badge>
                      )}
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                    
                    <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
                      <Badge variant="secondary">{article.category}</Badge>
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{article.readTime}</span>
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        By {article.author} • {article.date}
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="quiz" className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Daily Quiz Challenge</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🧠</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Test Your Knowledge</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Take today's quiz to earn points and improve your financial literacy
                  </p>
                  <div className="flex justify-center space-x-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">85%</div>
                      <div className="text-sm text-gray-500">Average Score</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">12</div>
                      <div className="text-sm text-gray-500">Quizzes Completed</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{state.userStats.points}</div>
                      <div className="text-sm text-gray-500">Points Earned</div>
                    </div>
                  </div>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={startQuiz}
                  >
                    <Brain className="w-5 h-5 mr-2" />
                    Start Today's Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl font-bold">Your Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  {achievements.map((achievement) => (
                    <div key={achievement.id} className={`p-4 rounded-lg text-center transition-all duration-300 ${
                      achievement.earned 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-lg' 
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-400'
                    }`}>
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <p className="text-sm font-medium">{achievement.name}</p>
                      {achievement.earned && (
                        <div className="flex items-center justify-center mt-2">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <QuizModal 
        isOpen={showQuiz}
        onClose={() => setShowQuiz(false)}
      />
    </>
  );
};

export default FinancialEducation;
