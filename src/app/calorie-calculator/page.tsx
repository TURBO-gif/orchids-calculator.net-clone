"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function CalorieCalculatorPage() {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [activity, setActivity] = useState('moderate');
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

    // Activity multipliers
    const activityMultipliers: any = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9
    };

    const tdee = bmr * activityMultipliers[activity];
    const mildWeightLoss = tdee - 250;
    const weightLoss = tdee - 500;
    const extremeWeightLoss = tdee - 1000;
    const mildWeightGain = tdee + 250;
    const weightGain = tdee + 500;
    const fastWeightGain = tdee + 1000;

    setResult({
      bmr: bmr.toFixed(0),
      maintain: tdee.toFixed(0),
      mildLoss: mildWeightLoss.toFixed(0),
      loss: weightLoss.toFixed(0),
      extremeLoss: extremeWeightLoss.toFixed(0),
      mildGain: mildWeightGain.toFixed(0),
      gain: weightGain.toFixed(0),
      fastGain: fastWeightGain.toFixed(0)
    });
  };

  return (
    <CalculatorLayout title="Calorie Calculator" description="Calculate your daily calorie needs based on your goals.">
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
        <div>
          <label className="block text-sm font-bold mb-1">Activity Level</label>
          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="sedentary">Sedentary (little or no exercise)</option>
            <option value="light">Light (exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (exercise 3-5 days/week)</option>
            <option value="active">Active (exercise 6-7 days/week)</option>
            <option value="veryActive">Very Active (intense exercise daily)</option>
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
            <h3 className="font-bold text-lg mb-3">Results (calories/day):</h3>
            <div className="space-y-2">
              <p><strong>BMR (Base Metabolic Rate):</strong> {result.bmr}</p>
              <p><strong>Maintain Weight:</strong> {result.maintain}</p>
              <p><strong>Mild Weight Loss (0.25 kg/week):</strong> {result.mildLoss}</p>
              <p><strong>Weight Loss (0.5 kg/week):</strong> {result.loss}</p>
              <p><strong>Extreme Weight Loss (1 kg/week):</strong> {result.extremeLoss}</p>
              <p><strong>Mild Weight Gain (0.25 kg/week):</strong> {result.mildGain}</p>
              <p><strong>Weight Gain (0.5 kg/week):</strong> {result.gain}</p>
              <p><strong>Fast Weight Gain (1 kg/week):</strong> {result.fastGain}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
