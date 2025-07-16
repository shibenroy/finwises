import React, { useState } from 'react';
import { 
  Clock, 
  TrendingUp,
  FileText,
  X,
  ArrowLeft
} from 'lucide-react';

const FinancialEducation = () => {
  const [selectedArticle, setSelectedArticle] = useState(null);

  const articles = [
    {
      id: 1,
      title: 'How to Create Your First Budget',
      category: 'Budgeting',
      readTime: '5 min',
      content: 'A budget is a plan for your money. Start by listing your income and expenses. Track where your money goes each month and identify areas where you can save.',
      fullContent: `A budget is a plan for your money that helps you take control of your finances. Here's how to create your first budget:

1. **Calculate Your Monthly Income**
   - Include salary, freelance work, side hustles
   - Use your net income (after taxes)
   - Include only reliable, consistent income

2. **List Your Fixed Expenses**
   - Rent/mortgage payments
   - Insurance premiums
   - Loan payments
   - Subscriptions

3. **Track Variable Expenses**
   - Food and groceries
   - Transportation
   - Entertainment
   - Utilities

4. **Apply the 50/30/20 Rule**
   - 50% for needs (housing, food, utilities)
   - 30% for wants (entertainment, dining out)
   - 20% for savings and debt repayment

5. **Monitor and Adjust**
   - Review your budget monthly
   - Adjust categories as needed
   - Use budgeting apps or spreadsheets

Remember, budgeting is a skill that improves with practice. Start simple and gradually refine your approach as you become more comfortable with managing your money.`,
      trending: true
    },
    {
      id: 2,
      title: 'Emergency Fund: Why You Need One',
      category: 'Saving',
      readTime: '4 min',
      content: 'An emergency fund is money set aside for unexpected expenses like medical bills or job loss. Aim to save 3-6 months of living expenses.',
      fullContent: `An emergency fund is your financial safety net that protects you from unexpected expenses and financial emergencies. Here's why it's crucial:

**What is an Emergency Fund?**
An emergency fund is a separate savings account specifically designated for unexpected expenses such as:
- Medical emergencies
- Job loss
- Car repairs
- Home repairs
- Family emergencies

**How Much Should You Save?**
- **Minimum**: $1,000 for basic emergencies
- **Ideal**: 3-6 months of living expenses
- **High-risk jobs**: 6-12 months of expenses

**Building Your Emergency Fund:**
1. **Start Small**: Begin with $500-$1,000
2. **Automate Savings**: Set up automatic transfers
3. **Use Windfalls**: Tax refunds, bonuses, gifts
4. **Cut Expenses**: Temporarily reduce non-essential spending
5. **Side Income**: Consider freelance work or selling items

**Where to Keep Your Emergency Fund:**
- High-yield savings account
- Money market account
- Short-term CDs
- Keep it liquid and easily accessible

**When to Use It:**
Only use for true emergencies, not planned expenses or wants. After using it, prioritize rebuilding it immediately.

An emergency fund provides peace of mind and prevents you from going into debt during difficult times.`,
      trending: false
    },
    {
      id: 3,
      title: 'Understanding Interest Rates',
      category: 'Loans',
      readTime: '6 min',
      content: 'Interest rates determine how much you pay for borrowing money. Lower rates mean you pay less over time. Always compare rates before taking a loan.',
      fullContent: `Interest rates are one of the most important factors in personal finance. Understanding how they work can save you thousands of dollars over your lifetime.

**What Are Interest Rates?**
An interest rate is the cost of borrowing money, expressed as a percentage of the loan amount. It's also the return you earn on savings and investments.

**Types of Interest Rates:**

1. **Simple Interest**
   - Calculated only on the principal amount
   - Formula: Interest = Principal × Rate × Time
   - Less common in modern lending

2. **Compound Interest**
   - Interest calculated on principal plus accumulated interest
   - "Interest on interest" - works for and against you
   - More common in loans and investments

**Fixed vs. Variable Rates:**
- **Fixed**: Rate stays the same throughout the loan term
- **Variable**: Rate can change based on market conditions

**How Interest Rates Affect You:**

**Borrowing (Loans, Credit Cards):**
- Higher rates = More expensive borrowing
- Lower rates = Less expensive borrowing
- Shop around for the best rates

**Saving and Investing:**
- Higher rates = Better returns on savings
- Compound interest helps your money grow faster

**Factors That Influence Your Rate:**
- Credit score
- Income and employment history
- Loan amount and term
- Economic conditions
- Type of loan

**Tips for Getting Better Rates:**
1. Improve your credit score
2. Shop around with multiple lenders
3. Consider shorter loan terms
4. Make a larger down payment
5. Pay down existing debt

Understanding interest rates empowers you to make better financial decisions and save money on borrowing costs.`,
      trending: true
    },
    {
      id: 4,
      title: 'Simple Investment Tips for Beginners',
      category: 'Investment',
      readTime: '7 min',
      content: 'Investing can help your money grow over time. Start with low-risk options like mutual funds. Diversify your investments to reduce risk.',
      fullContent: `Investing is one of the most powerful ways to build wealth over time. Here's how to get started as a beginner:

**Why Invest?**
- Combat inflation
- Build wealth over time
- Achieve financial goals
- Generate passive income

**Investment Basics:**

1. **Start Early**
   - Time is your biggest advantage
   - Compound interest works best over long periods
   - Even small amounts can grow significantly

2. **Understand Risk vs. Return**
   - Higher potential returns usually mean higher risk
   - Lower risk investments offer more stability
   - Balance based on your risk tolerance

**Beginner-Friendly Investment Options:**

1. **Index Funds**
   - Diversified, low-cost
   - Track market performance
   - Great for beginners

2. **Mutual Funds**
   - Professional management
   - Instant diversification
   - Various risk levels available

3. **ETFs (Exchange-Traded Funds)**
   - Trade like stocks
   - Low fees
   - Flexible and liquid

4. **Target-Date Funds**
   - Automatically adjust risk over time
   - Perfect for retirement accounts
   - Set-and-forget approach

**Key Investment Principles:**

1. **Diversification**
   - Don't put all eggs in one basket
   - Spread investments across different assets
   - Reduces overall risk

2. **Dollar-Cost Averaging**
   - Invest a fixed amount regularly
   - Reduces impact of market volatility
   - Builds discipline

3. **Stay Consistent**
   - Invest regularly, regardless of market conditions
   - Avoid trying to time the market
   - Focus on long-term goals

**Getting Started:**
1. Open a brokerage account
2. Start with low-cost index funds
3. Automate your investments
4. Review and rebalance annually

Remember: Investing is a marathon, not a sprint. Stay patient, stay consistent, and let time work in your favor.`,
      trending: false
    },
    {
      id: 5,
      title: 'Building Good Credit Habits',
      category: 'Credit',
      readTime: '5 min',
      content: 'Good credit opens doors to better loan rates and financial opportunities. Pay bills on time, keep credit utilization low, and monitor your credit report.',
      fullContent: `Your credit score is one of the most important numbers in your financial life. Here's how to build and maintain excellent credit:

**What is Credit?**
Credit is your ability to borrow money based on your track record of repaying debts. Your credit score ranges from 300-850, with higher scores indicating better creditworthiness.

**Credit Score Ranges:**
- Excellent: 800-850
- Very Good: 740-799
- Good: 670-739
- Fair: 580-669
- Poor: 300-579

**Factors That Affect Your Credit Score:**

1. **Payment History (35%)**
   - Most important factor
   - Pay all bills on time
   - Even one late payment can hurt your score

2. **Credit Utilization (30%)**
   - Keep balances low relative to credit limits
   - Aim for less than 30% utilization
   - Ideally, keep it under 10%

3. **Length of Credit History (15%)**
   - Keep old accounts open
   - Don't close your oldest credit card
   - Build a long credit history

4. **Credit Mix (10%)**
   - Have different types of credit
   - Credit cards, auto loans, mortgages
   - Shows you can handle various credit types

5. **New Credit (10%)**
   - Limit new credit applications
   - Too many inquiries can lower your score
   - Space out credit applications

**Building Good Credit Habits:**

1. **Pay Bills on Time**
   - Set up automatic payments
   - Use payment reminders
   - Pay at least the minimum due

2. **Keep Balances Low**
   - Pay off credit cards monthly
   - Don't max out credit cards
   - Request credit limit increases

3. **Monitor Your Credit Report**
   - Check annually at annualcreditreport.com
   - Dispute any errors immediately
   - Use free credit monitoring services

4. **Be Patient**
   - Good credit takes time to build
   - Avoid quick-fix schemes
   - Consistent habits pay off

**Benefits of Good Credit:**
- Lower interest rates on loans
- Better credit card offers
- Easier apartment rentals
- Lower insurance premiums
- Better job opportunities

Building good credit is a lifelong process that requires patience and discipline, but the financial benefits are substantial.`,
      trending: true
    },
    {
      id: 6,
      title: 'Planning for Retirement Early',
      category: 'Retirement',
      readTime: '8 min',
      content: 'The earlier you start saving for retirement, the more time your money has to grow. Take advantage of compound interest and employer matching programs.',
      fullContent: `Retirement planning is one of the most important financial goals you can have. Starting early gives you a tremendous advantage through the power of compound interest.

**Why Start Early?**
- Compound interest works best over time
- You need less money per month if you start young
- More time to recover from market downturns
- Less financial stress later in life

**Retirement Account Options:**

1. **401(k) Plans**
   - Employer-sponsored retirement accounts
   - Often include employer matching
   - Higher contribution limits
   - Tax advantages

2. **Traditional IRA**
   - Tax-deductible contributions
   - Taxed when you withdraw in retirement
   - Anyone with earned income can contribute

3. **Roth IRA**
   - After-tax contributions
   - Tax-free withdrawals in retirement
   - Income limits apply

**Employer Matching:**
- Free money from your employer
- Typically 3-6% of your salary
- Always contribute enough to get full match
- It's an instant 100% return on investment

**How Much to Save:**
- **Start**: At least enough to get employer match
- **Early Career**: 10-15% of income
- **Mid-Career**: 15-20% of income
- **Late Career**: 20%+ of income

**Retirement Planning Steps:**

1. **Calculate Your Retirement Needs**
   - Estimate retirement expenses
   - Account for inflation
   - Plan for healthcare costs

2. **Start with Employer Plans**
   - Maximize employer matching
   - Increase contributions annually
   - Take advantage of automatic enrollment

3. **Open an IRA**
   - Supplement employer plan
   - More investment options
   - Additional tax advantages

4. **Diversify Investments**
   - Mix of stocks, bonds, and other assets
   - Adjust risk tolerance over time
   - Rebalance regularly

**Common Retirement Mistakes:**
- Starting too late
- Not taking advantage of employer match
- Being too conservative with investments
- Cashing out early
- Not increasing contributions over time

**The Power of Starting Early:**
If you start saving $200/month at age 25, you could have over $525,000 by age 65 (assuming 7% annual returns). Wait until age 35, and you'd have only about $245,000.

The key is to start now, even if it's just a small amount. Time is your greatest asset in retirement planning.`,
      trending: false
    },
    {
      id: 7,
      title: 'Managing Debt Effectively',
      category: 'Debt',
      readTime: '6 min',
      content: 'List all your debts and prioritize paying off high-interest debt first. Consider debt consolidation or balance transfers to reduce interest payments.',
      fullContent: `Debt can be overwhelming, but with the right strategy, you can take control and work toward financial freedom. Here's how to manage debt effectively:

**Types of Debt:**

1. **Good Debt**
   - Mortgages (builds equity)
   - Student loans (increases earning potential)
   - Business loans (can generate income)

2. **Bad Debt**
   - Credit card debt (high interest)
   - Payday loans (extremely high interest)
   - Auto loans (depreciating asset)

**Debt Repayment Strategies:**

1. **Debt Avalanche Method**
   - Pay minimums on all debts
   - Put extra money toward highest interest debt
   - Mathematically optimal
   - Saves the most money

2. **Debt Snowball Method**
   - Pay minimums on all debts
   - Put extra money toward smallest balance
   - Provides psychological wins
   - Builds momentum

**Steps to Manage Debt:**

1. **List All Your Debts**
   - Balance owed
   - Interest rate
   - Minimum payment
   - Due date

2. **Create a Debt Repayment Plan**
   - Choose avalanche or snowball method
   - Set realistic timelines
   - Automate payments when possible

3. **Find Extra Money**
   - Cut unnecessary expenses
   - Increase income with side hustles
   - Use windfalls (tax refunds, bonuses)

4. **Avoid Taking on New Debt**
   - Use cash or debit instead of credit
   - Build an emergency fund
   - Address spending habits

**Debt Consolidation Options:**

1. **Balance Transfer Credit Cards**
   - Transfer high-interest debt to low-interest card
   - Often 0% introductory rates
   - Pay off before rate increases

2. **Personal Loans**
   - Fixed interest rate
   - Fixed payment schedule
   - Often lower rates than credit cards

3. **Home Equity Loans**
   - Use home equity as collateral
   - Lower interest rates
   - Risk: Could lose your home

**When to Seek Help:**
- Debt payments exceed 40% of income
- Only making minimum payments
- Using credit for basic necessities
- Feeling overwhelmed or stressed

**Professional Help Options:**
- Credit counseling agencies
- Debt management plans
- Financial advisors
- Bankruptcy attorney (last resort)

**Staying Debt-Free:**
1. Build an emergency fund
2. Live below your means
3. Use credit responsibly
4. Regularly review your finances
5. Celebrate debt-free milestones

Remember, getting out of debt takes time and discipline, but it's one of the most important steps toward financial freedom.`,
      trending: false
    },
    {
      id: 8,
      title: 'Insurance: Protecting Your Financial Future',
      category: 'Insurance',
      readTime: '7 min',
      content: 'Insurance protects you from financial losses. Health, life, and disability insurance are essential. Choose coverage that fits your needs and budget.',
      fullContent: `Insurance is a crucial part of financial planning that protects you from unexpected financial losses. Here's what you need to know:

**What is Insurance?**
Insurance is a contract where you pay premiums in exchange for protection against specific financial losses. It transfers risk from you to the insurance company.

**Essential Types of Insurance:**

1. **Health Insurance**
   - Covers medical expenses
   - Prevents medical bankruptcy
   - Often required by law
   - Choose based on health needs and budget

2. **Life Insurance**
   - Provides income replacement for beneficiaries
   - Covers funeral expenses
   - Pays off debts and mortgages
   - Essential if others depend on your income

3. **Disability Insurance**
   - Replaces income if you can't work
   - Short-term and long-term options
   - Often overlooked but crucial
   - Protects your most valuable asset: earning ability

4. **Auto Insurance**
   - Required in most states
   - Liability coverage protects others
   - Comprehensive and collision protect your vehicle
   - Uninsured motorist coverage recommended

5. **Homeowners/Renters Insurance**
   - Protects your home and belongings
   - Provides liability coverage
   - Covers additional living expenses
   - Required by mortgage lenders

**Types of Life Insurance:**

1. **Term Life Insurance**
   - Temporary coverage (10, 20, or 30 years)
   - Lower premiums
   - Best for most people
   - Covers specific financial obligations

2. **Whole Life Insurance**
   - Permanent coverage
   - Builds cash value
   - Higher premiums
   - Investment component

**How Much Insurance Do You Need?**

**Life Insurance:**
- 10-12 times your annual income
- Consider debts, mortgage, and future expenses
- Adjust based on savings and other assets

**Disability Insurance:**
- 60-70% of your income
- Consider elimination period
- Look for "own occupation" coverage

**Choosing Insurance:**

1. **Assess Your Risks**
   - What could cause financial hardship?
   - What assets need protection?
   - Who depends on your income?

2. **Shop Around**
   - Compare quotes from multiple companies
   - Check financial strength ratings
   - Read policy details carefully

3. **Consider Your Budget**
   - Balance coverage with affordability
   - Higher deductibles = lower premiums
   - Don't over-insure or under-insure

4. **Review Regularly**
   - Life changes affect insurance needs
   - Update beneficiaries
   - Adjust coverage as needed

**Insurance Mistakes to Avoid:**
- Buying too little coverage
- Focusing only on price
- Not reading policy details
- Forgetting to update beneficiaries
- Canceling policies during tough times

**Money-Saving Tips:**
- Bundle policies with one company
- Increase deductibles
- Maintain good credit
- Ask about discounts
- Review and compare annually

**When You Don't Need Insurance:**
- Extended warranties on electronics
- Credit life insurance
- Flight insurance
- Mortgage life insurance

Insurance isn't exciting, but it's essential for protecting your financial future. The key is finding the right balance of coverage and cost for your specific situation.`,
      trending: true
    }
  ];

  const handleReadArticle = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={handleCloseArticle}
                className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Articles
              </button>
              <button
                onClick={handleCloseArticle}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mb-4">
              <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-3 py-1 rounded-full">
                {selectedArticle.category}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {selectedArticle.title}
            </h1>
            
            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-8">
              <Clock className="w-4 h-4 mr-1" />
              <span>{selectedArticle.readTime}</span>
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              {selectedArticle.fullContent.split('\n').map((paragraph, index) => {
                if (paragraph.trim() === '') return null;
                
                if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                  return (
                    <h3 key={index} className="text-xl font-bold text-gray-900 dark:text-white mt-6 mb-3">
                      {paragraph.slice(2, -2)}
                    </h3>
                  );
                }
                
                if (paragraph.startsWith('1. **') || paragraph.startsWith('2. **') || paragraph.startsWith('3. **') || paragraph.startsWith('4. **') || paragraph.startsWith('5. **')) {
                  return (
                    <div key={index} className="mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {paragraph.substring(0, paragraph.indexOf('**', 3) + 2).replace(/\*\*/g, '')}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 ml-4">
                        {paragraph.substring(paragraph.indexOf('**', 3) + 2).trim()}
                      </p>
                    </div>
                  );
                }
                
                if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="text-gray-700 dark:text-gray-300 mb-1 ml-4">
                      {paragraph.substring(2)}
                    </li>
                  );
                }
                
                return (
                  <p key={index} className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {articles.map((article) => (
              <div key={article.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm px-3 py-1 rounded-full">
                      {article.category}
                    </span>
                    {article.trending && (
                      <span className="inline-flex items-center bg-red-100 text-red-800 text-sm px-2 py-1 rounded-full">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Trending
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{article.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{article.content}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="flex items-center space-x-1 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </span>
                    <button 
                      className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => handleReadArticle(article)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialEducation;