"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function AnnuityCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState('100000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [interestRate, setInterestRate] = useState('5');
  const [years, setYears] = useState('20');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const months = (parseFloat(years) || 20) * 12;

    const fvPrincipal = principal * Math.pow(1 + rate, months);
    const fvContributions = rate > 0 ? monthly * ((Math.pow(1 + rate, months) - 1) / rate) : monthly * months;
    const futureValue = fvPrincipal + fvContributions;
    const totalContributions = principal + monthly * months;
    const totalInterest = futureValue - totalContributions;

    setResult({ futureValue, fvPrincipal, fvContributions, totalContributions, totalInterest, years: parseFloat(years) });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Annuity Calculator" description="Calculate the future value of your annuity investment.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Annuity Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Initial Investment</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={initialInvestment} onChange={(e) => setInitialInvestment(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Monthly Contribution</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Annual Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Investment Period</label><div className="flex items-center gap-2"><input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">years</span></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Future Value</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.futureValue)}</div>
                <div className="text-sm text-muted-foreground">After {result.years} years</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Contributions:</span><span className="font-semibold">{formatCurrency(result.totalContributions)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Interest Earned:</span><span className="font-semibold text-green-600">{formatCurrency(result.totalInterest)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Final Value:</span><span className="font-bold text-accent">{formatCurrency(result.futureValue)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter annuity details to calculate future value</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
