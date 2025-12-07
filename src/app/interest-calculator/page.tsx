"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function InterestCalculatorPage() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('10');
  const [compounding, setCompounding] = useState('annually');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;

    const frequencies: any = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      daily: 365
    };

    const n = frequencies[compounding] || 1;
    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;

    setResult({
      finalAmount: amount.toFixed(2),
      totalInterest: interest.toFixed(2),
      principal: p.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Interest Calculator" description="Calculate compound interest on your investment.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Principal Amount ($)</label>
          <input
            type="number"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Interest Rate (% per year)</label>
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
              <p><strong>Principal:</strong> ${result.principal}</p>
              <p><strong>Total Interest:</strong> ${result.totalInterest}</p>
              <p><strong>Final Amount:</strong> ${result.finalAmount}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
