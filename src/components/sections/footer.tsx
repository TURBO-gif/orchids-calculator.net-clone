import React from 'react';
import Link from 'next/link';
import { Calculator, Github, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg border-t border-border py-12 px-4 sm:px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  CalcHub
                </span>
                <span className="text-[10px] text-muted-foreground -mt-0.5">Professional Calculators</span>
              </div>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md mb-4">
              Your comprehensive suite of modern calculators for finance, health, math, and more. Fast, accurate, and completely free to use.
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Twitter className="w-4 h-4 text-muted-foreground" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                <Github className="w-4 h-4 text-muted-foreground" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Popular Calculators</h4>
            <ul className="space-y-2.5">
              <li><Link href="/mortgage-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/bmi-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">BMI Calculator</Link></li>
              <li><Link href="/loan-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Loan Calculator</Link></li>
              <li><Link href="/age-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Age Calculator</Link></li>
              <li><Link href="/percentage-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Percentage Calculator</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              <li><Link href="/calculators" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Calculators</Link></li>
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CalcHub. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for accurate calculations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;