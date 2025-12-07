"use client";

import React, { useState, FC, HTMLAttributes } from 'react';

type SciButtonProps = {
  children: React.ReactNode;
  variant?: 'function' | 'number' | 'operator' | 'special';
  className?: string;
  onClick?: () => void;
} & HTMLAttributes<HTMLDivElement>;

const SciButton: FC<SciButtonProps> = ({ children, variant = 'function', className = '', onClick, ...props }) => {
  const baseClasses = "flex items-center justify-center w-[50px] h-[30px] rounded-[3px] border border-border text-[13px] font-['Arial'] cursor-pointer calculator-button-text hover:shadow-sm transition-all";
  
  const variantClasses = {
    function: 'bg-button-function text-foreground hover:bg-[#dddce1]',
    number: 'bg-button-number text-foreground font-bold hover:bg-[#e9e9e9]',
    operator: 'bg-accent text-accent-foreground hover:bg-[#406b88]',
    special: 'bg-button-special text-accent-foreground hover:bg-[#5f7d8a]',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} onClick={onClick} {...props}>
      {children}
    </div>
  );
};


const CalculatorHero = () => {
    const [angleUnit, setAngleUnit] = useState<'Deg' | 'Rad'>('Deg');
    const [display, setDisplay] = useState('0');
    const [expression, setExpression] = useState('');
    const [memory, setMemory] = useState(0);
    const [lastAnswer, setLastAnswer] = useState(0);

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
            // Replace operators for eval
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
        <section className="font-sans bg-background py-[10px]">
            <div className="max-w-[1100px] mx-auto lg:px-5">
                <div className="flex flex-col lg:flex-row items-start">
                    {/* Calculator Wrapper */}
                    <div className="w-full lg:w-auto flex-shrink-0 flex justify-center lg:pr-[18px]">
                        <div className="bg-card p-[5px] rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] w-fit">
                            {/* Display */}
                            <div className="p-1 font-['Arial']">
                                <div className="h-[21px] text-lg text-right text-muted-foreground pr-2 overflow-hidden text-xs">{expression || '\u00A0'}</div>
                                <div className="bg-calculator-display text-white text-[20px] text-right p-[3px] box-content h-[23px] calculator-display-text overflow-x-auto">{display}</div>
                            </div>
                            
                            {/* Buttons Area */}
                            <div className="pt-[3px] flex gap-x-[2px]">
                                {/* Functions Column */}
                                <div className="flex flex-col gap-y-[2px]">
                                    <div className="flex gap-x-[2px] items-center">
                                        <SciButton variant="function" onClick={() => handleFunction('sin')}>sin</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('cos')}>cos</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('tan')}>tan</SciButton>
                                        <div className="flex items-center justify-start text-[13px] text-foreground h-[30px] w-auto px-2 space-x-2">
                                            <label className="flex items-center cursor-pointer">
                                                <input type="radio" name="angle" value="Deg" checked={angleUnit === 'Deg'} onChange={() => setAngleUnit('Deg')} className="mr-1" />
                                                Deg
                                            </label>
                                            <label className="flex items-center cursor-pointer">
                                                <input type="radio" name="angle" value="Rad" checked={angleUnit === 'Rad'} onChange={() => setAngleUnit('Rad')} className="mr-1" />
                                                Rad
                                            </label>
                                        </div>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="function" onClick={() => handleFunction('sin-1')}>sin<sup>-1</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('cos-1')}>cos<sup>-1</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('tan-1')}>tan<sup>-1</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleOperator('*' + Math.PI.toString())}>π</SciButton>
                                        <SciButton variant="function" onClick={() => handleOperator('*' + Math.E.toString())}>e</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="function" onClick={() => handleOperator('**')}>x<sup>y</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('x3')}>x<sup>3</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('x2')}>x<sup>2</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('ex')}>e<sup>x</sup></SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('10x')}>10<sup>x</sup></SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="function" onClick={() => handleOperator('**(1/')}>><sup>y</sup>√x</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('cbrt')}><sup>3</sup>√x</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('sqrt')}>√x</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('ln')}>ln</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('log')}>log</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="function" onClick={() => handleOperator('(')}>(</SciButton>
                                        <SciButton variant="function" onClick={() => handleOperator(')')}>)</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('1/x')}>1/x</SciButton>
                                        <SciButton variant="function" onClick={() => handleOperator('/100')}>%</SciButton>
                                        <SciButton variant="function" onClick={() => handleFunction('factorial')}>n!</SciButton>
                                    </div>
                                </div>
                                {/* Numbers & Operators Column */}
                                <div className="flex flex-col gap-y-[2px]">
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="number" onClick={() => handleNumber('7')}>7</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('8')}>8</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('9')}>9</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('+')}>+</SciButton>
                                        <SciButton variant="operator" onClick={backspace}>Back</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="number" onClick={() => handleNumber('4')}>4</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('5')}>5</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('6')}>6</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('-')}>–</SciButton>
                                        <SciButton variant="operator" onClick={() => setDisplay(lastAnswer.toString())}>Ans</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="number" onClick={() => handleNumber('1')}>1</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('2')}>2</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('3')}>3</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('*')}>×</SciButton>
                                        <SciButton variant="operator" onClick={() => setMemory(memory + parseFloat(display))}>M+</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="number" onClick={() => handleNumber('0')}>0</SciButton>
                                        <SciButton variant="number" onClick={() => handleNumber('.')}>.</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('e')}>EXP</SciButton>
                                        <SciButton variant="operator" onClick={() => handleOperator('/')}>/</SciButton>
                                        <SciButton variant="operator" onClick={() => setMemory(memory - parseFloat(display))}>M-</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
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
                    <div className="flex-grow pt-5 px-5 lg:pt-0 lg:pl-[18px] w-full lg:w-auto">
                        <h1 className="text-[26px] font-bold text-foreground">Free Online Calculators</h1>
                        <form className="flex mt-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                className="w-full max-w-[310px] h-[36px] bg-card border border-input rounded-[3px] px-3 text-[14px] focus:ring-ring focus:border-ring outline-none transition-colors"
                                aria-label="Search for a calculator"
                            />
                            <button
                                type="submit"
                                className="bg-accent text-accent-foreground h-[36px] px-5 rounded-[3px] text-[14px] font-bold ml-1 hover:bg-[#406b88] transition-colors"
                            >
                                Search
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CalculatorHero;