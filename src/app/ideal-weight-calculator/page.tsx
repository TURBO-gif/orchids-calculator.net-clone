"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function IdealWeightCalculatorPage() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let h = parseFloat(height) || 0;

    // Convert to cm if imperial
    if (unit === 'imperial') {
      h = h * 2.54;
    }

    const heightInMeters = h / 100;

    // Different formulas
    const robinson = gender === 'male' 
      ? 52 + 1.9 * (h - 152.4) / 2.54
      : 49 + 1.7 * (h - 152.4) / 2.54;

    const miller = gender === 'male'
      : 56.2 + 1.41 * (h - 152.4) / 2.54
      : 53.1 + 1.36 * (h - 152.4) / 2.54;

    const devine = gender === 'male'
      ? 50 + 2.3 * (h - 152.4) / 2.54
      : 45.5 + 2.3 * (h - 152.4) / 2.54;

    const hamwi = gender === 'male'
      ? 48 + 2.7 * (h - 152.4) / 2.54
      : 45.5 + 2.2 * (h - 152.4) / 2.54;

    // BMI based range (18.5-25)
    const bmiLow = 18.5 * heightInMeters * heightInMeters;
    const bmiHigh = 25 * heightInMeters * heightInMeters;

    setResult({
      robinson: robinson.toFixed(1),
      miller: miller.toFixed(1),
      devine: devine.toFixed(1),
      hamwi: hamwi.toFixed(1),
      bmiLow: bmiLow.toFixed(1),
      bmiHigh: bmiHigh.toFixed(1)
    });
  };

  return (
    <CalculatorLayout title="Ideal Weight Calculator" description="Calculate your ideal body weight using various formulas.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Unit System</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="metric">Metric</option>
            <option value="imperial">Imperial</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
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
            <h3 className="font-bold text-lg mb-3">Ideal Weight Estimates (kg):</h3>
            <div className="space-y-2">
              <p><strong>Robinson Formula:</strong> {result.robinson} kg</p>
              <p><strong>Miller Formula:</strong> {result.miller} kg</p>
              <p><strong>Devine Formula:</strong> {result.devine} kg</p>
              <p><strong>Hamwi Formula:</strong> {result.hamwi} kg</p>
              <p><strong>Healthy BMI Range:</strong> {result.bmiLow} - {result.bmiHigh} kg</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
