"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function HouseAffordabilityCalculatorPage() {
  const [annualIncome, setAnnualIncome] = useState('75000');
  const [monthlyDebt, setMonthlyDebt] = useState('500');
  const [downPayment, setDownPayment] = useState('50000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [homeInsurance, setHomeInsurance] = useState('1200');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const income = parseFloat(annualIncome) || 0;
    const debt = parseFloat(monthlyDebt) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = (parseFloat(loanTerm) || 30) * 12;
    const taxRate = (parseFloat(propertyTax) || 0) / 100;
    const insurance = (parseFloat(homeInsurance) || 0) / 12;

    const monthlyIncome = income / 12;
    const maxHousingPayment = monthlyIncome * 0.28;
    const maxTotalDebt = monthlyIncome * 0.36;
    const availableForHousing = Math.min(maxHousingPayment, maxTotalDebt - debt);

    const monthlyTaxInsurance = (price: number) => (price * taxRate / 12) + insurance;
    
    let maxPrice = 0;
    for (let price = 0; price <= 2000000; price += 1000) {
      const loanAmount = price - down;
      if (loanAmount <= 0) continue;
      
      const monthlyPI = rate > 0 
        ? (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
        : loanAmount / term;
      const totalMonthly = monthlyPI + monthlyTaxInsurance(price);
      
      if (totalMonthly <= availableForHousing) {
        maxPrice = price;
      } else {
        break;
      }
    }

    const loanAmount = maxPrice - down;
    const monthlyPI = rate > 0
      ? (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
      : loanAmount / term;

    setResult({
      maxHomePrice: maxPrice,
      loanAmount: loanAmount,
      downPaymentPercent: ((down / maxPrice) * 100).toFixed(1),
      monthlyPayment: monthlyPI,
      monthlyTax: maxPrice * taxRate / 12,
      monthlyInsurance: insurance,
      totalMonthly: monthlyPI + (maxPrice * taxRate / 12) + insurance,
      debtToIncomeRatio: (((monthlyPI + (maxPrice * taxRate / 12) + insurance + debt) / monthlyIncome) * 100).toFixed(1)
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <CalculatorLayout title="House Affordability Calculator" description="Calculate how much house you can afford based on your income and expenses.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Income & Debt</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Annual Household Income</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Monthly Debt Payments</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={monthlyDebt} onChange={(e) => setMonthlyDebt(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Down Payment</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Loan Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Interest Rate</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Loan Term</label>
                <select value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm">
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Property Tax Rate</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="0.1" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Annual Home Insurance</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={homeInsurance} onChange={(e) => setHomeInsurance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
            </div>
          </div>

          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Maximum Home Price</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.maxHomePrice)}</div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Loan Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Loan Amount:</span><span className="font-semibold">{formatCurrency(result.loanAmount)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Down Payment:</span><span className="font-semibold">{result.downPaymentPercent}%</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Debt-to-Income Ratio:</span><span className="font-semibold">{result.debtToIncomeRatio}%</span></div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Monthly Payment Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Principal & Interest:</span><span className="font-semibold">{formatCurrency(result.monthlyPayment)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Property Tax:</span><span className="font-semibold">{formatCurrency(result.monthlyTax)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Home Insurance:</span><span className="font-semibold">{formatCurrency(result.monthlyInsurance)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Total Monthly:</span><span className="font-bold text-accent">{formatCurrency(result.totalMonthly)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your financial details and click Calculate to see how much house you can afford</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
