
import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  User, 
  Wallet, 
  Target, 
  TrendingUp,
  Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

interface OnboardingFlowProps {
  onComplete: (userData: any) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    monthlyIncome: '',
    currentSavings: '',
    profession: '',
    financialGoals: [] as string[]
  });

  const steps = [
    { id: 'welcome', title: 'Welcome', icon: '👋' },
    { id: 'personal', title: 'Personal Info', icon: '👤' },
    { id: 'financial', title: 'Financial Info', icon: '💰' },
    { id: 'goals', title: 'Goals', icon: '🎯' },
    { id: 'complete', title: 'Complete', icon: '✅' }
  ];

  const professions = [
    'Student', 'Software Engineer', 'Designer', 'Marketing', 'Finance', 
    'Healthcare', 'Education', 'Business Owner', 'Freelancer', 'Other'
  ];

  const financialGoals = [
    'Build Emergency Fund', 'Save for Vacation', 'Buy a House', 'Start Investing',
    'Pay Off Debt', 'Retirement Planning', 'Start a Business', 'Education Fund'
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      financialGoals: prev.financialGoals.includes(goal)
        ? prev.financialGoals.filter(g => g !== goal)
        : [...prev.financialGoals, goal]
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  const renderStep = () => {
    switch (steps[currentStep].id) {
      case 'welcome':
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Welcome to FinanceWise</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Your personal finance companion designed specifically for young Indians. 
              Let's build your financial future together!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Wallet className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Smart Budgeting</h3>
                <p className="text-sm text-blue-700 dark:text-blue-200">Track expenses and manage budgets effortlessly</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-semibold text-green-900 dark:text-green-100">Investment Learning</h3>
                <p className="text-sm text-green-700 dark:text-green-200">Learn investing through interactive content</p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Goal Achievement</h3>
                <p className="text-sm text-purple-700 dark:text-purple-200">Set and achieve your financial goals</p>
              </div>
            </div>
          </div>
        );

      case 'personal':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Tell Us About Yourself</h2>
              <p className="text-gray-600 dark:text-gray-400">This helps us personalize your experience</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="age">Age</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="age"
                    type="number"
                    placeholder="25"
                    value={formData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div>
                <Label>Profession</Label>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {professions.map((profession) => (
                    <Button
                      key={profession}
                      variant={formData.profession === profession ? "default" : "outline"}
                      onClick={() => handleInputChange('profession', profession)}
                      className="text-sm"
                    >
                      {profession}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 'financial':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Financial Information</h2>
              <p className="text-gray-600 dark:text-gray-400">Help us understand your current financial situation</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="monthlyIncome">Monthly Income (₹)</Label>
                <Input
                  id="monthlyIncome"
                  type="number"
                  placeholder="50000"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                />
              </div>
              
              <div>
                <Label htmlFor="currentSavings">Current Savings (₹)</Label>
                <Input
                  id="currentSavings"
                  type="number"
                  placeholder="100000"
                  value={formData.currentSavings}
                  onChange={(e) => handleInputChange('currentSavings', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'goals':
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Financial Goals</h2>
              <p className="text-gray-600 dark:text-gray-400">Select all that apply to you</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {financialGoals.map((goal) => (
                <Button
                  key={goal}
                  variant={formData.financialGoals.includes(goal) ? "default" : "outline"}
                  onClick={() => toggleGoal(goal)}
                  className="justify-start text-left"
                >
                  <div className="flex items-center space-x-2">
                    {formData.financialGoals.includes(goal) && (
                      <CheckCircle className="w-4 h-4" />
                    )}
                    <span>{goal}</span>
                  </div>
                </Button>
              ))}
            </div>
            
            <div className="text-center text-sm text-gray-500">
              Selected {formData.financialGoals.length} goals
            </div>
          </div>
        );

      case 'complete':
        return (
          <div className="text-center space-y-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">You're All Set!</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Welcome to your financial journey, {formData.fullName}! Your personalized dashboard is ready.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Next Steps</h3>
                <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                  <li>✓ Set up your first budget</li>
                  <li>✓ Add your expenses</li>
                  <li>✓ Start learning module</li>
                </ul>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Your Goals</h3>
                <div className="text-sm text-green-700 dark:text-green-200 space-y-1">
                  {formData.financialGoals.slice(0, 3).map((goal, index) => (
                    <div key={index}>✓ {goal}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Step {currentStep + 1} of {steps.length}</span>
            <span className="text-sm text-gray-600 dark:text-gray-400">{Math.round(progress)}% Complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStep 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                }`}>
                  {index < currentStep ? <CheckCircle className="w-5 h-5" /> : step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
          <CardContent className="p-8">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Button>
          
          <Button
            onClick={nextStep}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
          >
            <span>{currentStep === steps.length - 1 ? 'Get Started' : 'Next'}</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;
