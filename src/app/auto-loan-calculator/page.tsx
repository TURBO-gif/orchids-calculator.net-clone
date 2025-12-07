"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function AutoLoanCalculatorPage() {
  const [autoPrice, setAutoPrice] = useState('30000');
  const [downPayment, setDownPayment] = useState('5000');
  const [tradeInValue, setTradeInValue] = useState('0');
  const [loanTerm, setLoanTerm] = useState('5');
  const [interestRate, setInterestRate] = useState('4.5');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(autoPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const tradeIn = parseFloat(tradeInValue) || 0;
    const loanAmount = price - down - tradeIn;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTerm) || 0) * 12;

    if (loanAmount <= 0) {
      setResult({
        monthlyPayment: '0.00',
        totalPayment: '0.00',
        totalInterest: '0.00',
        loanAmount: '0.00'
      });
      return;
    }

    if (rate === 0) {
      const monthly = loanAmount / n;
      setResult({
        monthlyPayment: monthly.toFixed(2),
        totalPayment: (monthly * n).toFixed(2),
        totalInterest: '0.00',
        loanAmount: loanAmount.toFixed(2)
      });
      return;
    }

    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - loanAmount;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanAmount: loanAmount.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Auto Loan Calculator" description="Calculate your monthly car payment.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Auto Price ($)</label>
          <input
            type="number"
            value={autoPrice}
            onChange={(e) => setAutoPrice(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Down Payment ($)</label>
          <input
            type="number"
            value={downPayment}
            onChange={(e) => setDownPayment(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Trade-in Value ($)</label>
          <input
            type="number"
            value={tradeInValue}
            onChange={(e) => setTradeInValue(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Loan Term (years)</label>
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Interest Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
        >
          Calculate
        </button>
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            <div className="space-y-2">
              <p><strong>Loan Amount:</strong> ${result.loanAmount}</p>
              <p><strong>Monthly Payment:</strong> ${result.monthlyPayment}</p>
              <p><strong>Total Payment:</strong> ${result.totalPayment}</p>
              <p><strong>Total Interest:</strong> ${result.totalInterest}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
