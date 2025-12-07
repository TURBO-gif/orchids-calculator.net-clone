"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function StandardDeviationCalculatorPage() {
  const [numbers, setNumbers] = useState('2, 4, 6, 8, 10');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const values = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (values.length === 0) {
      setResult({ error: 'Please enter valid numbers' });
      return;
    }

    const n = values.length;
    const mean = values.reduce((sum, val) => sum + val, 0) / n;
    const variance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / n;
    const stdDev = Math.sqrt(variance);
    
    // Sample standard deviation
    const sampleVariance = values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / (n - 1);
    const sampleStdDev = Math.sqrt(sampleVariance);

    const sum = values.reduce((a, b) => a + b, 0);
    const min = Math.min(...values);
    const max = Math.max(...values);

    setResult({
      count: n,
      sum: sum.toFixed(2),
      mean: mean.toFixed(4),
      variance: variance.toFixed(4),
      stdDev: stdDev.toFixed(4),
      sampleVariance: sampleVariance.toFixed(4),
      sampleStdDev: sampleStdDev.toFixed(4),
      min: min,
      max: max
    });
  };

  return (
    <CalculatorLayout title="Standard Deviation Calculator" description="Calculate mean, variance, and standard deviation.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Enter Numbers (comma separated)</label>
          <textarea
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            rows={4}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            placeholder="e.g., 2, 4, 6, 8, 10"
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
            {result.error ? (
              <p className="text-destructive">{result.error}</p>
            ) : (
              <div className="space-y-2">
                <p><strong>Count:</strong> {result.count}</p>
                <p><strong>Sum:</strong> {result.sum}</p>
                <p><strong>Mean (Average):</strong> {result.mean}</p>
                <p><strong>Min:</strong> {result.min}</p>
                <p><strong>Max:</strong> {result.max}</p>
                <p><strong>Population Variance:</strong> {result.variance}</p>
                <p><strong>Population Standard Deviation:</strong> {result.stdDev}</p>
                <p><strong>Sample Variance:</strong> {result.sampleVariance}</p>
                <p><strong>Sample Standard Deviation:</strong> {result.sampleStdDev}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
