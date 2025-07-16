
import React, { useState } from 'react';
import { 
  BookOpen, 
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
import { useFinance } from '@/contexts/FinanceContext';
import { useToast } from '@/hooks/use-toast';

const FinancialEducation = () => {
  const { state } = useFinance();
  const { toast } = useToast();

  const articles = [
    {
      id: 1,
      title: 'How to Create Your First Budget',
      category: 'Budgeting',
      readTime: '5 min',
      content: 'A budget is a plan for your money. Start by listing your income and expenses. Track where your money goes each month and identify areas where you can save.',
      trending: true
    },
    {
      id: 2,
      title: 'Emergency Fund: Why You Need One',
      category: 'Saving',
      readTime: '4 min',
      content: 'An emergency fund is money set aside for unexpected expenses like medical bills or job loss. Aim to save 3-6 months of living expenses.',
      trending: false
    },
    {
      id: 3,
      title: 'Understanding Interest Rates',
      category: 'Loans',
      readTime: '6 min',
      content: 'Interest rates determine how much you pay for borrowing money. Lower rates mean you pay less over time. Always compare rates before taking a loan.',
      trending: true
    },
    {
      id: 4,
      title: 'Simple Investment Tips for Beginners',
      category: 'Investment',
      readTime: '7 min',
      content: 'Investing can help your money grow over time. Start with low-risk options like mutual funds. Diversify your investments to reduce risk.',
      trending: false
    },
    {
      id: 5,
      title: 'Building Good Credit Habits',
      category: 'Credit',
      readTime: '5 min',
      content: 'Good credit opens doors to better loan rates and financial opportunities. Pay bills on time, keep credit utilization low, and monitor your credit report.',
      trending: true
    },
    {
      id: 6,
      title: 'Planning for Retirement Early',
      category: 'Retirement',
      readTime: '8 min',
      content: 'The earlier you start saving for retirement, the more time your money has to grow. Take advantage of compound interest and employer matching programs.',
      trending: false
    },
    {
      id: 7,
      title: 'Managing Debt Effectively',
      category: 'Debt',
      readTime: '6 min',
      content: 'List all your debts and prioritize paying off high-interest debt first. Consider debt consolidation or balance transfers to reduce interest payments.',
      trending: false
    },
    {
      id: 8,
      title: 'Insurance: Protecting Your Financial Future',
      category: 'Insurance',
      readTime: '7 min',
      content: 'Insurance protects you from financial losses. Health, life, and disability insurance are essential. Choose coverage that fits your needs and budget.',
      trending: true
    }
  ];

  const userStats = {
    articlesRead: 0,
    streakDays: 1,
    rank: 'Bronze',
    points: 100
  };

  const handleReadArticle = (articleId: number) => {
    toast({
      title: "Article Opened",
      description: "Reading article content...",
    });
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
                <p className="text-blue-100 text-sm">Articles Available</p>
                <p className="text-2xl font-bold">{articles.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Articles Read</p>
                <p className="text-2xl font-bold">{userStats.articlesRead}</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-200" />
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

      {/* Articles Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Articles</h2>
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
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleReadArticle(article.id)}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Read More
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FinancialEducation;
