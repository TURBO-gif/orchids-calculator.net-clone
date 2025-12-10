"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function APRCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('200000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [fees, setFees] = useState('5000');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = (parseFloat(loanTerm) || 30) * 12;
    const totalFees = parseFloat(fees) || 0;

    const monthlyPayment = rate > 0 ? (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : principal / term;
    const effectivePrincipal = principal - totalFees;
    
    let aprRate = rate;
    for (let i = 0; i < 100; i++) {
      const testPayment = (effectivePrincipal * aprRate * Math.pow(1 + aprRate, term)) / (Math.pow(1 + aprRate, term) - 1);
      if (Math.abs(testPayment - monthlyPayment) < 0.01) break;
      aprRate += (monthlyPayment - testPayment) > 0 ? 0.00001 : -0.00001;
    }
    
    const apr = aprRate * 12 * 100;
    const totalInterest = monthlyPayment * term - principal;
    const totalCost = monthlyPayment * term;

    setResult({
      monthlyPayment, apr: apr.toFixed(3), interestRate: parseFloat(interestRate),
      totalInterest, totalCost, totalFees, difference: (apr - parseFloat(interestRate)).toFixed(3)
    });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="APR Calculator" description="Calculate the Annual Percentage Rate (APR) including all loan fees.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Loan Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Loan Amount</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={loanAmount} onChange={(e) => setLoanAmount(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Loan Term</label><select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="15">15 years</option><option value="20">20 years</option><option value="30">30 years</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Total Fees & Closing Costs</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={fees} onChange={(e) => setFees(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Annual Percentage Rate (APR)</h3>
                <div className="text-4xl font-bold text-foreground">{result.apr}%</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Rate Comparison</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Interest Rate:</span><span className="font-semibold">{result.interestRate}%</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">APR:</span><span className="font-semibold">{result.apr}%</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Difference:</span><span className="font-bold text-accent">{result.difference}%</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Loan Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Monthly Payment:</span><span className="font-semibold">{formatCurrency(result.monthlyPayment)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Fees:</span><span className="font-semibold">{formatCurrency(result.totalFees)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold text-destructive">{formatCurrency(result.totalInterest)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Cost:</span><span className="font-semibold">{formatCurrency(result.totalCost)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter loan details to calculate APR</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
