"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let bmi = 0;
    
    if (unit === 'metric') {
      const w = parseFloat(weight) || 0;
      const h = (parseFloat(height) || 0) / 100;
      bmi = w / (h * h);
    } else {
      const w = parseFloat(weight) || 0;
      const h = parseFloat(height) || 0;
      bmi = (w / (h * h)) * 703;
    }

    let category = '';
    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    setResult({
      bmi: bmi.toFixed(1),
      category
    });
  };

  return (
    <CalculatorLayout title="BMI Calculator" description="Calculate your Body Mass Index (BMI) and determine your weight category.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Unit System</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="metric">Metric (kg, cm)</option>
            <option value="imperial">Imperial (lbs, inches)</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Weight ({unit === 'metric' ? 'kg' : 'lbs'})</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Height ({unit === 'metric' ? 'cm' : 'inches'})</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
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
              <p><strong>BMI:</strong> {result.bmi}</p>
              <p><strong>Category:</strong> {result.category}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
