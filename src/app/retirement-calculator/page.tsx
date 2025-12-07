"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const age = parseFloat(currentAge) || 0;
    const retAge = parseFloat(retirementAge) || 65;
    const years = retAge - age;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(annualReturn) || 0) / 100 / 12;
    const months = years * 12;

    // Future value of current savings
    const fvSavings = savings * Math.pow(1 + rate, months);
    
    // Future value of monthly contributions
    const fvContributions = monthly * ((Math.pow(1 + rate, months) - 1) / rate);
    
    const totalSavings = fvSavings + fvContributions;
    const totalContributions = savings + (monthly * months);

    setResult({
      totalSavings: totalSavings.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      earnings: (totalSavings - totalContributions).toFixed(2),
      years: years.toFixed(0)
    });
  };

  return (
    <CalculatorLayout title="Retirement Calculator" description="Plan your retirement savings and estimate your nest egg.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Current Age</label>
          <input
            type="number"
            value={currentAge}
            onChange={(e) => setCurrentAge(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Retirement Age</label>
          <input
            type="number"
            value={retirementAge}
            onChange={(e) => setRetirementAge(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Current Savings ($)</label>
          <input
            type="number"
            value={currentSavings}
            onChange={(e) => setCurrentSavings(e.target.value)}
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
          <label className="block text-sm font-bold mb-1">Expected Annual Return (%)</label>
          <input
            type="number"
            step="0.1"
            value={annualReturn}
            onChange={(e) => setAnnualReturn(e.target.value)}
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
              <p><strong>Years until Retirement:</strong> {result.years}</p>
              <p><strong>Total Savings at Retirement:</strong> ${result.totalSavings}</p>
              <p><strong>Total Contributions:</strong> ${result.totalContributions}</p>
              <p><strong>Investment Earnings:</strong> ${result.earnings}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
