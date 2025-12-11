"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calculator, Moon, Sun, Menu, X } from 'lucide-react';

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark = stored === 'dark' || (!stored && prefersDark);
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle('dark', newDark);
    localStorage.setItem('theme', newDark ? 'dark' : 'light');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent leading-tight">
              CalcHub
            </span>
            <span className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block">70+ Calculators</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            Home
          </Link>
          <Link href="/calculators" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            All Calculators
          </Link>
          <Link href="/mortgage-calculator" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            Mortgage
          </Link>
          <Link href="/bmi-calculator" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            BMI
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-500" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>
          
          <Link 
            href="/calculators" 
            className="hidden sm:flex px-4 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent rounded-xl hover:shadow-lg hover:shadow-primary/20 transition-all"
          >
            Get Started
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-border shadow-xl animate-[slide-up_0.2s_ease-out]">
          <nav className="flex flex-col p-4 gap-1">
            <Link 
              href="/" 
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/calculators" 
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              All Calculators
            </Link>
            <Link 
              href="/mortgage-calculator" 
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              Mortgage Calculator
            </Link>
            <Link 
              href="/bmi-calculator" 
              onClick={() => setIsMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-foreground hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            >
              BMI Calculator
            </Link>
            <div className="pt-2 mt-2 border-t border-border">
              <Link 
                href="/calculators" 
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent rounded-xl"
              >
                Get Started
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
