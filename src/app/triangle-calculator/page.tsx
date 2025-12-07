"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function TriangleCalculatorPage() {
  const [sideA, setSideA] = useState('3');
  const [sideB, setSideB] = useState('4');
  const [sideC, setSideC] = useState('5');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const a = parseFloat(sideA) || 0;
    const b = parseFloat(sideB) || 0;
    const c = parseFloat(sideC) || 0;

    // Check if valid triangle
    if (a + b <= c || a + c <= b || b + c <= a) {
      setResult({ error: 'Invalid triangle: sum of two sides must be greater than the third side' });
      return;
    }

    // Calculate area using Heron's formula
    const s = (a + b + c) / 2;
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));

    // Calculate angles using law of cosines
    const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB;

    // Calculate perimeter
    const perimeter = a + b + c;

    // Calculate heights
    const heightA = (2 * area) / a;
    const heightB = (2 * area) / b;
    const heightC = (2 * area) / c;

    // Determine triangle type
    let type = '';
    if (a === b && b === c) type = 'Equilateral';
    else if (a === b || b === c || a === c) type = 'Isosceles';
    else type = 'Scalene';

    // Check if right triangle
    const sides = [a, b, c].sort((x, y) => x - y);
    const isRight = Math.abs(sides[0] ** 2 + sides[1] ** 2 - sides[2] ** 2) < 0.0001;
    if (isRight) type += ' Right';

    setResult({
      area: area.toFixed(2),
      perimeter: perimeter.toFixed(2),
      angleA: angleA.toFixed(2),
      angleB: angleB.toFixed(2),
      angleC: angleC.toFixed(2),
      heightA: heightA.toFixed(2),
      heightB: heightB.toFixed(2),
      heightC: heightC.toFixed(2),
      type
    });
  };

  return (
    <CalculatorLayout title="Triangle Calculator" description="Calculate triangle properties from three sides.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Side a</label>
          <input
            type="number"
            step="0.01"
            value={sideA}
            onChange={(e) => setSideA(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Side b</label>
          <input
            type="number"
            step="0.01"
            value={sideB}
            onChange={(e) => setSideB(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Side c</label>
          <input
            type="number"
            step="0.01"
            value={sideC}
            onChange={(e) => setSideC(e.target.value)}
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
            {result.error ? (
              <p className="text-destructive">{result.error}</p>
            ) : (
              <div className="space-y-2">
                <p><strong>Type:</strong> {result.type} Triangle</p>
                <p><strong>Area:</strong> {result.area}</p>
                <p><strong>Perimeter:</strong> {result.perimeter}</p>
                <p><strong>Angle A:</strong> {result.angleA}°</p>
                <p><strong>Angle B:</strong> {result.angleB}°</p>
                <p><strong>Angle C:</strong> {result.angleC}°</p>
                <p><strong>Height to side a:</strong> {result.heightA}</p>
                <p><strong>Height to side b:</strong> {result.heightB}</p>
                <p><strong>Height to side c:</strong> {result.heightC}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
