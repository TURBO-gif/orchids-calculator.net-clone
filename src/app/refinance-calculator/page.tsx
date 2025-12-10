"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RefinanceCalculatorPage() {
  const [currentBalance, setCurrentBalance] = useState('250000');
  const [currentRate, setCurrentRate] = useState('7.5');
  const [currentTerm, setCurrentTerm] = useState('25');
  const [newRate, setNewRate] = useState('6.0');
  const [newTerm, setNewTerm] = useState('30');
  const [closingCosts, setClosingCosts] = useState('5000');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const balance = parseFloat(currentBalance) || 0;
    const oldRate = (parseFloat(currentRate) || 0) / 100 / 12;
    const oldTerm = (parseFloat(currentTerm) || 0) * 12;
    const newRateMonthly = (parseFloat(newRate) || 0) / 100 / 12;
    const newTermMonths = (parseFloat(newTerm) || 0) * 12;
    const costs = parseFloat(closingCosts) || 0;

    const currentPayment = oldRate > 0
      ? (balance * oldRate * Math.pow(1 + oldRate, oldTerm)) / (Math.pow(1 + oldRate, oldTerm) - 1)
      : balance / oldTerm;

    const newPayment = newRateMonthly > 0
      ? (balance * newRateMonthly * Math.pow(1 + newRateMonthly, newTermMonths)) / (Math.pow(1 + newRateMonthly, newTermMonths) - 1)
      : balance / newTermMonths;

    const monthlySavings = currentPayment - newPayment;
    const currentTotalCost = currentPayment * oldTerm;
    const newTotalCost = newPayment * newTermMonths + costs;
    const lifetimeSavings = currentTotalCost - newTotalCost;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(costs / monthlySavings) : 0;

    setResult({
      currentPayment,
      newPayment,
      monthlySavings,
      currentTotalCost,
      newTotalCost,
      lifetimeSavings,
      breakEvenMonths,
      worthIt: lifetimeSavings > 0
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout title="Refinance Calculator" description="Calculate if refinancing your mortgage makes financial sense.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Current Loan</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Current Balance</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Current Interest Rate</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="0.1" value={currentRate} onChange={(e) => setCurrentRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Remaining Term (Years)</label>
                <input type="number" value={currentTerm} onChange={(e) => setCurrentTerm(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">New Loan</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">New Interest Rate</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="0.1" value={newRate} onChange={(e) => setNewRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">New Loan Term</label>
                <select value={newTerm} onChange={(e) => setNewTerm(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm">
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Closing Costs</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className={`bg-card p-5 rounded-[3px] border-2 ${result.worthIt ? 'border-green-500' : 'border-red-500'}`}>
                <h3 className={`font-bold text-lg mb-2 ${result.worthIt ? 'text-green-600' : 'text-red-600'}`}>
                  {result.worthIt ? 'Refinancing Makes Sense!' : 'May Not Be Worth It'}
                </h3>
                <div className="text-4xl font-bold text-foreground">
                  {result.monthlySavings >= 0 ? '+' : ''}{formatCurrency(result.monthlySavings)}/mo
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Payment Comparison</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Current Payment:</span><span className="font-semibold">{formatCurrency(result.currentPayment)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">New Payment:</span><span className="font-semibold">{formatCurrency(result.newPayment)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Monthly Savings:</span><span className={`font-bold ${result.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(result.monthlySavings)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Long-term Analysis</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Current Total Cost:</span><span className="font-semibold">{formatCurrency(result.currentTotalCost)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">New Total Cost (incl. fees):</span><span className="font-semibold">{formatCurrency(result.newTotalCost)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Break-even Point:</span><span className="font-semibold">{result.breakEvenMonths} months</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Lifetime Savings:</span><span className={`font-bold ${result.lifetimeSavings >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(result.lifetimeSavings)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter loan details to see if refinancing makes sense</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
