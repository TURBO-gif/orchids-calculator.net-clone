"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function BMICalculatorPage() {
  const [weight, setWeight] = useState('70');
  const [height, setHeight] = useState('170');
  const [heightFeet, setHeightFeet] = useState('5');
  const [heightInches, setHeightInches] = useState('7');
  const [age, setAge] = useState('25');
  const [gender, setGender] = useState('male');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let bmi = 0;
    let weightKg = parseFloat(weight) || 0;
    let heightM = 0;
    
    if (unit === 'metric') {
      heightM = (parseFloat(height) || 0) / 100;
      bmi = weightKg / (heightM * heightM);
    } else {
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      heightM = totalInches * 0.0254;
      weightKg = (parseFloat(weight) || 0) * 0.453592;
      bmi = (parseFloat(weight) / (totalInches * totalInches)) * 703;
    }

    const ponderalIndex = weightKg / Math.pow(heightM, 3);

    let category = '';
    let categoryColor = '';
    let healthRisk = '';
    
    if (bmi < 16) {
      category = 'Severe Thinness';
      categoryColor = '#d32f2f';
      healthRisk = 'High';
    } else if (bmi < 17) {
      category = 'Moderate Thinness';
      categoryColor = '#f57c00';
      healthRisk = 'Moderate';
    } else if (bmi < 18.5) {
      category = 'Mild Thinness';
      categoryColor = '#fbc02d';
      healthRisk = 'Low';
    } else if (bmi < 25) {
      category = 'Normal';
      categoryColor = '#388e3c';
      healthRisk = 'Low';
    } else if (bmi < 30) {
      category = 'Overweight';
      categoryColor = '#fbc02d';
      healthRisk = 'Increased';
    } else if (bmi < 35) {
      category = 'Obese Class I';
      categoryColor = '#f57c00';
      healthRisk = 'High';
    } else if (bmi < 40) {
      category = 'Obese Class II';
      categoryColor = '#e64a19';
      healthRisk = 'Very High';
    } else {
      category = 'Obese Class III';
      categoryColor = '#d32f2f';
      healthRisk = 'Extremely High';
    }

    const normalWeightMin = 18.5 * (heightM * heightM);
    const normalWeightMax = 24.9 * (heightM * heightM);

    setResult({
      bmi: bmi.toFixed(1),
      category,
      categoryColor,
      healthRisk,
      ponderalIndex: ponderalIndex.toFixed(1),
      normalWeightMin: unit === 'metric' ? normalWeightMin.toFixed(1) : (normalWeightMin * 2.20462).toFixed(1),
      normalWeightMax: unit === 'metric' ? normalWeightMax.toFixed(1) : (normalWeightMax * 2.20462).toFixed(1)
    });
  };

  const bmiCategories = [
    { range: '< 16', category: 'Severe Thinness', color: '#d32f2f' },
    { range: '16 - 17', category: 'Moderate Thinness', color: '#f57c00' },
    { range: '17 - 18.5', category: 'Mild Thinness', color: '#fbc02d' },
    { range: '18.5 - 25', category: 'Normal', color: '#388e3c' },
    { range: '25 - 30', category: 'Overweight', color: '#fbc02d' },
    { range: '30 - 35', category: 'Obese Class I', color: '#f57c00' },
    { range: '35 - 40', category: 'Obese Class II', color: '#e64a19' },
    { range: '> 40', category: 'Obese Class III', color: '#d32f2f' },
  ];

  return (
    <CalculatorLayout title="BMI Calculator" description="Calculate your Body Mass Index (BMI), Ponderal Index, and healthy weight range based on WHO guidelines.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setUnit('metric')}
                className={`flex-1 py-2 px-4 rounded-[3px] font-bold text-sm transition-colors ${
                  unit === 'metric' ? 'bg-[#4a7c9e] text-white' : 'bg-[#e8e8e8] text-[#333]'
                }`}
              >
                Metric Units
              </button>
              <button
                onClick={() => setUnit('imperial')}
                className={`flex-1 py-2 px-4 rounded-[3px] font-bold text-sm transition-colors ${
                  unit === 'imperial' ? 'bg-[#4a7c9e] text-white' : 'bg-[#e8e8e8] text-[#333]'
                }`}
              >
                US Units
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Age</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    min="2"
                    max="120"
                  />
                  <span className="text-sm text-muted-foreground">ages 2 - 120</span>
                </div>
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

              {unit === 'metric' ? (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-1">Height</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                      />
                      <span className="text-sm">cm</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Weight</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                      />
                      <span className="text-sm">kg</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-1">Height</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={heightFeet}
                        onChange={(e) => setHeightFeet(e.target.value)}
                        className="w-20 border border-input rounded-[3px] px-3 py-2 text-sm"
                      />
                      <span className="text-sm">feet</span>
                      <input
                        type="number"
                        value={heightInches}
                        onChange={(e) => setHeightInches(e.target.value)}
                        className="w-20 border border-input rounded-[3px] px-3 py-2 text-sm"
                      />
                      <span className="text-sm">inches</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Weight</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                      />
                      <span className="text-sm">pounds</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-[#5f8d4e] text-white px-6 py-3 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
          >
            Calculate
          </button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2" style={{ borderColor: result.categoryColor }}>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">BMI =</div>
                  <div className="text-5xl font-bold mb-2" style={{ color: result.categoryColor }}>
                    {result.bmi}
                  </div>
                  <div className="text-lg font-bold" style={{ color: result.categoryColor }}>
                    {result.category}
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Results Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">BMI</span>
                    <span className="font-semibold">{result.bmi} kg/m²</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-semibold" style={{ color: result.categoryColor }}>{result.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Health Risk</span>
                    <span className="font-semibold">{result.healthRisk}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Healthy BMI Range</span>
                    <span className="font-semibold">18.5 - 25 kg/m²</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Healthy Weight Range</span>
                    <span className="font-semibold">{result.normalWeightMin} - {result.normalWeightMax} {unit === 'metric' ? 'kg' : 'lbs'}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Ponderal Index</span>
                    <span className="font-semibold">{result.ponderalIndex} kg/m³</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">BMI Categories (WHO)</h3>
                <div className="space-y-1">
                  {bmiCategories.map((cat, idx) => (
                    <div 
                      key={idx} 
                      className={`flex justify-between items-center py-1.5 px-2 rounded-[3px] ${
                        result.category === cat.category ? 'bg-muted' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: cat.color }}></div>
                        <span className="text-sm">{cat.category}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{cat.range}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your details and click Calculate to see your BMI results</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
