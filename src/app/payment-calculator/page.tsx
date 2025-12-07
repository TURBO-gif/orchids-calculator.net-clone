"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function PaymentCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('25000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('5');
  const [paymentType, setPaymentType] = useState('monthly');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const annualRate = (parseFloat(interestRate) || 0) / 100;
    const years = parseFloat(loanTerm) || 0;

    let paymentsPerYear = 12;
    if (paymentType === 'weekly') paymentsPerYear = 52;
    else if (paymentType === 'biweekly') paymentsPerYear = 26;
    else if (paymentType === 'quarterly') paymentsPerYear = 4;
    else if (paymentType === 'annually') paymentsPerYear = 1;

    const rate = annualRate / paymentsPerYear;
    const n = years * paymentsPerYear;

    if (rate === 0) {
      const payment = principal / n;
      setResult({
        payment: payment.toFixed(2),
        totalPayment: (payment * n).toFixed(2),
        totalInterest: '0.00'
      });
      return;
    }

    const payment = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const totalPayment = payment * n;
    const totalInterest = totalPayment - principal;

    setResult({
      payment: payment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Payment Calculator" description="Calculate loan payments with different payment frequencies.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Loan Amount ($)</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Interest Rate (% per year)</label>
          <input
            type="number"
            step="0.01"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
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
          <label className="block text-sm font-bold mb-1">Payment Frequency</label>
          <select
            value={paymentType}
            onChange={(e) => setPaymentType(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="monthly">Monthly</option>
            <option value="biweekly">Bi-weekly</option>
            <option value="weekly">Weekly</option>
            <option value="quarterly">Quarterly</option>
            <option value="annually">Annually</option>
          </select>
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
              <p><strong>Payment Amount:</strong> ${result.payment}</p>
              <p><strong>Total Payment:</strong> ${result.totalPayment}</p>
              <p><strong>Total Interest:</strong> ${result.totalInterest}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
