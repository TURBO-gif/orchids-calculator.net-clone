"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function AnnuityPayoutCalculatorPage() {
  const [principal, setPrincipal] = useState('500000');
  const [interestRate, setInterestRate] = useState('4');
  const [payoutYears, setPayoutYears] = useState('25');
  const [payoutType, setPayoutType] = useState('fixed');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const months = (parseFloat(payoutYears) || 25) * 12;

    let monthlyPayout = 0;
    if (payoutType === 'fixed') {
      monthlyPayout = rate > 0 ? (p * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1) : p / months;
    } else {
      monthlyPayout = p * rate;
    }

    const annualPayout = monthlyPayout * 12;
    const totalPayout = payoutType === 'fixed' ? monthlyPayout * months : monthlyPayout * months;
    const totalInterest = totalPayout - p;

    setResult({ monthlyPayout, annualPayout, totalPayout, totalInterest, years: parseFloat(payoutYears), payoutType });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Annuity Payout Calculator" description="Calculate your annuity payout amounts based on your balance.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Payout Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Annuity Balance</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Payout Period</label><div className="flex items-center gap-2"><input type="number" value={payoutYears} onChange={(e) => setPayoutYears(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">years</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Payout Type</label><select value={payoutType} onChange={(e) => setPayoutType(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="fixed">Fixed Period (Principal Depletes)</option><option value="perpetual">Interest Only (Perpetual)</option></select></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Monthly Payout</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.monthlyPayout)}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Payout Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Annual Payout:</span><span className="font-semibold">{formatCurrency(result.annualPayout)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Payout Period:</span><span className="font-semibold">{result.years} years</span></div>
                  {result.payoutType === 'fixed' && <><div className="flex justify-between py-1"><span className="text-muted-foreground">Total Payouts:</span><span className="font-semibold">{formatCurrency(result.totalPayout)}</span></div><div className="flex justify-between py-1"><span className="text-muted-foreground">Interest Earned:</span><span className="font-semibold text-green-600">{formatCurrency(result.totalInterest)}</span></div></>}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter annuity details to calculate payouts</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
