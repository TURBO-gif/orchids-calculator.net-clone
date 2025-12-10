"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function SavingsCalculatorPage() {
  const [initial, setInitial] = useState('10000');
  const [monthly, setMonthly] = useState('500');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(initial) || 0;
    const m = parseFloat(monthly) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;

    const fvInitial = p * Math.pow(1 + r, n);
    const fvContrib = r > 0 ? m * ((Math.pow(1 + r, n) - 1) / r) : m * n;
    const total = fvInitial + fvContrib;
    const totalContrib = p + m * n;
    const interest = total - totalContrib;

    setResult({ total, fvInitial, fvContrib, totalContrib, interest, years: parseFloat(years) });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Savings Calculator" description="Calculate how your savings will grow over time with compound interest.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Savings Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Initial Deposit</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={initial} onChange={(e) => setInitial(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Monthly Contribution</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={monthly} onChange={(e) => setMonthly(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Annual Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Time Period</label><div className="flex items-center gap-2"><input type="number" value={years} onChange={(e) => setYears(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">years</span></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Future Balance</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.total)}</div>
                <div className="text-sm text-muted-foreground">After {result.years} years</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Savings Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Contributions:</span><span className="font-semibold">{formatCurrency(result.totalContrib)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Interest Earned:</span><span className="font-semibold text-green-600">{formatCurrency(result.interest)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Final Balance:</span><span className="font-bold text-accent">{formatCurrency(result.total)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter savings details to calculate growth</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
