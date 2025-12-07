import Image from 'next/image';
import Link from 'next/link';
import { Calculator, Heart, TrendingUp, Clock } from 'lucide-react';

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
    title: 'Financial Calculators',
    icon: TrendingUp,
    gradient: 'from-blue-500 to-cyan-500',
    mainLink: '/mortgage-calculator',
    links: [
      { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
      { name: 'Loan Calculator', href: '/loan-calculator' },
      { name: 'Auto Loan Calculator', href: '/auto-loan-calculator' },
      { name: 'Interest Calculator', href: '/interest-calculator' },
      { name: 'Payment Calculator', href: '/payment-calculator' },
      { name: 'Retirement Calculator', href: '/retirement-calculator' },
      { name: 'Amortization Calculator', href: '/amortization-calculator' },
      { name: 'Investment Calculator', href: '/investment-calculator' },
    ],
  },
  {
    title: 'Fitness & Health',
    icon: Heart,
    gradient: 'from-pink-500 to-rose-500',
    mainLink: '/bmi-calculator',
    links: [
      { name: 'BMI Calculator', href: '/bmi-calculator' },
      { name: 'Calorie Calculator', href: '/calorie-calculator' },
      { name: 'Body Fat Calculator', href: '/body-fat-calculator' },
      { name: 'BMR Calculator', href: '/bmr-calculator' },
      { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator' },
      { name: 'Pace Calculator', href: '/pace-calculator' },
      { name: 'Pregnancy Calculator', href: '/pregnancy-calculator' },
      { name: 'Due Date Calculator', href: '/due-date-calculator' },
    ],
  },
  {
    title: 'Math Calculators',
    icon: Calculator,
    gradient: 'from-purple-500 to-indigo-500',
    mainLink: '/scientific-calculator',
    links: [
      { name: 'Scientific Calculator', href: '/scientific-calculator' },
      { name: 'Fraction Calculator', href: '/fraction-calculator' },
      { name: 'Percentage Calculator', href: '/percentage-calculator' },
      { name: 'Random Number Generator', href: '/random-number-generator' },
      { name: 'Triangle Calculator', href: '/triangle-calculator' },
      { name: 'Standard Deviation', href: '/standard-deviation-calculator' },
    ],
  },
  {
    title: 'Other Calculators',
    icon: Clock,
    gradient: 'from-amber-500 to-orange-500',
    mainLink: '/age-calculator',
    links: [
      { name: 'Age Calculator', href: '/age-calculator' },
      { name: 'Date Calculator', href: '/date-calculator' },
      { name: 'Time Calculator', href: '/time-calculator' },
      { name: 'Hours Calculator', href: '/hours-calculator' },
      { name: 'GPA Calculator', href: '/gpa-calculator' },
      { name: 'Grade Calculator', href: '/grade-calculator' },
      { name: 'Password Generator', href: '/password-generator' },
      { name: 'Conversion Calculator', href: '/conversion-calculator' },
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoriesData.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.title} 
                className="group bg-white/60 backdrop-blur-xl rounded-2xl shadow-lg border border-border/50 p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link href={category.mainLink} className="block mb-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.gradient} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-4 group-hover:text-primary transition-colors">
                    {category.title}
                  </h3>
                </Link>
                
                <ul className="space-y-2">
                  {category.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group/link"
                      >
                        <span className="w-1 h-1 rounded-full bg-muted-foreground group-hover/link:bg-primary transition-colors"></span>
                        {link.name}
                      </Link>
                    </li>
                  ))}
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