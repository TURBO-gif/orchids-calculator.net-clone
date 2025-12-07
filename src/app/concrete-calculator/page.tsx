"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function ConcreteCalculatorPage() {
  const [shape, setShape] = useState('slab');
  const [length, setLength] = useState('10');
  const [width, setWidth] = useState('10');
  const [thickness, setThickness] = useState('4');
  const [diameter, setDiameter] = useState('10');
  const [unit, setUnit] = useState('feet');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let l = parseFloat(length) || 0;
    let w = parseFloat(width) || 0;
    let t = parseFloat(thickness) || 0;
    let d = parseFloat(diameter) || 0;

    // Convert to feet if meters
    if (unit === 'meters') {
      l = l * 3.28084;
      w = w * 3.28084;
      t = t * 3.28084;
      d = d * 3.28084;
    }

    // Convert thickness to feet if in inches
    if (unit === 'feet') {
      t = t / 12;
    }

    let volume = 0;

    if (shape === 'slab') {
      volume = l * w * t;
    } else if (shape === 'footing') {
      volume = l * w * t;
    } else if (shape === 'column') {
      const radius = d / 2;
      volume = Math.PI * radius * radius * l;
    } else if (shape === 'stairs') {
      // Simplified stairs calculation
      volume = l * w * t;
    }

    // Convert to cubic yards (1 cubic yard = 27 cubic feet)
    const cubicYards = volume / 27;
    
    // Estimate bags (80lb bags cover ~0.6 cubic feet, 60lb bags ~0.45 cubic feet)
    const bags80lb = Math.ceil(volume / 0.6);
    const bags60lb = Math.ceil(volume / 0.45);

    // Estimate cost (approximate)
    const cost80lb = bags80lb * 4; // ~$4 per 80lb bag
    const cost60lb = bags60lb * 3.5; // ~$3.5 per 60lb bag

    setResult({
      volume: volume.toFixed(2),
      cubicYards: cubicYards.toFixed(2),
      bags80lb,
      bags60lb,
      cost80lb: cost80lb.toFixed(2),
      cost60lb: cost60lb.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Concrete Calculator" description="Calculate concrete volume and material needed for your project.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Unit System</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="feet">Feet/Inches</option>
            <option value="meters">Meters</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Shape</label>
          <select
            value={shape}
            onChange={(e) => setShape(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="slab">Slab</option>
            <option value="footing">Footing</option>
            <option value="column">Column (Cylinder)</option>
            <option value="stairs">Stairs</option>
          </select>
        </div>

        {shape !== 'column' && (
          <>
            <div>
              <label className="block text-sm font-bold mb-1">Length ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Width ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                step="0.1"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Thickness ({unit === 'feet' ? 'inches' : 'm'})</label>
              <input
                type="number"
                step="0.1"
                value={thickness}
                onChange={(e) => setThickness(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </>
        )}

        {shape === 'column' && (
          <>
            <div>
              <label className="block text-sm font-bold mb-1">Diameter ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                step="0.1"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Height ({unit === 'feet' ? 'ft' : 'm'})</label>
              <input
                type="number"
                step="0.1"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </>
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
              <p><strong>Volume:</strong> {result.volume} cubic feet</p>
              <p><strong>Volume:</strong> {result.cubicYards} cubic yards</p>
              <p><strong>80lb Bags Needed:</strong> {result.bags80lb} (≈ ${result.cost80lb})</p>
              <p><strong>60lb Bags Needed:</strong> {result.bags60lb} (≈ ${result.cost60lb})</p>
              <p className="text-sm mt-4">*Add 5-10% extra for waste and spillage</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
