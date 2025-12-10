"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RMDCalculatorPage() {
  const [accountBalance, setAccountBalance] = useState('500000');
  const [age, setAge] = useState('73');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const balance = parseFloat(accountBalance) || 0;
    const currentAge = parseFloat(age) || 73;

    const lifeExpectancyTable: Record<number, number> = {
      72: 27.4, 73: 26.5, 74: 25.5, 75: 24.6, 76: 23.7, 77: 22.9, 78: 22.0, 79: 21.1, 80: 20.2,
      81: 19.4, 82: 18.5, 83: 17.7, 84: 16.8, 85: 16.0, 86: 15.2, 87: 14.4, 88: 13.7, 89: 12.9,
      90: 12.2, 91: 11.5, 92: 10.8, 93: 10.1, 94: 9.5, 95: 8.9, 96: 8.4, 97: 7.8, 98: 7.3, 99: 6.8, 100: 6.4
    };

    const divisor = lifeExpectancyTable[currentAge] || 20;
    const rmd = balance / divisor;
    const monthlyEquivalent = rmd / 12;
    const taxEstimate = rmd * 0.22;

    setResult({ rmd, monthlyEquivalent, divisor, taxEstimate, age: currentAge, balance });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="RMD Calculator" description="Calculate your Required Minimum Distribution from retirement accounts.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Account Information</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Account Balance (Dec 31 of Prior Year)</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={accountBalance} onChange={(e) => setAccountBalance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Your Age This Year</label><input type="number" value={age} onChange={(e) => setAge(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" /><p className="text-xs text-muted-foreground mt-1">RMDs begin at age 73 (as of 2023)</p></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Required Minimum Distribution</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.rmd)}</div>
                <div className="text-sm text-muted-foreground">Must be withdrawn this year</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">RMD Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Account Balance:</span><span className="font-semibold">{formatCurrency(result.balance)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Your Age:</span><span className="font-semibold">{result.age}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Distribution Period:</span><span className="font-semibold">{result.divisor} years</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Monthly Equivalent:</span><span className="font-semibold">{formatCurrency(result.monthlyEquivalent)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Est. Tax (22%):</span><span className="font-bold text-red-600">{formatCurrency(result.taxEstimate)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter account details to calculate RMD</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
