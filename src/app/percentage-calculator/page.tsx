"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function PercentageCalculatorPage() {
  const [calc1Percent, setCalc1Percent] = useState('25');
  const [calc1Value, setCalc1Value] = useState('200');
  const [calc1Result, setCalc1Result] = useState<string | null>(null);

  const [calc2Value1, setCalc2Value1] = useState('50');
  const [calc2Value2, setCalc2Value2] = useState('200');
  const [calc2Result, setCalc2Result] = useState<string | null>(null);

  const [calc3Value1, setCalc3Value1] = useState('100');
  const [calc3Value2, setCalc3Value2] = useState('150');
  const [calc3Result, setCalc3Result] = useState<string | null>(null);

  const [calc4Value, setCalc4Value] = useState('100');
  const [calc4Percent, setCalc4Percent] = useState('20');
  const [calc4Result, setCalc4Result] = useState<string | null>(null);

  const [calc5Value, setCalc5Value] = useState('100');
  const [calc5Percent, setCalc5Percent] = useState('20');
  const [calc5Result, setCalc5Result] = useState<string | null>(null);

  const [calc6Value1, setCalc6Value1] = useState('50');
  const [calc6Value2, setCalc6Value2] = useState('100');
  const [calc6Result, setCalc6Result] = useState<string | null>(null);

  const calculate1 = () => {
    const p = parseFloat(calc1Percent) || 0;
    const v = parseFloat(calc1Value) || 0;
    setCalc1Result(((p / 100) * v).toFixed(4).replace(/\.?0+$/, ''));
  };

  const calculate2 = () => {
    const v1 = parseFloat(calc2Value1) || 0;
    const v2 = parseFloat(calc2Value2) || 0;
    if (v2 !== 0) {
      setCalc2Result(((v1 / v2) * 100).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const calculate3 = () => {
    const v1 = parseFloat(calc3Value1) || 0;
    const v2 = parseFloat(calc3Value2) || 0;
    if (v1 !== 0) {
      setCalc3Result((((v2 - v1) / v1) * 100).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  const calculate4 = () => {
    const v = parseFloat(calc4Value) || 0;
    const p = parseFloat(calc4Percent) || 0;
    const increase = v * (1 + p / 100);
    setCalc4Result(increase.toFixed(4).replace(/\.?0+$/, ''));
  };

  const calculate5 = () => {
    const v = parseFloat(calc5Value) || 0;
    const p = parseFloat(calc5Percent) || 0;
    const decrease = v * (1 - p / 100);
    setCalc5Result(decrease.toFixed(4).replace(/\.?0+$/, ''));
  };

  const calculate6 = () => {
    const v1 = parseFloat(calc6Value1) || 0;
    const v2 = parseFloat(calc6Value2) || 0;
    const avg = (v1 + v2) / 2;
    if (avg !== 0) {
      const diff = Math.abs(v1 - v2);
      setCalc6Result(((diff / avg) * 100).toFixed(4).replace(/\.?0+$/, ''));
    }
  };

  return (
    <CalculatorLayout title="Percentage Calculator" description="Calculate percentages: what is X% of Y, X is what % of Y, percentage change, increase/decrease, and difference.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-3">What is X% of Y?</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span>What is</span>
              <input
                type="number"
                value={calc1Percent}
                onChange={(e) => setCalc1Percent(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-2 py-1"
              />
              <span>% of</span>
              <input
                type="number"
                value={calc1Value}
                onChange={(e) => setCalc1Value(e.target.value)}
                className="w-24 border border-input rounded-[3px] px-2 py-1"
              />
              <span>?</span>
              <button
                onClick={calculate1}
                className="bg-[#5f8d4e] text-white px-4 py-1.5 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
              >
                Calculate
              </button>
            </div>
            {calc1Result !== null && (
              <div className="mt-3 p-2 bg-[#e8f5e9] rounded-[3px]">
                <span className="font-bold text-[#2e7d32]">Answer: {calc1Result}</span>
              </div>
            )}
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-3">X is what % of Y?</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <input
                type="number"
                value={calc2Value1}
                onChange={(e) => setCalc2Value1(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-2 py-1"
              />
              <span>is what % of</span>
              <input
                type="number"
                value={calc2Value2}
                onChange={(e) => setCalc2Value2(e.target.value)}
                className="w-24 border border-input rounded-[3px] px-2 py-1"
              />
              <span>?</span>
              <button
                onClick={calculate2}
                className="bg-[#5f8d4e] text-white px-4 py-1.5 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
              >
                Calculate
              </button>
            </div>
            {calc2Result !== null && (
              <div className="mt-3 p-2 bg-[#e8f5e9] rounded-[3px]">
                <span className="font-bold text-[#2e7d32]">Answer: {calc2Result}%</span>
              </div>
            )}
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-3">Percentage Change</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span>From</span>
              <input
                type="number"
                value={calc3Value1}
                onChange={(e) => setCalc3Value1(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-2 py-1"
              />
              <span>to</span>
              <input
                type="number"
                value={calc3Value2}
                onChange={(e) => setCalc3Value2(e.target.value)}
                className="w-24 border border-input rounded-[3px] px-2 py-1"
              />
              <button
                onClick={calculate3}
                className="bg-[#5f8d4e] text-white px-4 py-1.5 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
              >
                Calculate
              </button>
            </div>
            {calc3Result !== null && (
              <div className="mt-3 p-2 bg-[#e8f5e9] rounded-[3px]">
                <span className="font-bold text-[#2e7d32]">
                  Answer: {parseFloat(calc3Result) >= 0 ? '+' : ''}{calc3Result}% {parseFloat(calc3Result) >= 0 ? 'increase' : 'decrease'}
                </span>
              </div>
            )}
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-3">Percentage Increase</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span>Increase</span>
              <input
                type="number"
                value={calc4Value}
                onChange={(e) => setCalc4Value(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-2 py-1"
              />
              <span>by</span>
              <input
                type="number"
                value={calc4Percent}
                onChange={(e) => setCalc4Percent(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-2 py-1"
              />
              <span>%</span>
              <button
                onClick={calculate4}
                className="bg-[#5f8d4e] text-white px-4 py-1.5 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
              >
                Calculate
              </button>
            </div>
            {calc4Result !== null && (
              <div className="mt-3 p-2 bg-[#e8f5e9] rounded-[3px]">
                <span className="font-bold text-[#2e7d32]">Answer: {calc4Result}</span>
              </div>
            )}
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-3">Percentage Decrease</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span>Decrease</span>
              <input
                type="number"
                value={calc5Value}
                onChange={(e) => setCalc5Value(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-2 py-1"
              />
              <span>by</span>
              <input
                type="number"
                value={calc5Percent}
                onChange={(e) => setCalc5Percent(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-2 py-1"
              />
              <span>%</span>
              <button
                onClick={calculate5}
                className="bg-[#5f8d4e] text-white px-4 py-1.5 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
              >
                Calculate
              </button>
            </div>
            {calc5Result !== null && (
              <div className="mt-3 p-2 bg-[#e8f5e9] rounded-[3px]">
                <span className="font-bold text-[#2e7d32]">Answer: {calc5Result}</span>
              </div>
            )}
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-3">Percentage Difference</h3>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span>Difference between</span>
              <input
                type="number"
                value={calc6Value1}
                onChange={(e) => setCalc6Value1(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-2 py-1"
              />
              <span>and</span>
              <input
                type="number"
                value={calc6Value2}
                onChange={(e) => setCalc6Value2(e.target.value)}
                className="w-24 border border-input rounded-[3px] px-2 py-1"
              />
              <button
                onClick={calculate6}
                className="bg-[#5f8d4e] text-white px-4 py-1.5 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
              >
                Calculate
              </button>
            </div>
            {calc6Result !== null && (
              <div className="mt-3 p-2 bg-[#e8f5e9] rounded-[3px]">
                <span className="font-bold text-[#2e7d32]">Answer: {calc6Result}%</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-card p-4 rounded-[3px] border border-border">
          <h3 className="font-bold text-base mb-3">Percentage Formulas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-muted rounded-[3px]">
              <div className="font-bold mb-1">X% of Y</div>
              <div className="text-muted-foreground">= (X / 100) × Y</div>
            </div>
            <div className="p-3 bg-muted rounded-[3px]">
              <div className="font-bold mb-1">X is what % of Y</div>
              <div className="text-muted-foreground">= (X / Y) × 100</div>
            </div>
            <div className="p-3 bg-muted rounded-[3px]">
              <div className="font-bold mb-1">% Change from X to Y</div>
              <div className="text-muted-foreground">= ((Y - X) / X) × 100</div>
            </div>
            <div className="p-3 bg-muted rounded-[3px]">
              <div className="font-bold mb-1">Increase X by P%</div>
              <div className="text-muted-foreground">= X × (1 + P/100)</div>
            </div>
            <div className="p-3 bg-muted rounded-[3px]">
              <div className="font-bold mb-1">Decrease X by P%</div>
              <div className="text-muted-foreground">= X × (1 - P/100)</div>
            </div>
            <div className="p-3 bg-muted rounded-[3px]">
              <div className="font-bold mb-1">% Difference</div>
              <div className="text-muted-foreground">= |X - Y| / ((X + Y) / 2) × 100</div>
            </div>
          </div>
        </div>
      </div>
    </CalculatorLayout>
  );
}
