import React from 'react';
import Link from 'next/link';
import { Calculator } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white/40 backdrop-blur-lg border-t border-border py-12 px-6 mt-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                CalcHub
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-md">
              Your comprehensive suite of modern calculators for finance, health, math, and more. Fast, accurate, and completely free to use.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/mortgage-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Mortgage Calculator</Link></li>
              <li><Link href="/bmi-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">BMI Calculator</Link></li>
              <li><Link href="/loan-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Loan Calculator</Link></li>
              <li><Link href="/age-calculator" className="text-sm text-muted-foreground hover:text-primary transition-colors">Age Calculator</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms of Use</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/sitemap" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sitemap</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CalcHub. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ for accurate calculations
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;