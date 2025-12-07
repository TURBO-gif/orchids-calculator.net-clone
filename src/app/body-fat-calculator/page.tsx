"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function BodyFatCalculatorPage() {
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState('30');
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [neck, setNeck] = useState('37');
  const [waist, setWaist] = useState('85');
  const [hip, setHip] = useState('95');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let w = parseFloat(weight) || 0;
    let h = parseFloat(height) || 0;
    let n = parseFloat(neck) || 0;
    let wa = parseFloat(waist) || 0;
    let hi = parseFloat(hip) || 0;

    // Convert to inches if metric
    if (unit === 'metric') {
      h = h / 2.54;
      n = n / 2.54;
      wa = wa / 2.54;
      hi = hi / 2.54;
      w = w * 2.20462; // kg to lbs
    }

    let bodyFat = 0;
    if (gender === 'male') {
      bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(wa - n) + 0.15456 * Math.log10(h)) - 450;
    } else {
      bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(wa + hi - n) + 0.22100 * Math.log10(h)) - 450;
    }

    const fatMass = (bodyFat / 100) * w;
    const leanMass = w - fatMass;

    let category = '';
    if (gender === 'male') {
      if (bodyFat < 6) category = 'Essential Fat';
      else if (bodyFat < 14) category = 'Athletes';
      else if (bodyFat < 18) category = 'Fitness';
      else if (bodyFat < 25) category = 'Average';
      else category = 'Obese';
    } else {
      if (bodyFat < 14) category = 'Essential Fat';
      else if (bodyFat < 21) category = 'Athletes';
      else if (bodyFat < 25) category = 'Fitness';
      else if (bodyFat < 32) category = 'Average';
      else category = 'Obese';
    }

    setResult({
      bodyFat: bodyFat.toFixed(1),
      fatMass: fatMass.toFixed(1),
      leanMass: leanMass.toFixed(1),
      category
    });
  };

  return (
    <CalculatorLayout title="Body Fat Calculator" description="Estimate your body fat percentage using the U.S. Navy method.">
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
          <label className="block text-sm font-bold mb-1">Neck Circumference ({unit === 'metric' ? 'cm' : 'inches'})</label>
          <input
            type="number"
            value={neck}
            onChange={(e) => setNeck(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Waist Circumference ({unit === 'metric' ? 'cm' : 'inches'})</label>
          <input
            type="number"
            value={waist}
            onChange={(e) => setWaist(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        {gender === 'female' && (
          <div>
            <label className="block text-sm font-bold mb-1">Hip Circumference ({unit === 'metric' ? 'cm' : 'inches'})</label>
            <input
              type="number"
              value={hip}
              onChange={(e) => setHip(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
        )}
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
              <p><strong>Body Fat Percentage:</strong> {result.bodyFat}%</p>
              <p><strong>Fat Mass:</strong> {result.fatMass} {unit === 'metric' ? 'kg' : 'lbs'}</p>
              <p><strong>Lean Mass:</strong> {result.leanMass} {unit === 'metric' ? 'kg' : 'lbs'}</p>
              <p><strong>Category:</strong> {result.category}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
