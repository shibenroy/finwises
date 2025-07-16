
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { saveToStorage, getFromStorage, STORAGE_KEYS } from '../utils/localStorage';

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
  color: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  progress: number;
  completed: boolean;
  modules: number;
  completedModules: number;
  rating: number;
  students: number;
  thumbnail: string;
  status: 'completed' | 'in-progress' | 'locked';
}

interface FinanceState {
  user: {
    name: string;
    age: number;
    profession: string;
    monthlyIncome: number;
    currentSavings: number;
    financialGoals: string[];
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
  | { type: 'INITIALIZE_STATE'; payload: FinanceState }
  | { type: 'SET_USER_DATA'; payload: Partial<FinanceState['user']> }
  | { type: 'TOGGLE_BALANCE_VISIBILITY' }
  | { type: 'ADD_TRANSACTION'; payload: Transaction }
  | { type: 'UPDATE_BUDGET_CATEGORY'; payload: BudgetCategory }
  | { type: 'ADD_BUDGET_CATEGORY'; payload: BudgetCategory }
  | { type: 'UPDATE_COURSE_PROGRESS'; payload: { courseId: string; progress: number } }
  | { type: 'MAKE_LOAN_PAYMENT'; payload: { loanId: string; amount: number } };

const defaultState: FinanceState = {
  user: {
    name: '',
    age: 0,
    profession: '',
    monthlyIncome: 0,
    currentSavings: 0,
    financialGoals: [],
    showBalance: true
  },
  transactions: [],
  budgetCategories: [
    { id: '1', name: 'Food & Dining', allocated: 8000, spent: 0, color: 'bg-red-500', icon: '🍽️' },
    { id: '2', name: 'Transportation', allocated: 3000, spent: 0, color: 'bg-blue-500', icon: '🚗' },
    { id: '3', name: 'Entertainment', allocated: 2000, spent: 0, color: 'bg-purple-500', icon: '🎬' },
    { id: '4', name: 'Shopping', allocated: 5000, spent: 0, color: 'bg-green-500', icon: '🛍️' },
    { id: '5', name: 'Bills & Utilities', allocated: 4000, spent: 0, color: 'bg-yellow-500', icon: '💡' },
    { id: '6', name: 'Health & Fitness', allocated: 2500, spent: 0, color: 'bg-pink-500', icon: '⚕️' }
  ],
  loans: [],
  courses: [
    { 
      id: '1', 
      title: 'Budgeting Basics', 
      description: 'Learn the fundamentals of creating and maintaining a budget',
      duration: '2 hours',
      level: 'Beginner',
      progress: 0, 
      completed: false, 
      modules: 6, 
      completedModules: 0,
      rating: 4.8,
      students: 1250,
      thumbnail: '💰',
      status: 'in-progress'
    },
    { 
      id: '2', 
      title: 'Investment Fundamentals', 
      description: 'Understanding stocks, bonds, and mutual funds',
      duration: '3 hours',
      level: 'Intermediate',
      progress: 0, 
      completed: false, 
      modules: 8, 
      completedModules: 0,
      rating: 4.9,
      students: 980,
      thumbnail: '📈',
      status: 'in-progress'
    },
    { 
      id: '3', 
      title: 'Credit Score Mastery', 
      description: 'How to build and maintain an excellent credit score',
      duration: '1.5 hours',
      level: 'Beginner',
      progress: 0, 
      completed: false, 
      modules: 4, 
      completedModules: 0,
      rating: 4.7,
      students: 2100,
      thumbnail: '🏆',
      status: 'in-progress'
    }
  ],
  achievements: [],
  userStats: {
    coursesCompleted: 0,
    totalHours: 0,
    streakDays: 0,
    points: 0
  }
};

const financeReducer = (state: FinanceState, action: FinanceAction): FinanceState => {
  let newState: FinanceState;

  switch (action.type) {
    case 'INITIALIZE_STATE':
      return action.payload;
    
    case 'SET_USER_DATA':
      newState = {
        ...state,
        user: { ...state.user, ...action.payload }
      };
      saveToStorage(STORAGE_KEYS.USER_DATA, newState.user);
      return newState;
    
    case 'TOGGLE_BALANCE_VISIBILITY':
      newState = {
        ...state,
        user: {
          ...state.user,
          showBalance: !state.user.showBalance
        }
      };
      saveToStorage(STORAGE_KEYS.USER_DATA, newState.user);
      return newState;
    
    case 'ADD_TRANSACTION':
      newState = {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
      saveToStorage(STORAGE_KEYS.TRANSACTIONS, newState.transactions);
      
      // Update budget categories spent amount
      const updatedCategories = state.budgetCategories.map(cat => {
        if (cat.name.toLowerCase().includes(action.payload.category.toLowerCase()) && action.payload.type === 'expense') {
          return { ...cat, spent: cat.spent + action.payload.amount };
        }
        return cat;
      });
      
      newState.budgetCategories = updatedCategories;
      saveToStorage(STORAGE_KEYS.BUDGET_CATEGORIES, newState.budgetCategories);
      return newState;
    
    case 'UPDATE_BUDGET_CATEGORY':
      newState = {
        ...state,
        budgetCategories: state.budgetCategories.map(cat =>
          cat.id === action.payload.id ? action.payload : cat
        )
      };
      saveToStorage(STORAGE_KEYS.BUDGET_CATEGORIES, newState.budgetCategories);
      return newState;
    
    case 'ADD_BUDGET_CATEGORY':
      newState = {
        ...state,
        budgetCategories: [...state.budgetCategories, action.payload]
      };
      saveToStorage(STORAGE_KEYS.BUDGET_CATEGORIES, newState.budgetCategories);
      return newState;
    
    case 'UPDATE_COURSE_PROGRESS':
      newState = {
        ...state,
        courses: state.courses.map(course =>
          course.id === action.payload.courseId
            ? { ...course, progress: action.payload.progress }
            : course
        )
      };
      saveToStorage(STORAGE_KEYS.COURSES, newState.courses);
      return newState;
    
    case 'MAKE_LOAN_PAYMENT':
      newState = {
        ...state,
        loans: state.loans.map(loan =>
          loan.id === action.payload.loanId
            ? { ...loan, currentBalance: Math.max(0, loan.currentBalance - action.payload.amount) }
            : loan
        )
      };
      saveToStorage(STORAGE_KEYS.LOANS, newState.loans);
      return newState;
    
    default:
      return state;
  }
};

const FinanceContext = createContext<{
  state: FinanceState;
  dispatch: React.Dispatch<FinanceAction>;
} | null>(null);

export const FinanceProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(financeReducer, defaultState);

  useEffect(() => {
    // Load data from localStorage on mount
    const savedUser = getFromStorage(STORAGE_KEYS.USER_DATA, defaultState.user);
    const savedTransactions = getFromStorage(STORAGE_KEYS.TRANSACTIONS, defaultState.transactions);
    const savedBudgetCategories = getFromStorage(STORAGE_KEYS.BUDGET_CATEGORIES, defaultState.budgetCategories);
    const savedLoans = getFromStorage(STORAGE_KEYS.LOANS, defaultState.loans);
    const savedCourses = getFromStorage(STORAGE_KEYS.COURSES, defaultState.courses);
    const savedAchievements = getFromStorage(STORAGE_KEYS.ACHIEVEMENTS, defaultState.achievements);
    const savedUserStats = getFromStorage(STORAGE_KEYS.USER_STATS, defaultState.userStats);

    const initialState: FinanceState = {
      user: savedUser,
      transactions: savedTransactions,
      budgetCategories: savedBudgetCategories,
      loans: savedLoans,
      courses: savedCourses,
      achievements: savedAchievements,
      userStats: savedUserStats
    };

    dispatch({ type: 'INITIALIZE_STATE', payload: initialState });
  }, []);

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
