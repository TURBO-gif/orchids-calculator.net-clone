"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function InterestRateCalculatorPage() {
  const [presentValue, setPresentValue] = useState('10000');
  const [futureValue, setFutureValue] = useState('15000');
  const [years, setYears] = useState('5');
  const [compounding, setCompounding] = useState('annually');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const pv = parseFloat(presentValue) || 0;
    const fv = parseFloat(futureValue) || 0;
    const t = parseFloat(years) || 0;

    if (pv <= 0 || fv <= 0 || t <= 0) {
      setResult({ error: 'Please enter valid positive numbers' });
      return;
    }

    const frequencies: any = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      daily: 365
    };

    const n = frequencies[compounding];
    
    // Using formula: r = n * ((FV/PV)^(1/(n*t)) - 1)
    const rate = n * (Math.pow(fv / pv, 1 / (n * t)) - 1) * 100;

    setResult({
      rate: rate.toFixed(4),
      compounding
    });
  };

  return (
    <CalculatorLayout title="Interest Rate Calculator" description="Calculate the interest rate needed to reach your financial goal.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Present Value ($)</label>
          <input
            type="number"
            value={presentValue}
            onChange={(e) => setPresentValue(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Future Value ($)</label>
          <input
            type="number"
            value={futureValue}
            onChange={(e) => setFutureValue(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Time Period (years)</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Compounding Frequency</label>
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
            <h3 className="font-bold text-lg mb-3">Result:</h3>
            {result.error ? (
              <p className="text-destructive">{result.error}</p>
            ) : (
              <div className="space-y-2">
                <p><strong>Required Interest Rate:</strong> {result.rate}% per year</p>
                <p className="text-sm mt-2">*Compounded {result.compounding}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
