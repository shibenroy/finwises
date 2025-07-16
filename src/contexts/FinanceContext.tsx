
import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  date: string;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
  icon: string;
}

export interface Loan {
  id: string;
  type: string;
  bank: string;
  originalAmount: number;
  currentBalance: number;
  monthlyEmi: number;
  interestRate: number;
  remainingMonths: number;
  nextDueDate: string;
  status: 'active' | 'paid' | 'overdue';
}

export interface Course {
  id: string;
  title: string;
  progress: number;
  completed: boolean;
  modules: number;
  completedModules: number;
}

interface FinanceState {
  user: {
    name: string;
    totalBalance: number;
    monthlyIncome: number;
    monthlyExpenses: number;
    showBalance: boolean;
  };
  transactions: Transaction[];
  budgetCategories: BudgetCategory[];
  loans: Loan[];
  courses: Course[];
  achievements: string[];
  userStats: {
    coursesCompleted: number;
    totalHours: number;
    streakDays: number;
    points: number;
  };
}

type FinanceAction = 
  | { type: 'TOGGLE_BALANCE_VISIBILITY' }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_BUDGET_CATEGORY'; payload: BudgetCategory }
  | { type: 'ADD_BUDGET_CATEGORY'; payload: BudgetCategory }
  | { type: 'UPDATE_COURSE_PROGRESS'; payload: { courseId: string; progress: number } }
  | { type: 'SET_USER_DATA'; payload: Partial<FinanceState['user']> }
  | { type: 'MAKE_LOAN_PAYMENT'; payload: { loanId: string; amount: number } };

const initialState: FinanceState = {
  user: {
    name: 'Arjun',
    totalBalance: 245680,
    monthlyIncome: 65000,
    monthlyExpenses: 18340,
    showBalance: true
  },
  transactions: [
    { id: '1', type: 'expense', amount: 425, description: 'Food Delivery', category: 'Food', date: '2024-01-15' },
    { id: '2', type: 'income', amount: 12000, description: 'Freelance Payment', category: 'Income', date: '2024-01-14' },
    { id: '3', type: 'expense', amount: 180, description: 'Uber Ride', category: 'Transport', date: '2024-01-13' },
    { id: '4', type: 'expense', amount: 799, description: 'Netflix Subscription', category: 'Entertainment', date: '2024-01-12' }
  ],
  budgetCategories: [
    { id: '1', name: 'Food & Dining', allocated: 8000, spent: 6500, color: 'bg-red-500', icon: '🍽️' },
    { id: '2', name: 'Transportation', allocated: 3000, spent: 3200, color: 'bg-blue-500', icon: '🚗' },
    { id: '3', name: 'Entertainment', allocated: 2000, spent: 1800, color: 'bg-purple-500', icon: '🎬' },
    { id: '4', name: 'Shopping', allocated: 5000, spent: 4200, color: 'bg-green-500', icon: '🛍️' },
    { id: '5', name: 'Bills & Utilities', allocated: 4000, spent: 3800, color: 'bg-yellow-500', icon: '💡' },
    { id: '6', name: 'Health & Fitness', allocated: 2500, spent: 1900, color: 'bg-pink-500', icon: '⚕️' }
  ],
  loans: [
    {
      id: '1',
      type: 'Personal Loan',
      bank: 'HDFC Bank',
      originalAmount: 200000,
      currentBalance: 145000,
      monthlyEmi: 12500,
      interestRate: 10.5,
      remainingMonths: 14,
      nextDueDate: '2024-07-25',
      status: 'active'
    },
    {
      id: '2',
      type: 'Student Loan',
      bank: 'SBI',
      originalAmount: 500000,
      currentBalance: 380000,
      monthlyEmi: 8200,
      interestRate: 8.5,
      remainingMonths: 56,
      nextDueDate: '2024-07-28',
      status: 'active'
    }
  ],
  courses: [
    { id: '1', title: 'Budgeting Basics', progress: 75, completed: false, modules: 6, completedModules: 4 },
    { id: '2', title: 'Investment Fundamentals', progress: 30, completed: false, modules: 8, completedModules: 2 },
    { id: '3', title: 'Credit Score Mastery', progress: 100, completed: true, modules: 4, completedModules: 4 }
  ],
  achievements: ['first-course', 'quiz-master', 'budgeting-pro', 'credit-expert'],
  userStats: {
    coursesCompleted: 3,
    totalHours: 12.5,
    streakDays: 7,
    points: 2450
  }
};

const financeReducer = (state: FinanceState, action: FinanceAction): FinanceState => {
  switch (action.type) {
    case 'TOGGLE_BALANCE_VISIBILITY':
      return {
        ...state,
        user: {
          ...state.user,
          showBalance: !state.user.showBalance
        }
      };
    
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    
    case 'UPDATE_BUDGET_CATEGORY':
      return {
        ...state,
        budgetCategories: state.budgetCategories.map(cat =>
          cat.id === action.payload.id ? action.payload : cat
        )
      };
    
    case 'ADD_BUDGET_CATEGORY':
      return {
        ...state,
        budgetCategories: [...state.budgetCategories, action.payload]
      };
    
    case 'UPDATE_COURSE_PROGRESS':
      return {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload.courseId
            ? { ...course, progress: action.payload.progress }
            : course
        )
      };
    
    case 'SET_USER_DATA':
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };
    
    case 'MAKE_LOAN_PAYMENT':
      return {
        ...state,
        loans: state.loans.map(loan =>
          loan.id === action.payload.loanId
            ? { ...loan, currentBalance: Math.max(0, loan.currentBalance - action.payload.amount) }
            : loan
        )
      };
    
    default:
      return state;
  }
};

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: React.Dispatch<FinanceAction>;
} | null>(null);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, initialState);
  
  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};
