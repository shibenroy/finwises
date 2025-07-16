
export const STORAGE_KEYS = {
  USER_DATA: 'financeWise_userData',
  TRANSACTIONS: 'financeWise_transactions',
  BUDGET_CATEGORIES: 'financeWise_budgetCategories',
  LOANS: 'financeWise_loans',
  COURSES: 'financeWise_courses',
  ACHIEVEMENTS: 'financeWise_achievements',
  SAVINGS_GOALS: 'financeWise_savingsGoals',
  USER_STATS: 'financeWise_userStats',
  ONBOARDING_COMPLETE: 'financeWise_onboardingComplete'
};

export const saveToStorage = (key: string, data: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const getFromStorage = (key: string, defaultValue: any = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage:', error);
  }
};

export const clearAllStorage = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};
