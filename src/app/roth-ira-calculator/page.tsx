"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RothIRACalculatorPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentBalance, setCurrentBalance] = useState('10000');
  const [annualContribution, setAnnualContribution] = useState('7000');
  const [expectedReturn, setExpectedReturn] = useState('7');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const age = parseFloat(currentAge) || 30;
    const retAge = parseFloat(retirementAge) || 65;
    const balance = parseFloat(currentBalance) || 0;
    const contrib = parseFloat(annualContribution) || 0;
    const rate = (parseFloat(expectedReturn) || 7) / 100;
    const years = retAge - age;

    let futureValue = balance;
    for (let i = 0; i < years; i++) {
      futureValue = futureValue * (1 + rate) + contrib;
    }

    const totalContributions = balance + contrib * years;
    const totalGrowth = futureValue - totalContributions;
    const taxSavings = totalGrowth * 0.22;

    setResult({ futureValue, totalContributions, totalGrowth, taxSavings, years });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Roth IRA Calculator" description="Calculate your Roth IRA growth and tax-free retirement savings.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Roth IRA Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Current Age</label><input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1">Retirement Age</label><input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1">Current Balance</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Annual Contribution</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={annualContribution} onChange={(e) => setAnnualContribution(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div><p className="text-xs text-muted-foreground mt-1">2024 limit: $7,000 ($8,000 if 50+)</p></div>
              <div><label className="block text-sm font-bold mb-1">Expected Annual Return</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={expectedReturn} onChange={(e) => setExpectedReturn(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Future Value (Tax-Free)</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.futureValue)}</div>
                <div className="text-sm text-muted-foreground">After {result.years} years</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Growth Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Contributions:</span><span className="font-semibold">{formatCurrency(result.totalContributions)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Investment Growth:</span><span className="font-semibold text-green-600">{formatCurrency(result.totalGrowth)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Est. Tax Savings (22%):</span><span className="font-semibold text-green-600">{formatCurrency(result.taxSavings)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter Roth IRA details to calculate growth</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
