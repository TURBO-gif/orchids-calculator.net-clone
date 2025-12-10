"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RentCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState('5000');
  const [rentPercentage, setRentPercentage] = useState('30');
  const [utilities, setUtilities] = useState('150');
  const [rentersInsurance, setRentersInsurance] = useState('25');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const percentage = (parseFloat(rentPercentage) || 30) / 100;
    const util = parseFloat(utilities) || 0;
    const insurance = parseFloat(rentersInsurance) || 0;

    const maxRent = income * percentage;
    const maxRentAfterExpenses = maxRent - util - insurance;
    const annualRent = maxRentAfterExpenses * 12;

    setResult({
      maxRent: maxRent,
      maxRentAfterExpenses: Math.max(0, maxRentAfterExpenses),
      utilities: util,
      insurance: insurance,
      totalHousingCost: maxRent,
      annualRent: annualRent,
      incomeAfterRent: income - maxRent
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout title="Rent Calculator" description="Calculate how much rent you can afford based on your income.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Income & Expenses</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Monthly Income (After Tax)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Rent Budget (% of Income)</label>
                <div className="flex items-center gap-2">
                  <input type="number" value={rentPercentage} onChange={(e) => setRentPercentage(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                  <span className="text-sm">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Recommended: 25-30% of income</p>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Monthly Utilities</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={utilities} onChange={(e) => setUtilities(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Renters Insurance</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={rentersInsurance} onChange={(e) => setRentersInsurance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Maximum Rent</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.maxRentAfterExpenses)}/mo</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Budget Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Housing Budget ({rentPercentage}%):</span><span className="font-semibold">{formatCurrency(result.maxRent)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Utilities:</span><span className="font-semibold">-{formatCurrency(result.utilities)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Renters Insurance:</span><span className="font-semibold">-{formatCurrency(result.insurance)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Available for Rent:</span><span className="font-bold text-accent">{formatCurrency(result.maxRentAfterExpenses)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Annual Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Annual Rent:</span><span className="font-semibold">{formatCurrency(result.annualRent)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Monthly Income After Rent:</span><span className="font-semibold">{formatCurrency(result.incomeAfterRent)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your income and click Calculate to see how much rent you can afford</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
