"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Calculator, Heart, TrendingUp, Clock, Home, PiggyBank, DollarSign, Car, ChevronDown, ChevronUp, Search } from 'lucide-react';

interface CategoryLink {
  name: string;
  href: string;
}

interface Category {
  title: string;
  icon: any;
  gradient: string;
  bgGradient: string;
  mainLink: string;
  links: CategoryLink[];
}

const categoriesData: Category[] = [
  {
    title: 'Mortgage & Real Estate',
    icon: Home,
    gradient: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20',
    mainLink: '/mortgage-calculator',
    links: [
      { name: 'Mortgage', href: '/mortgage-calculator' },
      { name: 'Amortization', href: '/amortization-calculator' },
      { name: 'Mortgage Payoff', href: '/mortgage-payoff-calculator' },
      { name: 'House Affordability', href: '/house-affordability-calculator' },
      { name: 'Rent', href: '/rent-calculator' },
      { name: 'Debt-to-Income Ratio', href: '/debt-to-income-calculator' },
      { name: 'Real Estate', href: '/real-estate-calculator' },
      { name: 'Refinance', href: '/refinance-calculator' },
      { name: 'Rental Property', href: '/rental-property-calculator' },
      { name: 'APR', href: '/apr-calculator' },
      { name: 'FHA Loan', href: '/fha-loan-calculator' },
      { name: 'VA Mortgage', href: '/va-mortgage-calculator' },
      { name: 'Home Equity Loan', href: '/home-equity-loan-calculator' },
      { name: 'HELOC', href: '/heloc-calculator' },
      { name: 'Down Payment', href: '/down-payment-calculator' },
      { name: 'Rent vs. Buy', href: '/rent-vs-buy-calculator' },
    ],
  },
  {
    title: 'Retirement',
    icon: PiggyBank,
    gradient: 'from-emerald-500 to-teal-500',
    bgGradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20',
    mainLink: '/retirement-calculator',
    links: [
      { name: 'Retirement', href: '/retirement-calculator' },
      { name: '401K', href: '/401k-calculator' },
      { name: 'Pension', href: '/pension-calculator' },
      { name: 'Social Security', href: '/social-security-calculator' },
      { name: 'Annuity', href: '/annuity-calculator' },
      { name: 'Annuity Payout', href: '/annuity-payout-calculator' },
      { name: 'Roth IRA', href: '/roth-ira-calculator' },
      { name: 'IRA', href: '/ira-calculator' },
      { name: 'RMD', href: '/rmd-calculator' },
    ],
  },
  {
    title: 'Tax & Salary',
    icon: DollarSign,
    gradient: 'from-violet-500 to-purple-500',
    bgGradient: 'from-violet-50 to-purple-50 dark:from-violet-900/20 dark:to-purple-900/20',
    mainLink: '/income-tax-calculator',
    links: [
      { name: 'Income Tax', href: '/income-tax-calculator' },
      { name: 'Salary', href: '/salary-calculator' },
      { name: 'Marriage Tax', href: '/marriage-tax-calculator' },
      { name: 'Estate Tax', href: '/estate-tax-calculator' },
      { name: 'Take-Home Paycheck', href: '/take-home-paycheck-calculator' },
      { name: 'Sales Tax', href: '/sales-tax-calculator' },
    ],
  },
  {
    title: 'Auto & Investment',
    icon: Car,
    gradient: 'from-orange-500 to-amber-500',
    bgGradient: 'from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20',
    mainLink: '/auto-loan-calculator',
    links: [
      { name: 'Auto Loan', href: '/auto-loan-calculator' },
      { name: 'Auto Lease', href: '/auto-lease-calculator' },
      { name: 'Interest', href: '/interest-calculator' },
      { name: 'Investment', href: '/investment-calculator' },
      { name: 'Compound Interest', href: '/compound-interest-calculator' },
      { name: 'Savings', href: '/savings-calculator' },
      { name: 'Simple Interest', href: '/simple-interest-calculator' },
      { name: 'Loan', href: '/loan-calculator' },
      { name: 'Payment', href: '/payment-calculator' },
    ],
  },
  {
    title: 'Fitness & Health',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    bgGradient: 'from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20',
    mainLink: '/bmi-calculator',
    links: [
      { name: 'BMI', href: '/bmi-calculator' },
      { name: 'Calorie', href: '/calorie-calculator' },
      { name: 'Body Fat', href: '/body-fat-calculator' },
      { name: 'BMR', href: '/bmr-calculator' },
      { name: 'Macro', href: '/macro-calculator' },
      { name: 'Ideal Weight', href: '/ideal-weight-calculator' },
      { name: 'Pregnancy', href: '/pregnancy-calculator' },
      { name: 'Pace', href: '/pace-calculator' },
    ],
  },
  {
    title: 'Math Calculators',
    icon: Calculator,
    gradient: 'from-indigo-500 to-blue-500',
    bgGradient: 'from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20',
    mainLink: '/scientific-calculator',
    links: [
      { name: 'Scientific', href: '/scientific-calculator' },
      { name: 'Fraction', href: '/fraction-calculator' },
      { name: 'Percentage', href: '/percentage-calculator' },
      { name: 'Triangle', href: '/triangle-calculator' },
      { name: 'Volume', href: '/volume-calculator' },
      { name: 'Standard Deviation', href: '/standard-deviation-calculator' },
      { name: 'Random Number', href: '/random-number-generator' },
    ],
  },
  {
    title: 'Other Calculators',
    icon: Clock,
    gradient: 'from-slate-500 to-gray-500',
    bgGradient: 'from-slate-50 to-gray-50 dark:from-slate-900/20 dark:to-gray-900/20',
    mainLink: '/age-calculator',
    links: [
      { name: 'Age', href: '/age-calculator' },
      { name: 'Date', href: '/date-calculator' },
      { name: 'Time', href: '/time-calculator' },
      { name: 'Hours', href: '/hours-calculator' },
      { name: 'GPA', href: '/gpa-calculator' },
      { name: 'Grade', href: '/grade-calculator' },
      { name: 'Concrete', href: '/concrete-calculator' },
      { name: 'Password Generator', href: '/password-generator' },
    ],
  },
];

const CategoryCard = ({ category }: { category: Category }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const IconComponent = category.icon;
  const visibleLinks = isExpanded ? category.links : category.links.slice(0, 5);

  return (
    <div className={`group bg-gradient-to-br ${category.bgGradient} rounded-2xl border border-border/50 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1`}>
      <Link href={category.mainLink} className="block p-5">
        <div className="flex items-center gap-4 mb-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold group-hover:text-primary transition-colors">
              {category.title}
            </h3>
            <p className="text-xs text-muted-foreground">{category.links.length} calculators</p>
          </div>
        </div>
      </Link>
      
      <div className="px-5 pb-4">
        <div className="grid grid-cols-2 gap-2">
          {visibleLinks.map((link) => (
            <Link 
              key={link.name}
              href={link.href} 
              className="text-sm text-muted-foreground hover:text-primary transition-colors py-1.5 px-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50 truncate"
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {category.links.length > 5 && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-3 w-full flex items-center justify-center gap-1 text-xs font-medium text-primary hover:text-primary/80 transition-colors py-2 rounded-lg hover:bg-white/50 dark:hover:bg-slate-800/50"
          >
            {isExpanded ? (
              <>Show Less <ChevronUp className="w-3 h-3" /></>
            ) : (
              <>+{category.links.length - 5} more <ChevronDown className="w-3 h-3" /></>
            )}
          </button>
        )}
      </div>
    </div>
  );
};

const CalculatorCategories = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredCategories = searchQuery.trim() 
    ? categoriesData.map(cat => ({
        ...cat,
        links: cat.links.filter(link => 
          link.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.links.length > 0)
    : categoriesData;

  return (
    <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Explore Calculator Categories</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            Choose from our comprehensive collection of specialized calculators
          </p>
          
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Filter categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 bg-white dark:bg-slate-800 border border-border rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredCategories.map((category) => (
            <CategoryCard key={category.title} category={category} />
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No calculators found matching "{searchQuery}"</p>
          </div>
        )}

        <div className="flex justify-center mt-12">
          <Link 
            href="/calculators" 
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-[0.98] flex items-center gap-2 group"
          >
            View All Calculators
            <Calculator className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalculatorCategories;
