import React, { useState } from 'react';
import { 
  CreditCard, 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Plus,
  Calculator,
  Clock,
  DollarSign,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFinance } from '@/contexts/FinanceContext';
import { useToast } from '@/hooks/use-toast';
import EMICalculator from './EMICalculator';

const LoanManagement = () => {
  const { state } = useFinance();
  const { toast } = useToast();
  const [showEMICalculator, setShowEMICalculator] = useState(false);

  const handleMakePayment = (loanId: string) => {
    toast({
      title: "Payment Initiated",
      description: "Redirecting to payment gateway...",
    });
    // In a real app, this would redirect to a payment gateway
  };

  const handleViewDetails = (loanId: string) => {
    toast({
      title: "Loan Details",
      description: "Opening detailed loan information...",
    });
    // In a real app, this would open a detailed view
  };

  const loanSummary = {
    totalDebt: state.loans.reduce((sum, loan) => sum + loan.currentBalance, 0),
    monthlyEmi: state.loans.reduce((sum, loan) => sum + loan.monthlyEmi, 0),
    totalInterest: 45000,
    avgInterestRate: 12.3
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'paid': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateProgress = (original: number, current: number) => {
    return ((original - current) / original) * 100;
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Loan Management</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">Track and manage all your debts in one place</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => setShowEMICalculator(true)}
            >
              <Calculator className="w-4 h-4 mr-2" />
              EMI Calculator
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Loan
            </Button>
          </div>
        </div>

        {/* Loan Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-red-100 text-sm">Total Debt</p>
                  <p className="text-2xl font-bold">₹{loanSummary.totalDebt.toLocaleString()}</p>
                </div>
                <CreditCard className="w-8 h-8 text-red-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Monthly EMI</p>
                  <p className="text-2xl font-bold">₹{loanSummary.monthlyEmi.toLocaleString()}</p>
                </div>
                <Calendar className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-yellow-100 text-sm">Total Interest</p>
                  <p className="text-2xl font-bold">₹{loanSummary.totalInterest.toLocaleString()}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-yellow-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Avg Interest Rate</p>
                  <p className="text-2xl font-bold">{loanSummary.avgInterestRate}%</p>
                </div>
                <Target className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Loan Details */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-bold">Active Loans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {state.loans.map((loan) => (
                <div key={loan.id} className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 ${loan.color} rounded-full flex items-center justify-center`}>
                        <CreditCard className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{loan.type}</h3>
                        <p className="text-sm text-gray-500">{loan.bank}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Badge className={getStatusColor(loan.status)}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                      </Badge>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Next Due</p>
                        <p className="font-medium">{loan.nextDueDate}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Outstanding</p>
                      <p className="text-lg font-semibold">₹{loan.currentBalance.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Monthly EMI</p>
                      <p className="text-lg font-semibold">₹{loan.monthlyEmi.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Interest Rate</p>
                      <p className="text-lg font-semibold">{loan.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining Months</p>
                      <p className="text-lg font-semibold">{loan.remainingMonths}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Repayment Progress</span>
                      <span>{calculateProgress(loan.originalAmount, loan.currentBalance).toFixed(1)}% paid</span>
                    </div>
                    <Progress 
                      value={calculateProgress(loan.originalAmount, loan.currentBalance)} 
                      className="h-2"
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>₹{(loan.originalAmount - loan.currentBalance).toLocaleString()} paid</span>
                      <span>₹{loan.currentBalance.toLocaleString()} remaining</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center space-x-2">
                      {loan.nextDueDate && new Date(loan.nextDueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) ? (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                      <span className="text-sm text-gray-500">
                        {loan.nextDueDate && new Date(loan.nextDueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) 
                          ? 'Due soon' 
                          : 'On track'
                        }
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleMakePayment(loan.id)}
                      >
                        Make Payment
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewDetails(loan.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Loan Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Payment Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-900 dark:text-blue-100">Personal Loan - HDFC</p>
                      <p className="text-sm text-blue-700 dark:text-blue-200">Due: July 25, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-900 dark:text-blue-100">₹12,500</p>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">Due in 3 days</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-green-900 dark:text-green-100">Student Loan - SBI</p>
                      <p className="text-sm text-green-700 dark:text-green-200">Due: July 28, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-green-900 dark:text-green-100">₹8,200</p>
                      <Badge className="bg-green-100 text-green-800 text-xs">Due in 6 days</Badge>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-red-900 dark:text-red-100">Credit Card - ICICI</p>
                      <p className="text-sm text-red-700 dark:text-red-200">Due: July 30, 2024</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-red-900 dark:text-red-100">₹3,500</p>
                      <Badge className="bg-red-100 text-red-800 text-xs">Due in 8 days</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl font-bold">Debt Management Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <h4 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">💡 Prioritize High Interest</h4>
                  <p className="text-sm text-purple-700 dark:text-purple-200">
                    Focus on paying off your credit card debt first (18% interest rate) to save money.
                  </p>
                </div>
              
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                  <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-2">📈 Extra Payment Impact</h4>
                  <p className="text-sm text-indigo-700 dark:text-indigo-200">
                    Adding ₹2,000 extra monthly to your personal loan can save ₹15,000 in interest.
                  </p>
                </div>
              
                <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                  <h4 className="font-semibold text-pink-900 dark:text-pink-100 mb-2">🎯 Debt-Free Goal</h4>
                  <p className="text-sm text-pink-700 dark:text-pink-200">
                    At current rate, you'll be debt-free in 4.5 years. Great progress!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <EMICalculator 
        isOpen={showEMICalculator}
        onClose={() => setShowEMICalculator(false)}
      />
    </>
  );
};

export default LoanManagement;
