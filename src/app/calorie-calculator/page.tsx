"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function CalorieCalculatorPage() {
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState('male');
  const [weight, setWeight] = useState('70');
  const [heightCm, setHeightCm] = useState('170');
  const [heightFeet, setHeightFeet] = useState('5');
  const [heightInches, setHeightInches] = useState('7');
  const [activity, setActivity] = useState('moderate');
  const [unit, setUnit] = useState('metric');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let w = parseFloat(weight) || 0;
    let h = 0;
    const a = parseFloat(age) || 0;

    if (unit === 'metric') {
      h = parseFloat(heightCm) || 0;
    } else {
      const totalInches = (parseFloat(heightFeet) || 0) * 12 + (parseFloat(heightInches) || 0);
      h = totalInches * 2.54;
      w = w * 0.453592;
    }

    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmr = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const activityMultipliers: any = {
      sedentary: { multiplier: 1.2, description: 'Sedentary: little or no exercise' },
      light: { multiplier: 1.375, description: 'Light: exercise 1-3 times/week' },
      moderate: { multiplier: 1.55, description: 'Moderate: exercise 4-5 times/week' },
      active: { multiplier: 1.725, description: 'Active: daily exercise or intense 3-4 times/week' },
      veryActive: { multiplier: 1.9, description: 'Very Active: intense exercise 6-7 times/week' },
      extraActive: { multiplier: 2.0, description: 'Extra Active: very intense exercise daily, or physical job' }
    };

    const tdee = bmr * activityMultipliers[activity].multiplier;

    const goals = [
      { name: 'Maintain weight', calories: tdee, change: '0 lb/week' },
      { name: 'Mild weight loss', calories: tdee - 250, change: '0.5 lb/week' },
      { name: 'Weight loss', calories: tdee - 500, change: '1 lb/week' },
      { name: 'Extreme weight loss', calories: tdee - 1000, change: '2 lb/week' },
      { name: 'Mild weight gain', calories: tdee + 250, change: '0.5 lb/week' },
      { name: 'Weight gain', calories: tdee + 500, change: '1 lb/week' },
      { name: 'Fast weight gain', calories: tdee + 1000, change: '2 lb/week' },
    ];

    const activityLevelCalories = Object.entries(activityMultipliers).map(([key, value]: [string, any]) => ({
      level: value.description,
      calories: Math.round(bmr * value.multiplier)
    }));

    const macros = {
      protein: Math.round((tdee * 0.3) / 4),
      carbs: Math.round((tdee * 0.4) / 4),
      fat: Math.round((tdee * 0.3) / 9)
    };

    setResult({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      goals,
      activityLevelCalories,
      macros,
      activityDescription: activityMultipliers[activity].description
    });
  };

  return (
    <CalculatorLayout title="Calorie Calculator" description="Calculate your daily calorie needs for weight maintenance, loss, or gain using the Mifflin-St Jeor equation.">
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-1">Age</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                    <span className="text-sm text-muted-foreground">years</span>
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
              </div>

              {unit === 'metric' ? (
                <>
                  <div>
                    <label className="block text-sm font-bold mb-1">Height</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
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

              <div>
                <label className="block text-sm font-bold mb-1">Activity Level</label>
                <select
                  value={activity}
                  onChange={(e) => setActivity(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                >
                  <option value="sedentary">Sedentary: little or no exercise</option>
                  <option value="light">Light: exercise 1-3 times/week</option>
                  <option value="moderate">Moderate: exercise 4-5 times/week</option>
                  <option value="active">Active: daily exercise or intense 3-4 times/week</option>
                  <option value="veryActive">Very Active: intense exercise 6-7 times/week</option>
                  <option value="extraActive">Extra Active: very intense daily, or physical job</option>
                </select>
              </div>
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
              <div className="bg-[#4a7c9e] text-white p-5 rounded-[3px]">
                <div className="text-center">
                  <div className="text-sm mb-1 opacity-90">Maintenance Calories</div>
                  <div className="text-4xl font-bold">{result.tdee.toLocaleString()}</div>
                  <div className="text-sm opacity-90">Calories/day</div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Daily Calorie Needs</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#4a7c9e] text-white">
                      <tr>
                        <th className="text-left p-2 font-bold">Goal</th>
                        <th className="text-right p-2 font-bold">Calories/day</th>
                        <th className="text-right p-2 font-bold">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.goals.map((goal: any, idx: number) => (
                        <tr key={idx} className={`border-b border-border hover:bg-muted/50 ${goal.name === 'Maintain weight' ? 'bg-[#e8f5e9]' : ''}`}>
                          <td className="p-2">{goal.name}</td>
                          <td className="p-2 text-right font-semibold">{Math.round(goal.calories).toLocaleString()}</td>
                          <td className="p-2 text-right text-muted-foreground">{goal.change}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">BMR & Activity Levels</h3>
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">BMR (Basal Metabolic Rate)</span>
                    <span className="font-bold">{result.bmr.toLocaleString()} Calories/day</span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-2">Calories needed by activity level:</div>
                <div className="space-y-1 text-sm">
                  {result.activityLevelCalories.map((item: any, idx: number) => (
                    <div key={idx} className={`flex justify-between py-1 ${item.level === result.activityDescription ? 'bg-[#e8f5e9] px-2 rounded-[3px]' : ''}`}>
                      <span className="text-muted-foreground">{item.level}</span>
                      <span className="font-semibold">{item.calories.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Suggested Macros (Balanced)</h3>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-[#e3f2fd] rounded-[3px]">
                    <div className="text-2xl font-bold text-[#1565c0]">{result.macros.protein}g</div>
                    <div className="text-xs text-[#1565c0]">Protein (30%)</div>
                  </div>
                  <div className="p-3 bg-[#fff3e0] rounded-[3px]">
                    <div className="text-2xl font-bold text-[#e65100]">{result.macros.carbs}g</div>
                    <div className="text-xs text-[#e65100]">Carbs (40%)</div>
                  </div>
                  <div className="p-3 bg-[#fce4ec] rounded-[3px]">
                    <div className="text-2xl font-bold text-[#c2185b]">{result.macros.fat}g</div>
                    <div className="text-xs text-[#c2185b]">Fat (30%)</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your details and click Calculate to see your calorie needs</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
