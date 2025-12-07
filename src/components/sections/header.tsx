import React from 'react';
import Link from 'next/link';
import { Calculator } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/80 border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
            <Calculator className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CalcHub
          </span>
        </Link>
        <nav className="flex items-center gap-6">
          <Link href="/calculators" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Calculators
          </Link>
          <Link 
            href="/sign-in" 
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary to-accent rounded-lg hover:shadow-lg transition-all"
          >
            Sign In
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;