"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function InvestmentCalculatorPage() {
  const [initialInvestment, setInitialInvestment] = useState('10000');
  const [monthlyContribution, setMonthlyContribution] = useState('200');
  const [years, setYears] = useState('10');
  const [returnRate, setReturnRate] = useState('8');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const time = parseFloat(years) || 0;
    const rate = (parseFloat(returnRate) || 0) / 100 / 12;
    const months = time * 12;

    // Future value of initial investment
    const fvInitial = initial * Math.pow(1 + rate, months);
    
    // Future value of monthly contributions
    const fvMonthly = monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    
    const futureValue = fvInitial + fvMonthly;
    const totalContributions = initial + (monthly * months);
    const totalReturn = futureValue - totalContributions;

    setResult({
      futureValue: futureValue.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalReturn: totalReturn.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Investment Calculator" description="Calculate the future value of your investments.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Initial Investment ($)</label>
          <input
            type="number"
            value={initialInvestment}
            onChange={(e) => setInitialInvestment(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Monthly Contribution ($)</label>
          <input
            type="number"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Investment Time Period (years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Expected Return Rate (% per year)</label>
          <input
            type="number"
            step="0.1"
            value={returnRate}
            onChange={(e) => setReturnRate(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
        >
          Calculate
        </button>
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            <div className="space-y-2">
              <p><strong>Future Value:</strong> ${result.futureValue}</p>
              <p><strong>Total Contributions:</strong> ${result.totalContributions}</p>
              <p><strong>Total Return:</strong> ${result.totalReturn}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
