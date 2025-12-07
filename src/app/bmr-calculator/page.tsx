"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function BMRCalculatorPage() {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let w = parseFloat(weight) || 0;
    let h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;

    // Convert to metric if imperial
    if (unit === 'imperial') {
      w = w * 0.453592; // lbs to kg
      h = h * 2.54; // inches to cm
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    // Calculate TDEE for different activity levels
    const sedentary = bmr * 1.2;
    const light = bmr * 1.375;
    const moderate = bmr * 1.55;
    const active = bmr * 1.725;
    const veryActive = bmr * 1.9;

    setResult({
      bmr: bmr.toFixed(0),
      sedentary: sedentary.toFixed(0),
      light: light.toFixed(0),
      moderate: moderate.toFixed(0),
      active: active.toFixed(0),
      veryActive: veryActive.toFixed(0)
    });
  };

  return (
    <CalculatorLayout title="BMR Calculator" description="Calculate your Basal Metabolic Rate (BMR) and daily calorie needs.">
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
          <label className="block text-sm font-bold mb-1">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
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
              <p><strong>BMR (Basal Metabolic Rate):</strong> {result.bmr} calories/day</p>
              <h4 className="font-bold mt-4">Estimated Daily Calorie Needs:</h4>
              <p><strong>Sedentary:</strong> {result.sedentary} cal/day</p>
              <p><strong>Light Activity:</strong> {result.light} cal/day</p>
              <p><strong>Moderate Activity:</strong> {result.moderate} cal/day</p>
              <p><strong>Active:</strong> {result.active} cal/day</p>
              <p><strong>Very Active:</strong> {result.veryActive} cal/day</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
