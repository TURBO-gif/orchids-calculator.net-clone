"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function MarriageTaxCalculatorPage() {
  const [income1, setIncome1] = useState('75000');
  const [income2, setIncome2] = useState('65000');
  const [result, setResult] = useState<any>(null);

  const calculateTax = (income: number, brackets: {max: number, rate: number}[]) => {
    let tax = 0;
    let prev = 0;
    for (const b of brackets) {
      if (income <= prev) break;
      const taxable = Math.min(income, b.max) - prev;
      tax += taxable * b.rate;
      prev = b.max;
    }
    return tax;
  };

  const calculate = () => {
    const i1 = parseFloat(income1) || 0;
    const i2 = parseFloat(income2) || 0;
    const combined = i1 + i2;

    const singleBrackets = [
      {max: 11600, rate: 0.10}, {max: 47150, rate: 0.12}, {max: 100525, rate: 0.22},
      {max: 191950, rate: 0.24}, {max: 243725, rate: 0.32}, {max: 609350, rate: 0.35}, {max: Infinity, rate: 0.37}
    ];
    const marriedBrackets = [
      {max: 23200, rate: 0.10}, {max: 94300, rate: 0.12}, {max: 201050, rate: 0.22},
      {max: 383900, rate: 0.24}, {max: 487450, rate: 0.32}, {max: 731200, rate: 0.35}, {max: Infinity, rate: 0.37}
    ];

    const tax1Single = calculateTax(i1, singleBrackets);
    const tax2Single = calculateTax(i2, singleBrackets);
    const totalSingle = tax1Single + tax2Single;
    const taxMarried = calculateTax(combined, marriedBrackets);
    const difference = taxMarried - totalSingle;
    const hasPenalty = difference > 0;

    setResult({ tax1Single, tax2Single, totalSingle, taxMarried, difference, hasPenalty, combined });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Marriage Tax Calculator" description="Calculate the marriage tax penalty or bonus based on your incomes.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Income Information</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Your Annual Income</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={income1} onChange={(e) => setIncome1(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Spouse's Annual Income</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={income2} onChange={(e) => setIncome2(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className={`bg-card p-5 rounded-[3px] border-2 ${result.hasPenalty ? 'border-red-500' : 'border-green-500'}`}>
                <h3 className={`font-bold text-lg mb-2 ${result.hasPenalty ? 'text-red-600' : 'text-green-600'}`}>{result.hasPenalty ? 'Marriage Tax Penalty' : 'Marriage Tax Bonus'}</h3>
                <div className={`text-4xl font-bold ${result.hasPenalty ? 'text-red-600' : 'text-green-600'}`}>{formatCurrency(Math.abs(result.difference))}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Tax Comparison</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Your Tax (Single):</span><span className="font-semibold">{formatCurrency(result.tax1Single)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Spouse Tax (Single):</span><span className="font-semibold">{formatCurrency(result.tax2Single)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total if Filing Separately:</span><span className="font-semibold">{formatCurrency(result.totalSingle)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Tax if Married Filing Jointly:</span><span className="font-bold">{formatCurrency(result.taxMarried)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter incomes to calculate marriage tax impact</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
