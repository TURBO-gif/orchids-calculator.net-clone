"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RealEstateCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [closingCosts, setClosingCosts] = useState('3');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1500');
  const [hoa, setHoa] = useState('0');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(purchasePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = (parseFloat(loanTerm) || 30) * 12;
    const closing = (parseFloat(closingCosts) || 0) / 100 * price;
    const tax = (parseFloat(propertyTax) || 0) / 100 * price / 12;
    const ins = (parseFloat(insurance) || 0) / 12;
    const hoaMonthly = parseFloat(hoa) || 0;

    const loanAmount = price - down;
    const monthlyPI = rate > 0
      ? (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
      : loanAmount / term;
    const totalMonthly = monthlyPI + tax + ins + hoaMonthly;
    const totalLoanCost = monthlyPI * term;
    const totalInterest = totalLoanCost - loanAmount;

    setResult({
      loanAmount,
      downPaymentPercent: ((down / price) * 100).toFixed(1),
      closingCosts: closing,
      monthlyPI,
      monthlyTax: tax,
      monthlyInsurance: ins,
      monthlyHOA: hoaMonthly,
      totalMonthly,
      totalLoanCost,
      totalInterest,
      totalCashNeeded: down + closing
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout title="Real Estate Calculator" description="Calculate real estate purchase costs including mortgage, taxes, and closing costs.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Purchase Details</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Purchase Price</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Down Payment</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
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
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Additional Costs</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Closing Costs (%)</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="0.1" value={closingCosts} onChange={(e) => setClosingCosts(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Property Tax Rate</label>
                <div className="flex items-center gap-2">
                  <input type="number" step="0.1" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                  <span className="text-sm">%</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Annual Insurance</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Monthly HOA</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={hoa} onChange={(e) => setHoa(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
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
                <h3 className="font-bold text-lg mb-2 text-accent">Total Monthly Payment</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.totalMonthly)}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Monthly Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Principal & Interest:</span><span className="font-semibold">{formatCurrency(result.monthlyPI)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Property Tax:</span><span className="font-semibold">{formatCurrency(result.monthlyTax)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Insurance:</span><span className="font-semibold">{formatCurrency(result.monthlyInsurance)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">HOA:</span><span className="font-semibold">{formatCurrency(result.monthlyHOA)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Upfront Costs</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Down Payment ({result.downPaymentPercent}%):</span><span className="font-semibold">{formatCurrency(parseFloat(downPayment))}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Closing Costs:</span><span className="font-semibold">{formatCurrency(result.closingCosts)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Total Cash Needed:</span><span className="font-bold text-accent">{formatCurrency(result.totalCashNeeded)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Loan Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Loan Amount:</span><span className="font-semibold">{formatCurrency(result.loanAmount)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Interest:</span><span className="font-semibold text-destructive">{formatCurrency(result.totalInterest)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Loan Cost:</span><span className="font-semibold">{formatCurrency(result.totalLoanCost)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter property details to calculate your real estate costs</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
