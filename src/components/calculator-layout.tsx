import React from 'react';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

interface CalculatorLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export const CalculatorLayout = ({ children, title, description }: CalculatorLayoutProps) => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[60px] pb-10">
        <div className="max-w-[1100px] mx-auto px-5 py-8">
          <h1 className="text-[26px] font-bold text-foreground mb-2">{title}</h1>
          {description && (
            <p className="text-[14px] text-muted-foreground mb-6">{description}</p>
          )}
          <div className="bg-card rounded-[4px] shadow-[0_2px_8px_rgba(0,0,0,0.1)] p-6">
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
