"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [quantity, setQuantity] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [numbers, setNumbers] = useState<number[]>([]);

  const generate = () => {
    const minNum = parseInt(min) || 1;
    const maxNum = parseInt(max) || 100;
    const qty = parseInt(quantity) || 1;

    if (minNum >= maxNum) {
      alert('Minimum must be less than maximum');
      return;
    }

    const result: number[] = [];
    const used = new Set<number>();

    for (let i = 0; i < qty; i++) {
      let num: number;
      let attempts = 0;
      
      do {
        num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        attempts++;
        
        if (!allowDuplicates && attempts > 1000) {
          break;
        }
      } while (!allowDuplicates && used.has(num));

      result.push(num);
      used.add(num);
    }

    setNumbers(result);
  };

  return (
    <CalculatorLayout title="Random Number Generator" description="Generate random numbers within a specified range.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Minimum Value</label>
          <input
            type="number"
            value={min}
            onChange={(e) => setMin(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Maximum Value</label>
          <input
            type="number"
            value={max}
            onChange={(e) => setMax(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Quantity</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
            />
            <span className="text-sm">Allow Duplicate Numbers</span>
          </label>
        </div>
        <button
          onClick={generate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold w-full"
        >
          Generate
        </button>
        {numbers.length > 0 && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Generated Numbers:</h3>
            <div className="flex flex-wrap gap-2">
              {numbers.map((num, idx) => (
                <div key={idx} className="bg-accent text-white px-4 py-2 rounded-[3px] font-bold">
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
