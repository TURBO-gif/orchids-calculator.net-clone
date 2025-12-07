"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function PercentageCalculatorPage() {
  const [value1, setValue1] = useState('50');
  const [value2, setValue2] = useState('200');
  const [percent, setPercent] = useState('25');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const v1 = parseFloat(value1) || 0;
    const v2 = parseFloat(value2) || 0;
    const p = parseFloat(percent) || 0;

    const whatIsPercent = (p / 100) * v2;
    const isWhatPercent = v2 !== 0 ? (v1 / v2) * 100 : 0;
    const percentChange = v1 !== 0 ? ((v2 - v1) / v1) * 100 : 0;

    setResult({
      whatIsPercent: whatIsPercent.toFixed(2),
      isWhatPercent: isWhatPercent.toFixed(2),
      percentChange: percentChange.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Percentage Calculator" description="Calculate percentages and percentage changes.">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold">What is {percent}% of {value2}?</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Percentage (%)</label>
              <input
                type="number"
                value={percent}
                onChange={(e) => setPercent(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Of Value</label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-bold">{value1} is what % of {value2}?</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Value 1</label>
              <input
                type="number"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Value 2</label>
              <input
                type="number"
                value={value2}
                onChange={(e) => setValue2(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </div>
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
              <p><strong>{percent}% of {value2} =</strong> {result.whatIsPercent}</p>
              <p><strong>{value1} is what % of {value2}:</strong> {result.isWhatPercent}%</p>
              <p><strong>Percent change from {value1} to {value2}:</strong> {result.percentChange}%</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
