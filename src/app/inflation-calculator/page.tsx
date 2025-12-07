"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function InflationCalculatorPage() {
  const [currentAmount, setCurrentAmount] = useState('100');
  const [inflationRate, setInflationRate] = useState('3');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const amount = parseFloat(currentAmount) || 0;
    const rate = (parseFloat(inflationRate) || 0) / 100;
    const time = parseFloat(years) || 0;

    const futureValue = amount * Math.pow(1 + rate, time);
    const purchasing Power = amount / Math.pow(1 + rate, time);
    const totalInflation = futureValue - amount;

    setResult({
      futureValue: futureValue.toFixed(2),
      purchasingPower: purchasingPower.toFixed(2),
      totalInflation: totalInflation.toFixed(2),
      inflationPercent: ((futureValue / amount - 1) * 100).toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Inflation Calculator" description="Calculate the impact of inflation on purchasing power over time.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Current Amount ($)</label>
          <input
            type="number"
            value={currentAmount}
            onChange={(e) => setCurrentAmount(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Annual Inflation Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={inflationRate}
            onChange={(e) => setInflationRate(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Number of Years</label>
          <input
            type="number"
            value={years}
            onChange={(e) => setYears(e.target.value)}
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
              <p><strong>Equivalent Purchasing Power Today:</strong> ${result.purchasingPower}</p>
              <p><strong>Total Inflation:</strong> ${result.totalInflation} ({result.inflationPercent}%)</p>
              <p className="text-sm mt-4">*${currentAmount} today will need ${result.futureValue} in {years} years to maintain the same purchasing power.</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
