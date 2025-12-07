"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function FractionCalculatorPage() {
  const [num1, setNum1] = useState('1');
  const [den1, setDen1] = useState('2');
  const [num2, setNum2] = useState('1');
  const [den2, setDen2] = useState('3');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<any>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const simplifyFraction = (num: number, den: number) => {
    const divisor = gcd(Math.abs(num), Math.abs(den));
    return {
      numerator: num / divisor,
      denominator: den / divisor
    };
  };

  const calculate = () => {
    const n1 = parseInt(num1) || 0;
    const d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0;
    const d2 = parseInt(den2) || 1;

    let resultNum = 0;
    let resultDen = 1;

    switch (operation) {
      case 'add':
        resultNum = n1 * d2 + n2 * d1;
        resultDen = d1 * d2;
        break;
      case 'subtract':
        resultNum = n1 * d2 - n2 * d1;
        resultDen = d1 * d2;
        break;
      case 'multiply':
        resultNum = n1 * n2;
        resultDen = d1 * d2;
        break;
      case 'divide':
        resultNum = n1 * d2;
        resultDen = d1 * n2;
        break;
    }

    const simplified = simplifyFraction(resultNum, resultDen);
    const decimal = simplified.numerator / simplified.denominator;

    setResult({
      numerator: simplified.numerator,
      denominator: simplified.denominator,
      decimal: decimal.toFixed(4)
    });
  };

  return (
    <CalculatorLayout title="Fraction Calculator" description="Add, subtract, multiply, and divide fractions.">
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="w-20 border border-input rounded-[3px] px-3 py-2 text-sm text-center"
            />
            <div className="border-t border-foreground w-full my-1"></div>
            <input
              type="number"
              value={den1}
              onChange={(e) => setDen1(e.target.value)}
              className="w-20 border border-input rounded-[3px] px-3 py-2 text-sm text-center"
            />
          </div>

          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="add">+</option>
            <option value="subtract">−</option>
            <option value="multiply">×</option>
            <option value="divide">÷</option>
          </select>

          <div className="flex flex-col items-center">
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              className="w-20 border border-input rounded-[3px] px-3 py-2 text-sm text-center"
            />
            <div className="border-t border-foreground w-full my-1"></div>
            <input
              type="number"
              value={den2}
              onChange={(e) => setDen2(e.target.value)}
              className="w-20 border border-input rounded-[3px] px-3 py-2 text-sm text-center"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold w-full"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            <div className="space-y-2">
              <div className="flex flex-col items-center">
                <div className="text-2xl font-bold">{result.numerator}</div>
                <div className="border-t-2 border-foreground w-16 my-1"></div>
                <div className="text-2xl font-bold">{result.denominator}</div>
              </div>
              <p className="text-center mt-4"><strong>Decimal:</strong> {result.decimal}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
