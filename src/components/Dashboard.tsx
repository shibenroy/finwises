
import React, { useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Target, 
  Gift, 
  Zap,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useFinance } from '@/contexts/FinanceContext';
import TransactionModal from './TransactionModal';

const Dashboard = () => {
  const { state, dispatch } = useFinance();
  const [transactionModal, setTransactionModal] = useState<{ isOpen: boolean; type: 'income' | 'expense' }>({
    isOpen: false,
    type: 'income'
  });

  const toggleBalanceVisibility = () => {
    dispatch({ type: 'TOGGLE_BALANCE_VISIBILITY' });
  };

  const openTransactionModal = (type: 'income' | 'expense') => {
    setTransactionModal({ isOpen: true, type });
  };

  const closeTransactionModal = () => {
    setTransactionModal({ isOpen: false, type: 'income' });
  };

  const quickStats = [
    { 
      title: 'Total Balance', 
      amount: `₹${state.user.totalBalance.toLocaleString()}`, 
      change: '+12.5%', 
      trend: 'up',
      color: 'bg-green-500'
    },
    { 
      title: 'Monthly Expenses', 
      amount: `₹${state.user.monthlyExpenses.toLocaleString()}`, 
      change: '-3.2%', 
      trend: 'down',
      color: 'bg-red-500'
    },
    { 
      title: 'Monthly Income', 
      amount: `₹${state.user.monthlyIncome.toLocaleString()}`, 
      change: '+8.1%', 
      trend: 'up',
      color: 'bg-blue-500'
    },
    { 
      title: 'Savings Rate', 
      amount: `${Math.round(((state.user.monthlyIncome - state.user.monthlyExpenses) / state.user.monthlyIncome) * 100)}%`, 
      change: '+2.3%', 
      trend: 'up',
      color: 'bg-purple-500'
    }
  ];

  const savingsGoals = [
    { name: 'Emergency Fund', current: 34000, target: 50000, color: 'bg-blue-500' },
    { name: 'Vacation', current: 15000, target: 25000, color: 'bg-green-500' },
    { name: 'Laptop', current: 45000, target: 80000, color: 'bg-purple-500' },
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-2">Good morning, {state.user.name}! 👋</h1>
              <p className="text-blue-100">Your financial journey is looking great today</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2">
                <span className="text-sm opacity-90">Total Balance</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleBalanceVisibility}
                  className="text-white hover:bg-white/20"
                >
                  {state.user.showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                </Button>
              </div>
              <div className="text-3xl font-bold">
                {state.user.showBalance ? `₹${state.user.totalBalance.toLocaleString()}` : '₹••••••'}
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => (
            <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.amount}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-full flex items-center justify-center`}>
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <Card className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.transactions.slice(0, 4).map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}>
                        {transaction.type === 'income' ? 
                          <ArrowUpRight className="w-5 h-5" /> : 
                          <ArrowDownRight className="w-5 h-5" />
                        }
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-500">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        {transaction.category}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Savings Goals */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Savings Goals</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Goal
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {savingsGoals.map((goal, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{goal.name}</span>
                      <span className="text-sm text-gray-500">
                        ₹{goal.current.toLocaleString()} / ₹{goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={(goal.current / goal.target) * 100} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>{Math.round((goal.current / goal.target) * 100)}% completed</span>
                      <span>₹{(goal.target - goal.current).toLocaleString()} remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                className="h-20 flex-col space-y-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                onClick={() => openTransactionModal('income')}
              >
                <Plus className="w-6 h-6" />
                <span>Add Income</span>
              </Button>
              <Button 
                className="h-20 flex-col space-y-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
                onClick={() => openTransactionModal('expense')}
              >
                <Target className="w-6 h-6" />
                <span>Add Expense</span>
              </Button>
              <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700">
                <Gift className="w-6 h-6" />
                <span>Set Goal</span>
              </Button>
              <Button className="h-20 flex-col space-y-2 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700">
                <Zap className="w-6 h-6" />
                <span>Invest</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <TransactionModal 
        isOpen={transactionModal.isOpen}
        onClose={closeTransactionModal}
        type={transactionModal.type}
      />
    </>
  );
};

export default Dashboard;
