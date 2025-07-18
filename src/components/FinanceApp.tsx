
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  CreditCard, 
  BookOpen, 
  Target, 
  PieChart, 
  Wallet, 
  Moon,
  Sun,
  Bell,
  User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dashboard from './Dashboard';
import BudgetingModule from './BudgetingModule.jsx';
import LoanManagement from './LoanManagement.jsx';
import FinancialEducation from './FinancialEducation';
import OnboardingFlow from './OnboardingFlow';
import { FinanceProvider, useFinance } from '@/contexts/FinanceContext';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../utils/localStorage';

const FinanceAppContent = () => {
  const { dispatch } = useFinance();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    const onboardingComplete = getFromStorage(STORAGE_KEYS.ONBOARDING_COMPLETE, false);
    setIsOnboarded(onboardingComplete);
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const handleOnboardingComplete = (userData: any) => {
    // Save user data to context and localStorage
    dispatch({ 
      type: 'SET_USER_DATA', 
      payload: {
        name: userData.fullName,
        age: parseInt(userData.age),
        profession: userData.profession,
        monthlyIncome: parseInt(userData.monthlyIncome) || 0,
        currentSavings: parseInt(userData.currentSavings) || 0,
        financialGoals: userData.financialGoals
      }
    });
    
    saveToStorage(STORAGE_KEYS.ONBOARDING_COMPLETE, true);
    setIsOnboarded(true);
    setActiveTab('dashboard');
  };

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FinanceWise
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-gray-100 dark:bg-gray-800">
              <TabsTrigger value="dashboard" className="flex items-center space-x-2">
                <PieChart className="w-4 h-4" />
                <span className="hidden sm:inline">Dashboard</span>
              </TabsTrigger>
              <TabsTrigger value="budgeting" className="flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span className="hidden sm:inline">Budget</span>
              </TabsTrigger>
              <TabsTrigger value="loans" className="flex items-center space-x-2">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Loans</span>
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span className="hidden sm:inline">Learn</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsContent value="dashboard" className="mt-0">
            <Dashboard />
          </TabsContent>
          <TabsContent value="budgeting" className="mt-0">
            <BudgetingModule />
          </TabsContent>
          <TabsContent value="loans" className="mt-0">
            <LoanManagement />
          </TabsContent>
          <TabsContent value="education" className="mt-0">
            <FinancialEducation />
          </TabsContent>
        </Tabs>
      </main>

      
    </div>
  );
};

const FinanceApp = () => {
  return (
    <FinanceProvider>
      <FinanceAppContent />
    </FinanceProvider>
  );
};

export default FinanceApp;
