import React, { useState } from 'react';
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Edit,
  Trash2,
  AlertCircle,
  CheckCircle,
  Target
} from 'lucide-react';

const BudgetingModule = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const budgetCategories = [
    { 
      name: 'Food & Dining', 
      allocated: 8000, 
      spent: 6500, 
      color: 'bg-red-500',
      icon: '🍽️',
      trend: 'down'
    },
    { 
      name: 'Transportation', 
      allocated: 3000, 
      spent: 3200, 
      color: 'bg-blue-500',
      icon: '🚗',
      trend: 'up'
    },
    { 
      name: 'Entertainment', 
      allocated: 2000, 
      spent: 1800, 
      color: 'bg-purple-500',
      icon: '🎬',
      trend: 'down'
    },
    { 
      name: 'Shopping', 
      allocated: 5000, 
      spent: 4200, 
      color: 'bg-green-500',
      icon: '🛍️',
      trend: 'down'
    },
    { 
      name: 'Bills & Utilities', 
      allocated: 4000, 
      spent: 3800, 
      color: 'bg-yellow-500',
      icon: '💡',
      trend: 'down'
    },
    { 
      name: 'Health & Fitness', 
      allocated: 2500, 
      spent: 1900, 
      color: 'bg-pink-500',
      icon: '⚕️',
      trend: 'down'
    }
  ];

  const monthlyOverview = {
    totalBudget: 24500,
    totalSpent: 21400,
    remaining: 3100,
    percentSpent: 87.3
  };

  const getBudgetStatus = (allocated, spent) => {
    const percentage = (spent / allocated) * 100;
    if (percentage >= 90) return { status: 'danger', color: 'text-red-500' };
    if (percentage >= 75) return { status: 'warning', color: 'text-yellow-500' };
    return { status: 'good', color: 'text-green-500' };
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'danger': return <AlertCircle className="w-4 h-4" />;
      case 'warning': return <AlertCircle className="w-4 h-4" />;
      default: return <CheckCircle className="w-4 h-4" />;
    }
  };

  // Custom components to replace shadcn/ui components
  const Card = ({ children, className = "" }) => (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md ${className}`}>
      {children}
    </div>
  );

  const CardHeader = ({ children }) => (
    <div className="p-6 pb-4">
      {children}
    </div>
  );

  const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold ${className}`}>
      {children}
    </h3>
  );

  const CardContent = ({ children }) => (
    <div className="p-6 pt-0">
      {children}
    </div>
  );

  const Button = ({ children, variant = "default", size = "default", className = "", onClick }) => {
    const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500";
    const variants = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300",
    };
    const sizes = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 text-sm",
    };
    
    return (
      <button 
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  const Badge = ({ children, variant = "default" }) => {
    const variants = {
      default: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200",
      destructive: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      secondary: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    };
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]}`}>
        {children}
      </span>
    );
  };

  const Progress = ({ value, className = "" }) => (
    <div className={`w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700 ${className}`}>
      <div 
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${Math.min(value, 100)}%` }}
      />
    </div>
  );

  const Tabs = ({ children, value, onValueChange }) => (
    <div className="w-full">
      {React.Children.map(children, child => 
        React.cloneElement(child, { value, onValueChange })
      )}
    </div>
  );

  const TabsList = ({ children, value, onValueChange }) => (
    <div className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 p-1">
      {React.Children.map(children, child => 
        React.cloneElement(child, { selectedValue: value, onValueChange })
      )}
    </div>
  );

  const TabsTrigger = ({ children, value, selectedValue, onValueChange }) => (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
        selectedValue === value 
          ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
          : 'text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
      }`}
      onClick={() => onValueChange(value)}
      type="button"
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Budget Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage your spending across categories</p>
          </div>
          <div className="flex flex-wrap gap-2 w-full sm:w-auto items-center">
            <Tabs value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <TabsList>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
                <TabsTrigger value="monthly">Monthly</TabsTrigger>
                <TabsTrigger value="yearly">Yearly</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button className="flex-1 min-w-[140px] sm:min-w-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Budget
            </Button>
          </div>
        </div>

        {/* Budget Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-blue-100 text-sm">Total Budget</p>
                  <p className="text-2xl font-bold">₹{monthlyOverview.totalBudget.toLocaleString()}</p>
                </div>
                <Target className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
            <CardContent>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-red-100 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold">₹{monthlyOverview.totalSpent.toLocaleString()}</p>
                </div>
                <TrendingDown className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
            <CardContent>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-green-100 text-sm">Remaining</p>
                  <p className="text-2xl font-bold">₹{monthlyOverview.remaining.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent>
              <div className="flex items-center justify-between p-4">
                <div>
                  <p className="text-purple-100 text-sm">Budget Used</p>
                  <p className="text-2xl font-bold">{monthlyOverview.percentSpent}%</p>
                </div>
                <PieChart className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Budget Categories */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Budget Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgetCategories.map((category, index) => {
                const percentage = (category.spent / category.allocated) * 100;
                const budgetStatus = getBudgetStatus(category.allocated, category.spent);
                
                return (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-3">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{category.icon}</div>
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">{category.name}</h3>
                          <p className="text-sm text-gray-500">
                            ₹{category.spent.toLocaleString()} of ₹{category.allocated.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className={`flex items-center space-x-1 ${budgetStatus.color}`}>
                          {getStatusIcon(budgetStatus.status)}
                          <span className="text-sm font-medium">{percentage.toFixed(1)}%</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Progress 
                        value={percentage} 
                        className="h-2"
                      />
                      <div className="flex flex-col sm:flex-row sm:justify-between text-sm text-gray-500 gap-1">
                        <span>Remaining: ₹{(category.allocated - category.spent).toLocaleString()}</span>
                        <Badge variant={budgetStatus.status === 'danger' ? 'destructive' : 'secondary'}>
                          {budgetStatus.status === 'danger' ? 'Over Budget' : 
                           budgetStatus.status === 'warning' ? 'Near Limit' : 'On Track'}
                        </Badge>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Budget Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Monthly Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <TrendingDown className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900 dark:text-blue-100">Good Progress!</span>
                  </div>
                  <p className="text-sm text-blue-700 dark:text-blue-200 mt-1">
                    You've saved ₹2,100 compared to last month by reducing dining expenses.
                  </p>
                </div>
                
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <span className="font-medium text-yellow-900 dark:text-yellow-100">Watch Out!</span>
                  </div>
                  <p className="text-sm text-yellow-700 dark:text-yellow-200 mt-1">
                    Transportation costs are 7% higher than budgeted this month.
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-medium text-green-900 dark:text-green-100">Well Done!</span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-200 mt-1">
                    You're consistently under budget in 4 out of 6 categories.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Smart Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">💡 Optimize Food Spending</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-200">
                    Consider meal planning to reduce food delivery costs by up to 30%.
                  </p>
                </div>
                
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">🚗 Transportation Tip</h4>
                  <p className="text-sm text-indigo-700 dark:text-indigo-200">
                    Try carpooling or public transport 2 days a week to save ₹800/month.
                  </p>
                </div>
                
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">🎯 Goal Achievement</h4>
                  <p className="text-sm text-pink-700 dark:text-pink-200">
                    You can reach your vacation goal 2 months earlier with current savings rate!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BudgetingModule;