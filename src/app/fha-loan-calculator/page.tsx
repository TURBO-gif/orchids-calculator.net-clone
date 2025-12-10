"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function FHALoanCalculatorPage() {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPaymentPercent, setDownPaymentPercent] = useState('3.5');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1500');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const downPercent = parseFloat(downPaymentPercent) || 3.5;
    const downPayment = price * (downPercent / 100);
    const baseLoan = price - downPayment;
    const upfrontMIP = baseLoan * 0.0175;
    const loanAmount = baseLoan + upfrontMIP;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = (parseFloat(loanTerm) || 30) * 12;
    const annualMIP = downPercent < 10 ? 0.0055 : 0.0050;
    const monthlyMIP = (loanAmount * annualMIP) / 12;
    const monthlyTax = (price * (parseFloat(propertyTax) || 0) / 100) / 12;
    const monthlyInsurance = (parseFloat(insurance) || 0) / 12;

    const monthlyPI = rate > 0 ? (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : loanAmount / term;
    const totalMonthly = monthlyPI + monthlyMIP + monthlyTax + monthlyInsurance;

    setResult({
      downPayment, loanAmount, upfrontMIP, monthlyPI, monthlyMIP, monthlyTax, monthlyInsurance, totalMonthly,
      downPercent: downPercent.toFixed(1), annualMIPRate: (annualMIP * 100).toFixed(2)
    });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="FHA Loan Calculator" description="Calculate FHA loan payments including mortgage insurance premiums.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Loan Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Home Price</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Down Payment</label><div className="flex items-center gap-2"><input type="number" step="0.5" value={downPaymentPercent} onChange={(e) => setDownPaymentPercent(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div><p className="text-xs text-muted-foreground mt-1">FHA minimum: 3.5%</p></div>
              <div><label className="block text-sm font-bold mb-1">Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Loan Term</label><select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="15">15 years</option><option value="30">30 years</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Property Tax Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Annual Insurance</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Total Monthly Payment</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.totalMonthly)}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Monthly Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Principal & Interest:</span><span className="font-semibold">{formatCurrency(result.monthlyPI)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Monthly MIP ({result.annualMIPRate}%):</span><span className="font-semibold">{formatCurrency(result.monthlyMIP)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Property Tax:</span><span className="font-semibold">{formatCurrency(result.monthlyTax)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Insurance:</span><span className="font-semibold">{formatCurrency(result.monthlyInsurance)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">FHA Loan Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Down Payment ({result.downPercent}%):</span><span className="font-semibold">{formatCurrency(result.downPayment)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Upfront MIP (1.75%):</span><span className="font-semibold">{formatCurrency(result.upfrontMIP)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Loan Amount:</span><span className="font-semibold">{formatCurrency(result.loanAmount)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter loan details to calculate FHA payments</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
