import Image from 'next/image';
import Link from 'next/link';
import { Calculator, Heart, TrendingUp, Clock, Home, PiggyBank, DollarSign, Car } from 'lucide-react';

interface CategoryLink {
  name: string;
  href: string;
}

interface Category {
  title: string;
  icon: any;
  gradient: string;
  mainLink: string;
  links: CategoryLink[];
}

const categoriesData: Category[] = [
  {
    title: 'Mortgage & Real Estate',
    icon: Home,
    gradient: 'from-blue-500 to-cyan-500',
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

const CalculatorCategories = () => {
  return (
    <section className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Explore Calculator Categories</h2>
          <p className="text-muted-foreground text-lg">Choose from our comprehensive collection of specialized calculators</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoriesData.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title} 
                className="group bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-border/50 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={category.mainLink} className="block mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-center mb-3 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </Link>
                
                <ul className="space-y-1.5">
                  {category.links.slice(0, 8).map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-xs text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group/link"
                      >
                        <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover/link:bg-primary transition-colors"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
                  {category.links.length > 8 && (
                    <li>
                      <Link href="/calculators" className="text-xs text-accent hover:underline">
                        +{category.links.length - 8} more...
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-12">
          <Link 
            href="/calculators" 
            className="px-8 py-4 bg-gradient-to-r from-primary to-accent text-white font-semibold rounded-xl hover:shadow-xl transition-all active:scale-[0.98] flex items-center gap-2"
          >
            View All Calculators
            <Calculator className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CalculatorCategories;