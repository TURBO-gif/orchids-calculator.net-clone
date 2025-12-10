'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Baby, Scale, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

type BMICategory = 'underweight' | 'normal' | 'overweight' | 'obese';

interface WeeklyTarget {
  week: number;
  minWeight: number;
  maxWeight: number;
  trimester: number;
}

const getWeightGainRange = (bmiCategory: BMICategory, isMultiples: boolean): { min: number; max: number; weeklyMin: number; weeklyMax: number } => {
  if (isMultiples) {
    switch (bmiCategory) {
      case 'underweight':
      case 'normal':
        return { min: 37, max: 54, weeklyMin: 0.58, weeklyMax: 0.68 };
      case 'overweight':
        return { min: 31, max: 50, weeklyMin: 0.48, weeklyMax: 0.58 };
      case 'obese':
        return { min: 25, max: 42, weeklyMin: 0.38, weeklyMax: 0.48 };
    }
  }
  
  switch (bmiCategory) {
    case 'underweight':
      return { min: 28, max: 40, weeklyMin: 0.44, weeklyMax: 0.58 };
    case 'normal':
      return { min: 25, max: 35, weeklyMin: 0.35, weeklyMax: 0.50 };
    case 'overweight':
      return { min: 15, max: 25, weeklyMin: 0.23, weeklyMax: 0.33 };
    case 'obese':
      return { min: 11, max: 20, weeklyMin: 0.17, weeklyMax: 0.27 };
  }
};

const getBMICategory = (bmi: number): BMICategory => {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'normal';
  if (bmi < 30) return 'overweight';
  return 'obese';
};

const PregnancyWeightGainCalculatorPage = () => {
  const [prePregnancyWeight, setPrePregnancyWeight] = useState<string>('60');
  const [currentWeight, setCurrentWeight] = useState<string>('63');
  const [height, setHeight] = useState<string>('165');
  const [currentWeek, setCurrentWeek] = useState<string>('12');
  const [isMultiples, setIsMultiples] = useState(false);
  const [useImperial, setUseImperial] = useState(false);
  const [results, setResults] = useState<{
    bmi: number;
    bmiCategory: BMICategory;
    totalGainRange: { min: number; max: number };
    currentGain: number;
    expectedGainNow: { min: number; max: number };
    status: 'under' | 'on-track' | 'over';
    weeklyTargets: WeeklyTarget[];
    remainingWeeks: number;
    remainingGain: { min: number; max: number };
  } | null>(null);

  const calculateWeightGain = () => {
    let weightKg = parseFloat(prePregnancyWeight);
    let currentWeightKg = parseFloat(currentWeight);
    let heightM = parseFloat(height) / 100;
    const week = parseInt(currentWeek);

    if (useImperial) {
      weightKg = weightKg * 0.453592;
      currentWeightKg = currentWeightKg * 0.453592;
      heightM = parseFloat(height) * 0.0254;
    }

    const bmi = weightKg / (heightM * heightM);
    const bmiCategory = getBMICategory(bmi);
    const gainRange = getWeightGainRange(bmiCategory, isMultiples);
    const currentGain = currentWeightKg - weightKg;

    // Calculate expected gain at current week
    let expectedGainNow: { min: number; max: number };
    if (week <= 13) {
      // First trimester: 1-4 lbs total (0.45-1.8 kg)
      const firstTrimesterMin = 0.45;
      const firstTrimesterMax = 1.8;
      expectedGainNow = {
        min: (week / 13) * firstTrimesterMin,
        max: (week / 13) * firstTrimesterMax,
      };
    } else {
      // After first trimester: first trimester gain + weekly gain
      const weeksAfterFirst = week - 13;
      expectedGainNow = {
        min: 0.45 + weeksAfterFirst * gainRange.weeklyMin,
        max: 1.8 + weeksAfterFirst * gainRange.weeklyMax,
      };
    }

    // Determine status
    let status: 'under' | 'on-track' | 'over';
    if (currentGain < expectedGainNow.min - 1) {
      status = 'under';
    } else if (currentGain > expectedGainNow.max + 1) {
      status = 'over';
    } else {
      status = 'on-track';
    }

    // Generate weekly targets
    const weeklyTargets: WeeklyTarget[] = [];
    for (let w = 1; w <= 40; w++) {
      let minWeight: number, maxWeight: number;
      const trimester = w <= 13 ? 1 : w <= 26 ? 2 : 3;

      if (w <= 13) {
        minWeight = weightKg + (w / 13) * 0.45;
        maxWeight = weightKg + (w / 13) * 1.8;
      } else {
        const weeksAfter = w - 13;
        minWeight = weightKg + 0.45 + weeksAfter * gainRange.weeklyMin;
        maxWeight = weightKg + 1.8 + weeksAfter * gainRange.weeklyMax;
      }

      weeklyTargets.push({
        week: w,
        minWeight: useImperial ? minWeight / 0.453592 : minWeight,
        maxWeight: useImperial ? maxWeight / 0.453592 : maxWeight,
        trimester,
      });
    }

    const remainingWeeks = 40 - week;
    const remainingGain = {
      min: Math.max(0, gainRange.min - currentGain),
      max: Math.max(0, gainRange.max - currentGain),
    };

    setResults({
      bmi: Math.round(bmi * 10) / 10,
      bmiCategory,
      totalGainRange: gainRange,
      currentGain: Math.round(currentGain * 10) / 10,
      expectedGainNow: {
        min: Math.round(expectedGainNow.min * 10) / 10,
        max: Math.round(expectedGainNow.max * 10) / 10,
      },
      status,
      weeklyTargets,
      remainingWeeks,
      remainingGain: {
        min: Math.round(remainingGain.min * 10) / 10,
        max: Math.round(remainingGain.max * 10) / 10,
      },
    });
  };

  const bmiCategoryLabels: Record<BMICategory, string> = {
    underweight: 'Underweight (BMI < 18.5)',
    normal: 'Normal Weight (BMI 18.5-24.9)',
    overweight: 'Overweight (BMI 25-29.9)',
    obese: 'Obese (BMI 30+)',
  };

  const bmiCategoryColors: Record<BMICategory, string> = {
    underweight: 'text-blue-600 bg-blue-50',
    normal: 'text-green-600 bg-green-50',
    overweight: 'text-amber-600 bg-amber-50',
    obese: 'text-red-600 bg-red-50',
  };

  const statusConfig = {
    under: { label: 'Below Target', color: 'text-amber-600 bg-amber-50', icon: AlertCircle },
    'on-track': { label: 'On Track', color: 'text-green-600 bg-green-50', icon: CheckCircle },
    over: { label: 'Above Target', color: 'text-red-600 bg-red-50', icon: AlertCircle },
  };

  const weightUnit = useImperial ? 'lbs' : 'kg';
  const heightUnit = useImperial ? 'inches' : 'cm';

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Calculators
        </Link>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 text-white mb-4">
            <Baby className="w-8 h-8" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Pregnancy Weight Gain Calculator</h1>
          <p className="text-gray-600">Track your healthy pregnancy weight gain based on IOM guidelines</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Scale className="w-5 h-5 text-pink-600" />
              Enter Your Details
            </h2>

            <div className="space-y-5">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Unit System</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUseImperial(false)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!useImperial ? 'bg-pink-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    Metric
                  </button>
                  <button
                    onClick={() => setUseImperial(true)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${useImperial ? 'bg-pink-600 text-white' : 'bg-white text-gray-600'}`}
                  >
                    Imperial
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Height ({heightUnit})
                </label>
                <input
                  type="number"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pre-pregnancy Weight ({weightUnit})
                  </label>
                  <input
                    type="number"
                    value={prePregnancyWeight}
                    onChange={(e) => setPrePregnancyWeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Weight ({weightUnit})
                  </label>
                  <input
                    type="number"
                    value={currentWeight}
                    onChange={(e) => setCurrentWeight(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Week of Pregnancy
                </label>
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={currentWeek}
                  onChange={(e) => setCurrentWeek(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                <input
                  type="checkbox"
                  id="multiples"
                  checked={isMultiples}
                  onChange={(e) => setIsMultiples(e.target.checked)}
                  className="w-5 h-5 text-pink-600 rounded focus:ring-pink-500"
                />
                <label htmlFor="multiples" className="font-medium text-gray-700">
                  Carrying twins or multiples
                </label>
              </div>

              <button
                onClick={calculateWeightGain}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
              >
                Calculate Weight Gain
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {results && (
              <>
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4">Your Weight Gain Summary</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className={`p-4 rounded-xl ${bmiCategoryColors[results.bmiCategory]}`}>
                      <div className="text-sm font-medium mb-1">Pre-pregnancy BMI</div>
                      <div className="text-2xl font-bold">{results.bmi}</div>
                      <div className="text-xs mt-1">{bmiCategoryLabels[results.bmiCategory]}</div>
                    </div>
                    <div className={`p-4 rounded-xl ${statusConfig[results.status].color}`}>
                      <div className="text-sm font-medium mb-1">Current Status</div>
                      <div className="text-2xl font-bold flex items-center gap-2">
                        {statusConfig[results.status].label}
                      </div>
                      <div className="text-xs mt-1">Week {currentWeek}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Current Weight Gain</span>
                      <span className="font-bold text-gray-900">{results.currentGain} {weightUnit}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Expected Gain (Week {currentWeek})</span>
                      <span className="font-bold text-gray-900">
                        {results.expectedGainNow.min} - {results.expectedGainNow.max} {weightUnit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-pink-50 rounded-lg">
                      <span className="text-pink-700">Total Recommended Gain</span>
                      <span className="font-bold text-pink-800">
                        {results.totalGainRange.min} - {results.totalGainRange.max} {weightUnit}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Remaining Weeks</span>
                      <span className="font-bold text-gray-900">{results.remainingWeeks} weeks</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Remaining Gain Needed</span>
                      <span className="font-bold text-gray-900">
                        {results.remainingGain.min} - {results.remainingGain.max} {weightUnit}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-pink-600" />
                    Weight Gain Schedule by Trimester
                  </h3>
                  <div className="overflow-x-auto max-h-64 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0 bg-white">
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 font-medium text-gray-600">Week</th>
                          <th className="text-left py-2 font-medium text-gray-600">Trimester</th>
                          <th className="text-right py-2 font-medium text-gray-600">Target Weight ({weightUnit})</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.weeklyTargets
                          .filter((_, i) => i % 4 === 0 || i === results.weeklyTargets.length - 1)
                          .map((target) => (
                            <tr
                              key={target.week}
                              className={`border-b border-gray-100 ${target.week === parseInt(currentWeek) ? 'bg-pink-50' : ''}`}
                            >
                              <td className="py-2 font-medium text-gray-900">Week {target.week}</td>
                              <td className="py-2 text-gray-600">
                                {target.trimester === 1 ? '1st' : target.trimester === 2 ? '2nd' : '3rd'}
                              </td>
                              <td className="py-2 text-right text-gray-700">
                                {target.minWeight.toFixed(1)} - {target.maxWeight.toFixed(1)}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-pink-100 to-rose-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-pink-900 mb-2">IOM Weight Gain Guidelines</h4>
                  <div className="text-sm text-pink-800 space-y-1">
                    <p><strong>Underweight (BMI &lt; 18.5):</strong> 28-40 lbs (12.5-18 kg)</p>
                    <p><strong>Normal (BMI 18.5-24.9):</strong> 25-35 lbs (11.5-16 kg)</p>
                    <p><strong>Overweight (BMI 25-29.9):</strong> 15-25 lbs (7-11.5 kg)</p>
                    <p><strong>Obese (BMI 30+):</strong> 11-20 lbs (5-9 kg)</p>
                  </div>
                </div>
              </>
            )}

            {!results && (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 text-center">
                <Baby className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500">Enter your details and click calculate</h3>
                <p className="text-sm text-gray-400 mt-2">Your personalized weight gain targets will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PregnancyWeightGainCalculatorPage;
