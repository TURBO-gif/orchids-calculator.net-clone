"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function VAMortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState('350000');
  const [downPayment, setDownPayment] = useState('0');
  const [interestRate, setInterestRate] = useState('6.0');
  const [loanTerm, setLoanTerm] = useState('30');
  const [firstTimeUse, setFirstTimeUse] = useState('true');
  const [serviceType, setServiceType] = useState('regular');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1500');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const downPercent = (down / price) * 100;
    const loanAmount = price - down;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = (parseFloat(loanTerm) || 30) * 12;
    const isFirstTime = firstTimeUse === 'true';
    const isReserve = serviceType === 'reserve';

    let fundingFeeRate = 0;
    if (downPercent < 5) fundingFeeRate = isFirstTime ? (isReserve ? 2.4 : 2.15) : (isReserve ? 3.3 : 3.3);
    else if (downPercent < 10) fundingFeeRate = isFirstTime ? 1.5 : 1.5;
    else fundingFeeRate = 1.25;

    const fundingFee = loanAmount * (fundingFeeRate / 100);
    const totalLoan = loanAmount + fundingFee;
    const monthlyPI = rate > 0 ? (totalLoan * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : totalLoan / term;
    const monthlyTax = (price * (parseFloat(propertyTax) || 0) / 100) / 12;
    const monthlyInsurance = (parseFloat(insurance) || 0) / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;

    setResult({
      loanAmount, fundingFee, fundingFeeRate, totalLoan, monthlyPI, monthlyTax, monthlyInsurance, totalMonthly,
      downPayment: down, downPercent: downPercent.toFixed(1)
    });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="VA Mortgage Calculator" description="Calculate VA loan payments including funding fee for veterans.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Loan Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Home Price</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Down Payment</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div><p className="text-xs text-muted-foreground mt-1">VA loans allow 0% down</p></div>
              <div><label className="block text-sm font-bold mb-1">Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Loan Term</label><select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="15">15 years</option><option value="30">30 years</option></select></div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">VA Benefits</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">First Time VA Loan?</label><select value={firstTimeUse} onChange={(e) => setFirstTimeUse(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="true">Yes - First Use</option><option value="false">No - Subsequent Use</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Service Type</label><select value={serviceType} onChange={(e) => setServiceType(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="regular">Regular Military</option><option value="reserve">Reserves/National Guard</option></select></div>
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
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Property Tax:</span><span className="font-semibold">{formatCurrency(result.monthlyTax)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Insurance:</span><span className="font-semibold">{formatCurrency(result.monthlyInsurance)}</span></div>
                  <div className="flex justify-between py-1 text-green-600"><span>No PMI Required</span><span className="font-semibold">$0</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">VA Loan Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Base Loan:</span><span className="font-semibold">{formatCurrency(result.loanAmount)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">VA Funding Fee ({result.fundingFeeRate}%):</span><span className="font-semibold">{formatCurrency(result.fundingFee)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Total Loan:</span><span className="font-bold text-accent">{formatCurrency(result.totalLoan)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter loan details to calculate VA mortgage payments</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
