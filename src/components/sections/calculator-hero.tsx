"use client";

import React, { useState, useMemo, useRef, useEffect, FC, HTMLAttributes } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';

const allCalculators = [
  // Mortgage & Real Estate
  { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
  { name: 'Amortization Calculator', href: '/amortization-calculator' },
  { name: 'Mortgage Payoff Calculator', href: '/mortgage-payoff-calculator' },
  { name: 'House Affordability Calculator', href: '/house-affordability-calculator' },
  { name: 'Rent Calculator', href: '/rent-calculator' },
  { name: 'Debt-to-Income Ratio Calculator', href: '/debt-to-income-calculator' },
  { name: 'Real Estate Calculator', href: '/real-estate-calculator' },
  { name: 'Refinance Calculator', href: '/refinance-calculator' },
  { name: 'Rental Property Calculator', href: '/rental-property-calculator' },
  { name: 'APR Calculator', href: '/apr-calculator' },
  { name: 'FHA Loan Calculator', href: '/fha-loan-calculator' },
  { name: 'VA Mortgage Calculator', href: '/va-mortgage-calculator' },
  { name: 'Home Equity Loan Calculator', href: '/home-equity-loan-calculator' },
  { name: 'HELOC Calculator', href: '/heloc-calculator' },
  { name: 'Down Payment Calculator', href: '/down-payment-calculator' },
  { name: 'Rent vs. Buy Calculator', href: '/rent-vs-buy-calculator' },
  // Retirement
  { name: 'Retirement Calculator', href: '/retirement-calculator' },
  { name: '401K Calculator', href: '/401k-calculator' },
  { name: 'Pension Calculator', href: '/pension-calculator' },
  { name: 'Social Security Calculator', href: '/social-security-calculator' },
  { name: 'Annuity Calculator', href: '/annuity-calculator' },
  { name: 'Annuity Payout Calculator', href: '/annuity-payout-calculator' },
  { name: 'Roth IRA Calculator', href: '/roth-ira-calculator' },
  { name: 'IRA Calculator', href: '/ira-calculator' },
  { name: 'RMD Calculator', href: '/rmd-calculator' },
  // Tax & Salary
  { name: 'Income Tax Calculator', href: '/income-tax-calculator' },
  { name: 'Salary Calculator', href: '/salary-calculator' },
  { name: 'Marriage Tax Calculator', href: '/marriage-tax-calculator' },
  { name: 'Estate Tax Calculator', href: '/estate-tax-calculator' },
  { name: 'Take-Home Paycheck Calculator', href: '/take-home-paycheck-calculator' },
  { name: 'Sales Tax Calculator', href: '/sales-tax-calculator' },
  { name: 'Tax Calculator', href: '/tax-calculator' },
  // Auto
  { name: 'Auto Loan Calculator', href: '/auto-loan-calculator' },
  { name: 'Auto Lease Calculator', href: '/auto-lease-calculator' },
  // Investment
  { name: 'Loan Calculator', href: '/loan-calculator' },
  { name: 'Interest Calculator', href: '/interest-calculator' },
  { name: 'Payment Calculator', href: '/payment-calculator' },
  { name: 'Investment Calculator', href: '/investment-calculator' },
  { name: 'Currency Calculator', href: '/currency-calculator' },
  { name: 'Inflation Calculator', href: '/inflation-calculator' },
  { name: 'Compound Interest Calculator', href: '/compound-interest-calculator' },
  { name: 'Interest Rate Calculator', href: '/interest-rate-calculator' },
  { name: 'Finance Calculator', href: '/finance-calculator' },
  { name: 'Savings Calculator', href: '/savings-calculator' },
  { name: 'Simple Interest Calculator', href: '/simple-interest-calculator' },
  // Fitness & Health
  { name: 'BMI Calculator', href: '/bmi-calculator' },
  { name: 'Calorie Calculator', href: '/calorie-calculator' },
  { name: 'Body Fat Calculator', href: '/body-fat-calculator' },
  { name: 'BMR Calculator', href: '/bmr-calculator' },
  { name: 'Macro Calculator', href: '/macro-calculator' },
  { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator' },
  { name: 'Pregnancy Calculator', href: '/pregnancy-calculator' },
  { name: 'Pregnancy Weight Gain Calculator', href: '/pregnancy-weight-gain-calculator' },
  { name: 'Pregnancy Conception Calculator', href: '/pregnancy-conception-calculator' },
  { name: 'Due Date Calculator', href: '/due-date-calculator' },
  { name: 'Pace Calculator', href: '/pace-calculator' },
  // Math
  { name: 'Scientific Calculator', href: '/scientific-calculator' },
  { name: 'Fraction Calculator', href: '/fraction-calculator' },
  { name: 'Percentage Calculator', href: '/percentage-calculator' },
  { name: 'Triangle Calculator', href: '/triangle-calculator' },
  { name: 'Volume Calculator', href: '/volume-calculator' },
  { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator' },
  { name: 'Random Number Generator', href: '/random-number-generator' },
  // Other
  { name: 'Age Calculator', href: '/age-calculator' },
  { name: 'Date Calculator', href: '/date-calculator' },
  { name: 'Time Calculator', href: '/time-calculator' },
  { name: 'Hours Calculator', href: '/hours-calculator' },
  { name: 'GPA Calculator', href: '/gpa-calculator' },
  { name: 'Grade Calculator', href: '/grade-calculator' },
  { name: 'Concrete Calculator', href: '/concrete-calculator' },
  { name: 'IP Subnet Calculator', href: '/ip-subnet-calculator' },
  { name: 'Bra Size Calculator', href: '/bra-size-calculator' },
  { name: 'Password Generator', href: '/password-generator' },
  { name: 'Dice Roller', href: '/dice-roller' },
  { name: 'Conversion Calculator', href: '/conversion-calculator' },
];

type SciButtonProps = {
  children: React.ReactNode;
  variant?: 'function' | 'number' | 'operator' | 'special';
  className?: string;
  onClick?: () => void;
} & HTMLAttributes<HTMLButtonElement>;

const SciButton: FC<SciButtonProps> = ({ children, variant = 'function', className = '', onClick, ...props }) => {
  const baseClasses = "flex items-center justify-center min-w-[50px] h-11 rounded-lg text-sm font-medium cursor-pointer transition-all active:scale-95";
  
  const variantClasses = {
    function: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm',
    number: 'bg-white text-foreground font-semibold hover:bg-gray-50 shadow-md border border-border',
    operator: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-md',
    special: 'bg-accent text-accent-foreground hover:bg-accent/90 shadow-md',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
};


const CalculatorHero = () => {
    const [angleUnit, setAngleUnit] = useState<'Deg' | 'Rad'>('Deg');
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');
    const [memory, setMemory] = useState(0);
    const [lastAnswer, setLastAnswer] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const filteredCalculators = useMemo(() => {
      if (!searchQuery.trim()) return [];
      const query = searchQuery.toLowerCase();
      return allCalculators.filter(calc => 
        calc.name.toLowerCase().includes(query)
      ).slice(0, 8);
    }, [searchQuery]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
          setShowResults(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setShowResults(true);
    };

    const handlePopularSearch = (term: string) => {
      setSearchQuery(term);
      setShowResults(true);
    };

    const toRadians = (deg: number) => deg * (Math.PI / 180);
    const toDegrees = (rad: number) => rad * (180 / Math.PI);

    const handleNumber = (num: string) => {
        if (display === '0' || display === 'Error') {
            setDisplay(num);
            setExpression(num);
        } else {
            setDisplay(display + num);
            setExpression(expression + num);
        }
    };

    const handleOperator = (op: string) => {
        if (display === 'Error') return;
        setExpression(expression + op);
        setDisplay(display + op);
    };

    const handleFunction = (func: string) => {
        if (display === 'Error') return;
        
        try {
            const currentValue = parseFloat(display) || 0;
            let result = 0;

            switch(func) {
                case 'sin':
                    result = angleUnit === 'Deg' ? Math.sin(toRadians(currentValue)) : Math.sin(currentValue);
                    break;
                case 'cos':
                    result = angleUnit === 'Deg' ? Math.cos(toRadians(currentValue)) : Math.cos(currentValue);
                    break;
                case 'tan':
                    result = angleUnit === 'Deg' ? Math.tan(toRadians(currentValue)) : Math.tan(currentValue);
                    break;
                case 'sin-1':
                    result = angleUnit === 'Deg' ? toDegrees(Math.asin(currentValue)) : Math.asin(currentValue);
                    break;
                case 'cos-1':
                    result = angleUnit === 'Deg' ? toDegrees(Math.acos(currentValue)) : Math.acos(currentValue);
                    break;
                case 'tan-1':
                    result = angleUnit === 'Deg' ? toDegrees(Math.atan(currentValue)) : Math.atan(currentValue);
                    break;
                case 'sqrt':
                    result = Math.sqrt(currentValue);
                    break;
                case 'cbrt':
                    result = Math.cbrt(currentValue);
                    break;
                case 'ln':
                    result = Math.log(currentValue);
                    break;
                case 'log':
                    result = Math.log10(currentValue);
                    break;
                case '1/x':
                    result = 1 / currentValue;
                    break;
                case 'x2':
                    result = currentValue ** 2;
                    break;
                case 'x3':
                    result = currentValue ** 3;
                    break;
                case 'ex':
                    result = Math.exp(currentValue);
                    break;
                case '10x':
                    result = Math.pow(10, currentValue);
                    break;
                case 'factorial':
                    result = factorial(currentValue);
                    break;
                case '±':
                    result = -currentValue;
                    break;
            }

            setDisplay(result.toString());
            setExpression(result.toString());
        } catch {
            setDisplay('Error');
        }
    };

    const factorial = (n: number): number => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    };

    const calculate = () => {
        try {
            let expr = expression
                .replace(/×/g, '*')
                .replace(/÷/g, '/')
                .replace(/–/g, '-')
                .replace(/π/g, Math.PI.toString())
                .replace(/e(?!x)/g, Math.E.toString());

            const result = eval(expr);
            setDisplay(result.toString());
            setExpression(result.toString());
            setLastAnswer(result);
        } catch {
            setDisplay('Error');
        }
    };

    const clearAll = () => {
        setDisplay('0');
        setExpression('');
    };

    const backspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
            setExpression(expression.slice(0, -1));
        } else {
            setDisplay('0');
            setExpression('');
        }
    };

    return (
        <section className="pt-24 pb-16 px-6">
            <div className="max-w-7xl mx-auto">
                {/* Hero Title */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                        Modern Calculator Suite
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Professional-grade calculators for finance, math, health, and more
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row items-start gap-8">
                    {/* Calculator */}
                    <div className="w-full lg:w-auto flex-shrink-0 flex justify-center">
                        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl shadow-xl border border-border/50 w-fit">
                            {/* Display */}
                            <div className="mb-4">
                                <div className="h-6 text-sm text-right text-muted-foreground overflow-hidden mb-2">{expression || '\u00A0'}</div>
                                <div className="bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm text-foreground text-3xl font-bold text-right p-4 rounded-xl border border-border/50 min-h-[60px] flex items-center justify-end overflow-x-auto">{display}</div>
                            </div>
                            
                            {/* Buttons */}
                            <div className="flex gap-3">
                                {/* Functions */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 items-center">
                                        <SciButton variant="function" onClick={() => handleFunction('sin')}>sin</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('cos')}>cos</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('tan')}>tan</SciButton>
                                        <div className="flex items-center gap-3 px-3 h-11">
                                            <label className="flex items-center cursor-pointer text-sm font-medium">
                                                <input type="radio" name="angle" value="Deg" checked={angleUnit === 'Deg'} onChange={() => setAngleUnit('Deg')} className="mr-1.5 accent-primary" />
                                                Deg
                                            </label>
                                            <label className="flex items-center cursor-pointer text-sm font-medium">
                                                <input type="radio" name="angle" value="Rad" checked={angleUnit === 'Rad'} onChange={() => setAngleUnit('Rad')} className="mr-1.5 accent-primary" />
                                                Rad
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <SciButton variant="function" onClick={() => handleFunction('sin-1')}>sin<sup>-1</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('cos-1')}>cos<sup>-1</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('tan-1')}>tan<sup>-1</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleOperator('*' + Math.PI.toString())}>π</SciButton>
                                        <SciButton variant="function" onClick={() => handleOperator('*' + Math.E.toString())}>e</SciButton>
                                    </div>
                                    <div className="flex gap-2">
                                        <SciButton variant="function" onClick={() => handleOperator('**')}>x<sup>y</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('x3')}>x<sup>3</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('x2')}>x<sup>2</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('ex')}>e<sup>x</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('10x')}>10<sup>x</sup></SciButton>
                                    </div>
                                    <div className="flex gap-2">
                                        <SciButton variant="function" onClick={() => handleOperator('**(1/')}><sup>y</sup>√x</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('cbrt')}><sup>3</sup>√x</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('sqrt')}>√x</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('ln')}>ln</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('log')}>log</SciButton>
                                    </div>
                                    <div className="flex gap-2">
                                        <SciButton variant="function" onClick={() => handleOperator('(')}>(</SciButton>
                                        <SciButton variant="function" onClick={() => handleOperator(')')}>)</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('1/x')}>1/x</SciButton>
                                        <SciButton variant="function" onClick={() => handleOperator('/100')}>%</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('factorial')}>n!</SciButton>
                                    </div>
                                </div>
                                
                                {/* Numbers & Operators */}
                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2">
                                        <SciButton variant="number" onClick={() => handleNumber('7')}>7</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('8')}>8</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('9')}>9</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('+')}>+</SciButton>
                                        <SciButton variant="operator" onClick={backspace}>←</SciButton>
                                    </div>
                                    <div className="flex gap-2">
                                        <SciButton variant="number" onClick={() => handleNumber('4')}>4</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('5')}>5</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('6')}>6</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('-')}>−</SciButton>
                                        <SciButton variant="operator" onClick={() => setDisplay(lastAnswer.toString())}>Ans</SciButton>
                                    </div>
                                    <div className="flex gap-2">
                                        <SciButton variant="number" onClick={() => handleNumber('1')}>1</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('2')}>2</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('3')}>3</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('*')}>×</SciButton>
                                        <SciButton variant="operator" onClick={() => setMemory(memory + parseFloat(display))}>M+</SciButton>
                                    </div>
                                    <div className="flex gap-2">
                                        <SciButton variant="number" onClick={() => handleNumber('0')}>0</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('.')}>.</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('e')}>EXP</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('/')}>/</SciButton>
                                        <SciButton variant="operator" onClick={() => setMemory(memory - parseFloat(display))}>M−</SciButton>
                                    </div>
                                    <div className="flex gap-2">
                                        <SciButton variant="operator" onClick={() => handleFunction('±')}>±</SciButton>
                                        <SciButton variant="operator" onClick={() => setDisplay(Math.random().toString())}>RND</SciButton>
                                        <SciButton variant="special" onClick={clearAll}>AC</SciButton>
                                        <SciButton variant="special" onClick={calculate}>=</SciButton>
                                        <SciButton variant="operator" onClick={() => setDisplay(memory.toString())}>MR</SciButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Search Section */}
                    <div className="flex-grow w-full lg:w-auto">
                        <div className="bg-white/60 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-border/50">
                            <h2 className="text-2xl font-bold mb-6">Find Your Calculator</h2>
                            <div className="space-y-4" ref={searchRef}>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search calculators..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onFocus={() => setShowResults(true)}
                                        className="w-full h-12 bg-white border border-border rounded-xl pl-12 pr-4 text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    />
                                    {showResults && filteredCalculators.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl z-50 overflow-hidden">
                                            {filteredCalculators.map((calc) => (
                                                <Link
                                                    key={calc.href}
                                                    href={calc.href}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors border-b border-border/50 last:border-b-0"
                                                    onClick={() => setShowResults(false)}
                                                >
                                                    <Search className="w-4 h-4 text-muted-foreground" />
                                                    <span className="text-sm font-medium">{calc.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    {showResults && searchQuery.trim() && filteredCalculators.length === 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-border rounded-xl shadow-xl z-50 p-4">
                                            <p className="text-sm text-muted-foreground text-center">No calculators found for "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-8 border-t border-border">
                                <h3 className="text-sm font-semibold text-muted-foreground mb-4">POPULAR SEARCHES</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Mortgage', 'BMI', 'Loan', 'Age', 'Percentage'].map((tag) => (
                                        <button 
                                            key={tag} 
                                            onClick={() => handlePopularSearch(tag)}
                                            className="px-3 py-1.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 cursor-pointer transition-colors"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CalculatorHero;