"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function HomeEquityLoanCalculatorPage() {
  const [homeValue, setHomeValue] = useState('400000');
  const [mortgageBalance, setMortgageBalance] = useState('250000');
  const [loanAmount, setLoanAmount] = useState('50000');
  const [interestRate, setInterestRate] = useState('8.5');
  const [loanTerm, setLoanTerm] = useState('15');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const value = parseFloat(homeValue) || 0;
    const balance = parseFloat(mortgageBalance) || 0;
    const amount = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = (parseFloat(loanTerm) || 15) * 12;

    const equity = value - balance;
    const maxLoan = value * 0.85 - balance;
    const ltv = ((balance + amount) / value) * 100;
    const monthlyPayment = rate > 0 ? (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : amount / term;
    const totalInterest = monthlyPayment * term - amount;
    const totalCost = monthlyPayment * term;

    setResult({
      equity, maxLoan: Math.max(0, maxLoan), ltv: ltv.toFixed(1), monthlyPayment, totalInterest, totalCost,
      isApproved: ltv <= 85
    });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Home Equity Loan Calculator" description="Calculate home equity loan payments and borrowing capacity.">
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
            <h3 className="font-bold text-base mb-4">Loan Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Loan Amount Requested</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Loan Term</label><select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="5">5 years</option><option value="10">10 years</option><option value="15">15 years</option><option value="20">20 years</option></select></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className={`bg-card p-5 rounded-[3px] border-2 ${result.isApproved ? 'border-green-500' : 'border-red-500'}`}>
                <h3 className="font-bold text-lg mb-2 text-accent">Monthly Payment</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.monthlyPayment)}</div>
                <div className={`text-sm mt-2 ${result.isApproved ? 'text-green-600' : 'text-red-600'}`}>
                  {result.isApproved ? 'Likely to qualify (LTV ≤ 85%)' : 'May not qualify (LTV > 85%)'}
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Equity Analysis</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Available Equity:</span><span className="font-semibold">{formatCurrency(result.equity)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Max Borrowable (85% LTV):</span><span className="font-semibold">{formatCurrency(result.maxLoan)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Combined LTV:</span><span className={`font-semibold ${result.ltv <= 85 ? 'text-green-600' : 'text-red-600'}`}>{result.ltv}%</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Loan Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Loan Amount:</span><span className="font-semibold">{formatCurrency(parseFloat(loanAmount))}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold text-destructive">{formatCurrency(result.totalInterest)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Cost:</span><span className="font-semibold">{formatCurrency(result.totalCost)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter property and loan details to calculate</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
