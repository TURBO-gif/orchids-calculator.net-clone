"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function SimpleInterestCalculatorPage() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('5');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;

    const interest = p * r * t;
    const total = p + interest;
    const monthlyInterest = interest / (t * 12);

    setResult({ principal: p, interest, total, monthlyInterest, years: t, rate: parseFloat(rate) });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);

  return (
    <CalculatorLayout title="Simple Interest Calculator" description="Calculate simple interest on a principal amount.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Interest Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Principal Amount</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Annual Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Time Period</label><div className="flex items-center gap-2"><input type="number" value={time} onChange={(e) => setTime(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">years</span></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Total Interest</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.interest)}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Interest Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Principal:</span><span className="font-semibold">{formatCurrency(result.principal)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Interest Rate:</span><span className="font-semibold">{result.rate}%</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Time Period:</span><span className="font-semibold">{result.years} years</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Monthly Interest:</span><span className="font-semibold">{formatCurrency(result.monthlyInterest)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Total Amount:</span><span className="font-bold text-accent">{formatCurrency(result.total)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter details to calculate simple interest</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
