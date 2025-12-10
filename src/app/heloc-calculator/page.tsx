"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function HELOCCalculatorPage() {
  const [homeValue, setHomeValue] = useState('400000');
  const [mortgageBalance, setMortgageBalance] = useState('250000');
  const [creditLimit, setCreditLimit] = useState('50000');
  const [amountUsed, setAmountUsed] = useState('30000');
  const [interestRate, setInterestRate] = useState('8.0');
  const [drawPeriod, setDrawPeriod] = useState('10');
  const [repaymentPeriod, setRepaymentPeriod] = useState('20');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const value = parseFloat(homeValue) || 0;
    const balance = parseFloat(mortgageBalance) || 0;
    const limit = parseFloat(creditLimit) || 0;
    const used = parseFloat(amountUsed) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const repayTerm = (parseFloat(repaymentPeriod) || 20) * 12;

    const equity = value - balance;
    const maxCredit = value * 0.85 - balance;
    const ltv = ((balance + used) / value) * 100;
    const interestOnlyPayment = used * rate;
    const fullPayment = rate > 0 ? (used * rate * Math.pow(1 + rate, repayTerm)) / (Math.pow(1 + rate, repayTerm) - 1) : used / repayTerm;
    const availableCredit = limit - used;

    setResult({
      equity, maxCredit: Math.max(0, maxCredit), ltv: ltv.toFixed(1), interestOnlyPayment, fullPayment, availableCredit,
      creditLimit: limit, amountUsed: used
    });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="HELOC Calculator" description="Calculate Home Equity Line of Credit payments and available credit.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Property Information</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Home Value</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={homeValue} onChange={(e) => setHomeValue(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Current Mortgage Balance</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={mortgageBalance} onChange={(e) => setMortgageBalance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">HELOC Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Credit Limit</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={creditLimit} onChange={(e) => setCreditLimit(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Amount Used</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={amountUsed} onChange={(e) => setAmountUsed(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Interest Rate (Variable)</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Repayment Period</label><select value={repaymentPeriod} onChange={(e) => setRepaymentPeriod(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="10">10 years</option><option value="15">15 years</option><option value="20">20 years</option></select></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Monthly Payments</h3>
                <div className="space-y-2">
                  <div><span className="text-sm text-muted-foreground">Interest-Only (Draw Period):</span><div className="text-2xl font-bold text-foreground">{formatCurrency(result.interestOnlyPayment)}</div></div>
                  <div><span className="text-sm text-muted-foreground">Full Payment (Repayment Period):</span><div className="text-2xl font-bold text-foreground">{formatCurrency(result.fullPayment)}</div></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Credit Status</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Credit Limit:</span><span className="font-semibold">{formatCurrency(result.creditLimit)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Amount Used:</span><span className="font-semibold text-red-600">{formatCurrency(result.amountUsed)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Available Credit:</span><span className="font-bold text-green-600">{formatCurrency(result.availableCredit)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Equity Analysis</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Home Equity:</span><span className="font-semibold">{formatCurrency(result.equity)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Max Credit Line (85% LTV):</span><span className="font-semibold">{formatCurrency(result.maxCredit)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Combined LTV:</span><span className="font-semibold">{result.ltv}%</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter property and HELOC details to calculate</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
