'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calculator, Apple, Beef, Wheat, Droplets } from 'lucide-react';

type Gender = 'male' | 'female';
type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
type Goal = 'lose' | 'maintain' | 'gain';
type Formula = 'default' | 'low-fat' | 'low-carb' | 'high-protein';

const activityMultipliers: Record<ActivityLevel, number> = {
  'sedentary': 1.2,
  'light': 1.375,
  'moderate': 1.55,
  'active': 1.725,
  'very-active': 1.9,
};

const activityLabels: Record<ActivityLevel, string> = {
  'sedentary': 'Sedentary (little or no exercise)',
  'light': 'Light (exercise 1-3 days/week)',
  'moderate': 'Moderate (exercise 3-5 days/week)',
  'active': 'Active (exercise 6-7 days/week)',
  'very-active': 'Very Active (hard exercise daily)',
};

const formulaLabels: Record<Formula, string> = {
  'default': 'Balanced (40/30/30)',
  'low-fat': 'Low Fat (50/25/25)',
  'low-carb': 'Low Carb (20/40/40)',
  'high-protein': 'High Protein (25/45/30)',
};

const MacroCalculatorPage = () => {
  const [age, setAge] = useState<string>('30');
  const [gender, setGender] = useState<Gender>('male');
  const [height, setHeight] = useState<string>('170');
  const [weight, setWeight] = useState<string>('70');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>('moderate');
  const [goal, setGoal] = useState<Goal>('maintain');
  const [formula, setFormula] = useState<Formula>('default');
  const [useImperial, setUseImperial] = useState(false);
  const [results, setResults] = useState<{
    bmr: number;
    tdee: number;
    targetCalories: number;
    protein: { grams: number; calories: number; percent: number };
    carbs: { grams: number; calories: number; percent: number };
    fat: { grams: number; calories: number; percent: number };
    mealsBreakdown: { meal: string; calories: number; protein: number; carbs: number; fat: number }[];
  } | null>(null);

  const calculateMacros = () => {
    let weightKg = parseFloat(weight);
    let heightCm = parseFloat(height);
    const ageYears = parseInt(age);

    if (useImperial) {
      weightKg = weightKg * 0.453592;
      heightCm = heightCm * 2.54;
    }

    // BMR using Mifflin-St Jeor Equation
    let bmr: number;
    if (gender === 'male') {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears + 5;
    } else {
      bmr = 10 * weightKg + 6.25 * heightCm - 5 * ageYears - 161;
    }

    // TDEE
    const tdee = bmr * activityMultipliers[activityLevel];

    // Target calories based on goal
    let targetCalories: number;
    switch (goal) {
      case 'lose':
        targetCalories = tdee - 500;
        break;
      case 'gain':
        targetCalories = tdee + 500;
        break;
      default:
        targetCalories = tdee;
    }

    // Macro ratios based on formula
    let carbPercent: number, proteinPercent: number, fatPercent: number;
    switch (formula) {
      case 'low-fat':
        carbPercent = 50;
        proteinPercent = 25;
        fatPercent = 25;
        break;
      case 'low-carb':
        carbPercent = 20;
        proteinPercent = 40;
        fatPercent = 40;
        break;
      case 'high-protein':
        carbPercent = 25;
        proteinPercent = 45;
        fatPercent = 30;
        break;
      default:
        carbPercent = 40;
        proteinPercent = 30;
        fatPercent = 30;
    }

    // Calculate grams
    const proteinCalories = targetCalories * (proteinPercent / 100);
    const carbCalories = targetCalories * (carbPercent / 100);
    const fatCalories = targetCalories * (fatPercent / 100);

    const proteinGrams = proteinCalories / 4;
    const carbGrams = carbCalories / 4;
    const fatGrams = fatCalories / 9;

    // Meals breakdown (3 meals + 2 snacks)
    const mealsBreakdown = [
      { meal: 'Breakfast', calories: targetCalories * 0.25, protein: proteinGrams * 0.25, carbs: carbGrams * 0.25, fat: fatGrams * 0.25 },
      { meal: 'Morning Snack', calories: targetCalories * 0.1, protein: proteinGrams * 0.1, carbs: carbGrams * 0.1, fat: fatGrams * 0.1 },
      { meal: 'Lunch', calories: targetCalories * 0.3, protein: proteinGrams * 0.3, carbs: carbGrams * 0.3, fat: fatGrams * 0.3 },
      { meal: 'Afternoon Snack', calories: targetCalories * 0.1, protein: proteinGrams * 0.1, carbs: carbGrams * 0.1, fat: fatGrams * 0.1 },
      { meal: 'Dinner', calories: targetCalories * 0.25, protein: proteinGrams * 0.25, carbs: carbGrams * 0.25, fat: fatGrams * 0.25 },
    ];

    setResults({
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      targetCalories: Math.round(targetCalories),
      protein: { grams: Math.round(proteinGrams), calories: Math.round(proteinCalories), percent: proteinPercent },
      carbs: { grams: Math.round(carbGrams), calories: Math.round(carbCalories), percent: carbPercent },
      fat: { grams: Math.round(fatGrams), calories: Math.round(fatCalories), percent: fatPercent },
      mealsBreakdown,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Calculators
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white mb-4">
            <Apple className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Macro Calculator</h1>
          <p className="text-gray-600">Calculate your daily macronutrient needs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-green-600" />
              Enter Your Details
            </h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Unit System</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUseImperial(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!useImperial ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUseImperial(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${useImperial ? 'bg-green-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    Imperial
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                    placeholder="Years"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Gender)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Height ({useImperial ? 'inches' : 'cm'})
                  </label>
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight ({useImperial ? 'lbs' : 'kg'})
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as ActivityLevel)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  {Object.entries(activityLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Goal</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['lose', 'maintain', 'gain'] as Goal[]).map((g) => (
                    <button
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${goal === g ? 'bg-green-600 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {g === 'lose' ? 'Lose Weight' : g === 'maintain' ? 'Maintain' : 'Gain Weight'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Macro Formula</label>
                <select
                  value={formula}
                  onChange={(e) => setFormula(e.target.value as Formula)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                >
                  {Object.entries(formulaLabels).map(([key, label]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={calculateMacros}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Calculate Macros
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {results && (
              <>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Daily Calorie Summary</h3>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">BMR</div>
                      <div className="text-xl font-bold text-gray-900">{results.bmr}</div>
                      <div className="text-xs text-gray-400">calories</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-xl">
                      <div className="text-sm text-gray-500 mb-1">TDEE</div>
                      <div className="text-xl font-bold text-gray-900">{results.tdee}</div>
                      <div className="text-xs text-gray-400">calories</div>
                    </div>
                    <div className="text-center p-4 bg-green-100 rounded-xl">
                      <div className="text-sm text-green-700 mb-1">Target</div>
                      <div className="text-xl font-bold text-green-800">{results.targetCalories}</div>
                      <div className="text-xs text-green-600">calories</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Daily Macronutrients</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
                        <Beef className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-blue-900">Protein</span>
                          <span className="text-sm text-blue-600">{results.protein.percent}%</span>
                        </div>
                        <div className="text-2xl font-bold text-blue-800">{results.protein.grams}g</div>
                        <div className="text-sm text-blue-600">{results.protein.calories} calories</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-amber-50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-amber-500 flex items-center justify-center">
                        <Wheat className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-amber-900">Carbohydrates</span>
                          <span className="text-sm text-amber-600">{results.carbs.percent}%</span>
                        </div>
                        <div className="text-2xl font-bold text-amber-800">{results.carbs.grams}g</div>
                        <div className="text-sm text-amber-600">{results.carbs.calories} calories</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-rose-50 rounded-xl">
                      <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center">
                        <Droplets className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-rose-900">Fat</span>
                          <span className="text-sm text-rose-600">{results.fat.percent}%</span>
                        </div>
                        <div className="text-2xl font-bold text-rose-800">{results.fat.grams}g</div>
                        <div className="text-sm text-rose-600">{results.fat.calories} calories</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 h-4 rounded-full overflow-hidden flex">
                    <div style={{ width: `${results.protein.percent}%` }} className="bg-blue-500"></div>
                    <div style={{ width: `${results.carbs.percent}%` }} className="bg-amber-500"></div>
                    <div style={{ width: `${results.fat.percent}%` }} className="bg-rose-500"></div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Meal Breakdown</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-medium text-gray-600">Meal</th>
                          <th className="text-right py-2 font-medium text-gray-600">Calories</th>
                          <th className="text-right py-2 font-medium text-blue-600">Protein</th>
                          <th className="text-right py-2 font-medium text-amber-600">Carbs</th>
                          <th className="text-right py-2 font-medium text-rose-600">Fat</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.mealsBreakdown.map((meal, i) => (
                          <tr key={i} className="border-b border-gray-100">
                            <td className="py-3 font-medium text-gray-900">{meal.meal}</td>
                            <td className="text-right py-3 text-gray-700">{Math.round(meal.calories)}</td>
                            <td className="text-right py-3 text-blue-700">{Math.round(meal.protein)}g</td>
                            <td className="text-right py-3 text-amber-700">{Math.round(meal.carbs)}g</td>
                            <td className="text-right py-3 text-rose-700">{Math.round(meal.fat)}g</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}

            {!results && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                <Apple className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500">Enter your details and click calculate</h3>
                <p className="text-sm text-gray-400 mt-2">Your personalized macro breakdown will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MacroCalculatorPage;
