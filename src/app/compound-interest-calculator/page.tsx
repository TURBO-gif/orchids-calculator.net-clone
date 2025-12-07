"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [rate, setRate] = useState('7');
  const [time, setTime] = useState('10');
  const [compounding, setCompounding] = useState('monthly');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;

    const frequencies: any = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      daily: 365
    };

    const n = frequencies[compounding] || 12;
    
    // Future value with compound interest
    const fvPrincipal = p * Math.pow(1 + r / n, n * t);
    
    // Future value of monthly contributions
    const monthlyRate = r / 12;
    const months = t * 12;
    const fvContributions = pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const finalAmount = fvPrincipal + fvContributions;
    const totalContributions = p + (pmt * months);
    const totalInterest = finalAmount - totalContributions;

    setResult({
      finalAmount: finalAmount.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Compound Interest Calculator" description="Calculate compound interest with regular contributions.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Initial Principal ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
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
          <label className="block text-sm font-bold mb-1">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Time Period (years)</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Compound Frequency</label>
          <select
            value={compounding}
            onChange={(e) => setCompounding(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="annually">Annually</option>
            <option value="semiannually">Semi-annually</option>
            <option value="quarterly">Quarterly</option>
            <option value="monthly">Monthly</option>
            <option value="daily">Daily</option>
          </select>
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
              <p><strong>Total Contributions:</strong> ${result.totalContributions}</p>
              <p><strong>Total Interest Earned:</strong> ${result.totalInterest}</p>
              <p><strong>Final Amount:</strong> ${result.finalAmount}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
