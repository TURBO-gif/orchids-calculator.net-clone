"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function DownPaymentCalculatorPage() {
  const [homePrice, setHomePrice] = useState('350000');
  const [targetPercent, setTargetPercent] = useState('20');
  const [currentSavings, setCurrentSavings] = useState('25000');
  const [monthlyContribution, setMonthlyContribution] = useState('1000');
  const [savingsRate, setSavingsRate] = useState('4.0');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const percent = parseFloat(targetPercent) || 20;
    const current = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(savingsRate) || 0) / 100 / 12;

    const targetDown = price * (percent / 100);
    const closingCosts = price * 0.03;
    const totalNeeded = targetDown + closingCosts;
    const remaining = Math.max(0, totalNeeded - current);

    let months = 0;
    let balance = current;
    while (balance < totalNeeded && months < 600) {
      balance = balance * (1 + rate) + monthly;
      months++;
    }

    const downOptions = [
      { percent: 3, amount: price * 0.03, pmi: true, label: 'FHA/Conventional Min' },
      { percent: 5, amount: price * 0.05, pmi: true, label: 'Low Down' },
      { percent: 10, amount: price * 0.10, pmi: true, label: 'Medium' },
      { percent: 20, amount: price * 0.20, pmi: false, label: 'No PMI' }
    ];

    setResult({
      targetDown, closingCosts, totalNeeded, remaining, monthsToGoal: months,
      yearsToGoal: (months / 12).toFixed(1), downOptions, currentSavings: current
    });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Down Payment Calculator" description="Calculate how much you need to save for a home down payment.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Home Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Target Home Price</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Down Payment Target</label><select value={targetPercent} onChange={(e) => setTargetPercent(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="3">3% (FHA Minimum)</option><option value="5">5%</option><option value="10">10%</option><option value="20">20% (No PMI)</option><option value="25">25%</option></select></div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Savings Plan</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Current Savings</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Monthly Contribution</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={monthlyContribution} onChange={(e) => setMonthlyContribution(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Savings Account Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={savingsRate} onChange={(e) => setSavingsRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Time to Goal</h3>
                <div className="text-4xl font-bold text-foreground">{result.yearsToGoal} years</div>
                <div className="text-sm text-muted-foreground">({result.monthsToGoal} months)</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Savings Goal</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Down Payment ({targetPercent}%):</span><span className="font-semibold">{formatCurrency(result.targetDown)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Est. Closing Costs (3%):</span><span className="font-semibold">{formatCurrency(result.closingCosts)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Total Needed:</span><span className="font-bold">{formatCurrency(result.totalNeeded)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Current Savings:</span><span className="font-semibold text-green-600">-{formatCurrency(result.currentSavings)}</span></div>
                  <div className="flex justify-between py-1"><span className="font-bold">Still Need:</span><span className="font-bold text-accent">{formatCurrency(result.remaining)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Down Payment Options</h3>
                <div className="space-y-2 text-sm">
                  {result.downOptions.map((opt: any) => (
                    <div key={opt.percent} className="flex justify-between py-1 items-center">
                      <span className="text-muted-foreground">{opt.percent}% ({opt.label}):</span>
                      <span className="font-semibold">{formatCurrency(opt.amount)} {opt.pmi && <span className="text-xs text-yellow-600">+PMI</span>}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter your details to calculate down payment savings</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
