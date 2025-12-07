"use client";

import React, { useState, FC, HTMLAttributes } from 'react';

type SciButtonProps = {
  children: React.ReactNode;
  variant?: 'function' | 'number' | 'operator' | 'special';
  className?: string;
} & HTMLAttributes<HTMLDivElement>;

const SciButton: FC<SciButtonProps> = ({ children, variant = 'function', className = '', ...props }) => {
  const baseClasses = "flex items-center justify-center w-[50px] h-[30px] rounded-[3px] border border-border text-[13px] font-['Arial'] cursor-pointer calculator-button-text hover:shadow-sm transition-all";
  
  const variantClasses = {
    function: 'bg-button-function text-foreground hover:bg-[#dddce1]',
    number: 'bg-button-number text-foreground font-bold hover:bg-[#e9e9e9]',
    operator: 'bg-accent text-accent-foreground hover:bg-[#406b88]',
    special: 'bg-button-special text-accent-foreground hover:bg-[#5f7d8a]',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
      {children}
    </div>
  );
};


const CalculatorHero = () => {
    const [angleUnit, setAngleUnit] = useState<'Deg' | 'Rad'>('Deg');

    return (
        <section className="font-sans bg-background py-[10px]">
            <div className="max-w-[1100px] mx-auto lg:px-5">
                <div className="flex flex-col lg:flex-row items-start">
                    {/* Calculator Wrapper */}
                    <div className="w-full lg:w-auto flex-shrink-0 flex justify-center lg:pr-[18px]">
                        <div className="bg-card p-[5px] rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] w-fit">
                            {/* Display */}
                            <div className="p-1 font-['Arial']">
                                <div className="h-[21px] text-lg text-right text-muted-foreground pr-2 overflow-hidden">&nbsp;</div>
                                <div className="bg-calculator-display text-white text-[20px] text-right p-[3px] box-content h-[23px] calculator-display-text">0</div>
                            </div>
                            
                            {/* Buttons Area */}
                            <div className="pt-[3px] flex gap-x-[2px]">
                                {/* Functions Column */}
                                <div className="flex flex-col gap-y-[2px]">
                                    <div className="flex gap-x-[2px] items-center">
                                        <SciButton variant="function">sin</SciButton>
                                        <SciButton variant="function">cos</SciButton>
                                        <SciButton variant="function">tan</SciButton>
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
                                        <SciButton variant="function">sin<sup>-1</sup></SciButton>
                                        <SciButton variant="function">cos<sup>-1</sup></SciButton>
                                        <SciButton variant="function">tan<sup>-1</sup></SciButton>
                                        <SciButton variant="function">π</SciButton>
                                        <SciButton variant="function">e</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="function">x<sup>y</sup></SciButton>
                                        <SciButton variant="function">x<sup>3</sup></SciButton>
                                        <SciButton variant="function">x<sup>2</sup></SciButton>
                                        <SciButton variant="function">e<sup>x</sup></SciButton>
                                        <SciButton variant="function">10<sup>x</sup></SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="function"><sup>y</sup>√x</SciButton>
                                        <SciButton variant="function"><sup>3</sup>√x</SciButton>
                                        <SciButton variant="function">√x</SciButton>
                                        <SciButton variant="function">ln</SciButton>
                                        <SciButton variant="function">log</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="function">(</SciButton>
                                        <SciButton variant="function"> )</SciButton>
                                        <SciButton variant="function">1/x</SciButton>
                                        <SciButton variant="function">%</SciButton>
                                        <SciButton variant="function">n!</SciButton>
                                    </div>
                                </div>
                                {/* Numbers & Operators Column */}
                                <div className="flex flex-col gap-y-[2px]">
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="number">7</SciButton>
                                        <SciButton variant="number">8</SciButton>
                                        <SciButton variant="number">9</SciButton>
                                        <SciButton variant="operator">+</SciButton>
                                        <SciButton variant="operator">Back</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="number">4</SciButton>
                                        <SciButton variant="number">5</SciButton>
                                        <SciButton variant="number">6</SciButton>
                                        <SciButton variant="operator">–</SciButton>
                                        <SciButton variant="operator">Ans</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="number">1</SciButton>
                                        <SciButton variant="number">2</SciButton>
                                        <SciButton variant="number">3</SciButton>
                                        <SciButton variant="operator">×</SciButton>
                                        <SciButton variant="operator">M+</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="number">0</SciButton>
                                        <SciButton variant="number">.</SciButton>
                                        <SciButton variant="operator">EXP</SciButton>
                                        <SciButton variant="operator">/</SciButton>
                                        <SciButton variant="operator">M-</SciButton>
                                    </div>
                                    <div className="flex gap-x-[2px]">
                                        <SciButton variant="operator">±</SciButton>
                                        <SciButton variant="operator">RND</SciButton>
                                        <SciButton variant="special">AC</SciButton>
                                        <SciButton variant="special">=</SciButton>
                                        <SciButton variant="operator">MR</SciButton>
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