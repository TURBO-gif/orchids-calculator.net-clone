"use client";

import React, { useState, useMemo, useRef, useEffect, FC, HTMLAttributes } from 'react';
import { Search, Delete, RotateCcw, History, Sparkles } from 'lucide-react';
import Link from 'next/link';

const allCalculators = [
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
  { name: 'Retirement Calculator', href: '/retirement-calculator' },
  { name: '401K Calculator', href: '/401k-calculator' },
  { name: 'Pension Calculator', href: '/pension-calculator' },
  { name: 'Social Security Calculator', href: '/social-security-calculator' },
  { name: 'Annuity Calculator', href: '/annuity-calculator' },
  { name: 'Annuity Payout Calculator', href: '/annuity-payout-calculator' },
  { name: 'Roth IRA Calculator', href: '/roth-ira-calculator' },
  { name: 'IRA Calculator', href: '/ira-calculator' },
  { name: 'RMD Calculator', href: '/rmd-calculator' },
  { name: 'Income Tax Calculator', href: '/income-tax-calculator' },
  { name: 'Salary Calculator', href: '/salary-calculator' },
  { name: 'Marriage Tax Calculator', href: '/marriage-tax-calculator' },
  { name: 'Estate Tax Calculator', href: '/estate-tax-calculator' },
  { name: 'Take-Home Paycheck Calculator', href: '/take-home-paycheck-calculator' },
  { name: 'Sales Tax Calculator', href: '/sales-tax-calculator' },
  { name: 'Tax Calculator', href: '/tax-calculator' },
  { name: 'Auto Loan Calculator', href: '/auto-loan-calculator' },
  { name: 'Auto Lease Calculator', href: '/auto-lease-calculator' },
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
  { name: 'Scientific Calculator', href: '/scientific-calculator' },
  { name: 'Fraction Calculator', href: '/fraction-calculator' },
  { name: 'Percentage Calculator', href: '/percentage-calculator' },
  { name: 'Triangle Calculator', href: '/triangle-calculator' },
  { name: 'Volume Calculator', href: '/volume-calculator' },
  { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator' },
  { name: 'Random Number Generator', href: '/random-number-generator' },
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

type ButtonVariant = 'number' | 'operator' | 'function' | 'action' | 'equals';

type CalcButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  className?: string;
  onClick?: () => void;
  span?: number;
} & HTMLAttributes<HTMLButtonElement>;

const CalcButton: FC<CalcButtonProps> = ({ children, variant = 'number', className = '', onClick, span = 1, ...props }) => {
  const baseClasses = "flex items-center justify-center rounded-xl font-semibold cursor-pointer select-none transition-all duration-150 active:scale-95 focus:outline-none focus:ring-2 focus:ring-primary/50";
  
  const sizeClasses = "h-14 sm:h-16 text-lg";
  
  const variantClasses: Record<ButtonVariant, string> = {
    number: 'bg-white dark:bg-slate-800 text-foreground hover:bg-gray-50 dark:hover:bg-slate-700 shadow-md border border-border/50 hover:shadow-lg',
    operator: 'bg-gradient-to-br from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary shadow-md hover:shadow-lg',
    function: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600 border border-slate-200 dark:border-slate-600',
    action: 'bg-gradient-to-br from-destructive to-destructive/90 text-white hover:from-destructive/90 hover:to-destructive shadow-md',
    equals: 'bg-gradient-to-br from-accent to-accent/90 text-white hover:from-accent/90 hover:to-accent shadow-lg hover:shadow-xl',
  };

  const spanClass = span > 1 ? `col-span-${span}` : '';

  return (
    <button 
      className={`${baseClasses} ${sizeClasses} ${variantClasses[variant]} ${spanClass} ${className}`} 
      onClick={onClick} 
      {...props}
    >
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
    const [history, setHistory] = useState<string[]>([]);
    const [showHistory, setShowHistory] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [resultFlash, setResultFlash] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);
    const displayRef = useRef<HTMLDivElement>(null);

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
        setHasError(false);
        if (display === '0' || display === 'Error' || hasError) {
            setDisplay(num);
            setExpression(num);
        } else {
            setDisplay(display + num);
            setExpression(expression + num);
        }
    };

    const handleOperator = (op: string) => {
        if (display === 'Error') return;
        setHasError(false);
        setExpression(expression + op);
        setDisplay(display + op);
    };

    const handleFunction = (func: string) => {
        if (display === 'Error') return;
        setHasError(false);
        
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
            setHasError(true);
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
            const resultStr = result.toString();
            setDisplay(resultStr);
            setExpression(resultStr);
            setLastAnswer(result);
            setHistory(prev => [`${expression} = ${resultStr}`, ...prev.slice(0, 9)]);
            setResultFlash(true);
            setTimeout(() => setResultFlash(false), 500);
        } catch {
            setDisplay('Error');
            setHasError(true);
        }
    };

    const clearAll = () => {
        setDisplay('0');
        setExpression('');
        setHasError(false);
    };

    const backspace = () => {
        if (display.length > 1) {
            setDisplay(display.slice(0, -1));
            setExpression(expression.slice(0, -1));
        } else {
            setDisplay('0');
            setExpression('');
        }
        setHasError(false);
    };

    return (
        <section className="pt-20 pb-16 px-4 sm:px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10 animate-[slide-up_0.6s_ease-out]">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                        <Sparkles className="w-4 h-4" />
                        Professional Calculator Suite
                    </div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent leading-tight">
                        CalcHub
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Over 70+ professional calculators for finance, math, health & more
                    </p>
                </div>

                <div className="flex flex-col xl:flex-row items-start gap-8">
                    <div className="w-full xl:w-auto flex-shrink-0 flex justify-center animate-[scale-in_0.4s_ease-out]">
                        <div className="bg-white dark:bg-slate-900 p-4 sm:p-6 rounded-3xl shadow-2xl border border-border/50 w-full max-w-lg">
                            <div className="mb-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <button 
                                            onClick={() => setShowHistory(!showHistory)}
                                            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                                            title="History"
                                        >
                                            <History className="w-4 h-4 text-muted-foreground" />
                                        </button>
                                        <span className="text-xs font-medium text-muted-foreground px-2 py-1 rounded-md bg-slate-100 dark:bg-slate-800">
                                            {angleUnit}
                                        </span>
                                    </div>
                                    <div className="flex gap-1">
                                        <button 
                                            onClick={() => setAngleUnit('Deg')}
                                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${angleUnit === 'Deg' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                        >
                                            DEG
                                        </button>
                                        <button 
                                            onClick={() => setAngleUnit('Rad')}
                                            className={`px-3 py-1 text-xs font-medium rounded-lg transition-all ${angleUnit === 'Rad' ? 'bg-primary text-white' : 'bg-slate-100 dark:bg-slate-800 text-muted-foreground hover:bg-slate-200 dark:hover:bg-slate-700'}`}
                                        >
                                            RAD
                                        </button>
                                    </div>
                                </div>
                                
                                {showHistory && history.length > 0 && (
                                    <div className="mb-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl max-h-24 overflow-y-auto">
                                        {history.map((item, i) => (
                                            <div key={i} className="text-xs text-muted-foreground truncate py-0.5">{item}</div>
                                        ))}
                                    </div>
                                )}

                                <div className="text-right mb-2">
                                    <div className="h-5 text-sm text-muted-foreground overflow-hidden truncate">{expression || '\u00A0'}</div>
                                </div>
                                
                                <div 
                                    ref={displayRef}
                                    className={`relative bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 text-foreground text-right p-4 sm:p-5 rounded-2xl border-2 transition-all duration-300 overflow-x-auto ${
                                        hasError 
                                            ? 'border-destructive/50 bg-destructive/5' 
                                            : resultFlash 
                                                ? 'border-accent/50 bg-accent/5' 
                                                : 'border-border/50'
                                    }`}
                                >
                                    <div className={`text-3xl sm:text-4xl font-bold tracking-tight ${hasError ? 'text-destructive' : ''}`}>
                                        {display}
                                    </div>
                                </div>
                                
                                {hasError && (
                                    <p className="text-xs text-destructive mt-2 flex items-center gap-1">
                                        <span className="inline-block w-1 h-1 rounded-full bg-destructive"></span>
                                        Invalid expression. Please check and try again.
                                    </p>
                                )}
                            </div>
                            
                            <div className="grid grid-cols-5 gap-2 mb-3">
                                <CalcButton variant="function" onClick={() => handleFunction('sin')}>sin</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('cos')}>cos</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('tan')}>tan</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('ln')}>ln</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('log')}>log</CalcButton>
                            </div>
                            
                            <div className="grid grid-cols-5 gap-2 mb-3">
                                <CalcButton variant="function" onClick={() => handleFunction('sin-1')}>sin⁻¹</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('cos-1')}>cos⁻¹</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('tan-1')}>tan⁻¹</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('sqrt')}>√</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('cbrt')}>∛</CalcButton>
                            </div>
                            
                            <div className="grid grid-cols-5 gap-2 mb-3">
                                <CalcButton variant="function" onClick={() => handleFunction('x2')}>x²</CalcButton>
                                <CalcButton variant="function" onClick={() => handleFunction('x3')}>x³</CalcButton>
                                <CalcButton variant="function" onClick={() => handleOperator('**')}>xʸ</CalcButton>
                                <CalcButton variant="function" onClick={() => handleOperator('*' + Math.PI.toString())}>π</CalcButton>
                                <CalcButton variant="function" onClick={() => handleOperator('*' + Math.E.toString())}>e</CalcButton>
                            </div>

                            <div className="h-px bg-border my-4"></div>

                            <div className="grid grid-cols-4 gap-2 sm:gap-3">
                                <CalcButton variant="action" onClick={clearAll}>AC</CalcButton>
                                <CalcButton variant="function" onClick={() => handleOperator('(')}>(</CalcButton>
                                <CalcButton variant="function" onClick={() => handleOperator(')')}>)</CalcButton>
                                <CalcButton variant="operator" onClick={() => handleOperator('/')}>÷</CalcButton>
                                
                                <CalcButton variant="number" onClick={() => handleNumber('7')}>7</CalcButton>
                                <CalcButton variant="number" onClick={() => handleNumber('8')}>8</CalcButton>
                                <CalcButton variant="number" onClick={() => handleNumber('9')}>9</CalcButton>
                                <CalcButton variant="operator" onClick={() => handleOperator('*')}>×</CalcButton>
                                
                                <CalcButton variant="number" onClick={() => handleNumber('4')}>4</CalcButton>
                                <CalcButton variant="number" onClick={() => handleNumber('5')}>5</CalcButton>
                                <CalcButton variant="number" onClick={() => handleNumber('6')}>6</CalcButton>
                                <CalcButton variant="operator" onClick={() => handleOperator('-')}>−</CalcButton>
                                
                                <CalcButton variant="number" onClick={() => handleNumber('1')}>1</CalcButton>
                                <CalcButton variant="number" onClick={() => handleNumber('2')}>2</CalcButton>
                                <CalcButton variant="number" onClick={() => handleNumber('3')}>3</CalcButton>
                                <CalcButton variant="operator" onClick={() => handleOperator('+')}>+</CalcButton>
                                
                                <CalcButton variant="number" onClick={() => handleNumber('0')}>0</CalcButton>
                                <CalcButton variant="number" onClick={() => handleNumber('.')}>.</CalcButton>
                                <CalcButton variant="function" onClick={backspace}>
                                    <Delete className="w-5 h-5" />
                                </CalcButton>
                                <CalcButton variant="equals" onClick={calculate}>=</CalcButton>
                            </div>

                            <div className="grid grid-cols-4 gap-2 sm:gap-3 mt-3">
                                <CalcButton variant="function" onClick={() => handleFunction('±')}>±</CalcButton>
                                <CalcButton variant="function" onClick={() => handleOperator('/100')}>%</CalcButton>
                                <CalcButton variant="function" onClick={() => setDisplay(lastAnswer.toString())}>ANS</CalcButton>
                                <CalcButton variant="function" onClick={() => setDisplay(memory.toString())}>MR</CalcButton>
                            </div>
                        </div>
                    </div>

                    <div className="flex-grow w-full xl:w-auto animate-[slide-up_0.5s_ease-out]">
                        <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl shadow-xl border border-border/50">
                            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                <Search className="w-6 h-6 text-primary" />
                                Find Your Calculator
                            </h2>
                            <div className="space-y-4" ref={searchRef}>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search 70+ calculators..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onFocus={() => setShowResults(true)}
                                        className="w-full h-14 bg-slate-50 dark:bg-slate-800 border-2 border-border rounded-xl pl-12 pr-4 text-base focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                                    />
                                    {showResults && filteredCalculators.length > 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-border rounded-xl shadow-2xl z-50 overflow-hidden">
                                            {filteredCalculators.map((calc) => (
                                                <Link
                                                    key={calc.href}
                                                    href={calc.href}
                                                    className="flex items-center gap-3 px-4 py-3 hover:bg-primary/5 transition-colors border-b border-border/50 last:border-b-0"
                                                    onClick={() => setShowResults(false)}
                                                >
                                                    <Search className="w-4 h-4 text-primary" />
                                                    <span className="font-medium">{calc.name}</span>
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                    {showResults && searchQuery.trim() && filteredCalculators.length === 0 && (
                                        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-900 border border-border rounded-xl shadow-xl z-50 p-4">
                                            <p className="text-sm text-muted-foreground text-center">No calculators found for "{searchQuery}"</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="mt-8 pt-6 border-t border-border">
                                <h3 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">POPULAR CALCULATORS</h3>
                                <div className="flex flex-wrap gap-2">
                                    {['Mortgage', 'BMI', 'Loan', 'Age', 'Percentage', 'Tax'].map((tag) => (
                                        <button 
                                            key={tag} 
                                            onClick={() => handlePopularSearch(tag)}
                                            className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-foreground text-sm font-medium rounded-xl hover:bg-primary hover:text-white transition-all duration-200"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border">
                                <h3 className="text-xs font-semibold text-muted-foreground mb-4 tracking-wider">QUICK ACCESS</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <Link href="/mortgage-calculator" className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:shadow-md transition-all group">
                                        <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                                            <span className="text-white text-lg">🏠</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm group-hover:text-primary transition-colors">Mortgage</p>
                                            <p className="text-xs text-muted-foreground">Home loans</p>
                                        </div>
                                    </Link>
                                    <Link href="/bmi-calculator" className="flex items-center gap-3 p-4 bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/20 rounded-xl hover:shadow-md transition-all group">
                                        <div className="w-10 h-10 rounded-lg bg-rose-500 flex items-center justify-center">
                                            <span className="text-white text-lg">❤️</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm group-hover:text-primary transition-colors">BMI</p>
                                            <p className="text-xs text-muted-foreground">Health check</p>
                                        </div>
                                    </Link>
                                    <Link href="/loan-calculator" className="flex items-center gap-3 p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 rounded-xl hover:shadow-md transition-all group">
                                        <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center">
                                            <span className="text-white text-lg">💰</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm group-hover:text-primary transition-colors">Loan</p>
                                            <p className="text-xs text-muted-foreground">Payments</p>
                                        </div>
                                    </Link>
                                    <Link href="/percentage-calculator" className="flex items-center gap-3 p-4 bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20 rounded-xl hover:shadow-md transition-all group">
                                        <div className="w-10 h-10 rounded-lg bg-violet-500 flex items-center justify-center">
                                            <span className="text-white text-lg">%</span>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-sm group-hover:text-primary transition-colors">Percentage</p>
                                            <p className="text-xs text-muted-foreground">Quick math</p>
                                        </div>
                                    </Link>
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
