"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function AmortizationCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('200000');
  const [interestRate, setInterestRate] = useState('5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTerm) || 0) * 12;

    if (rate === 0) {
      const monthly = principal / n;
      setResult({
        monthlyPayment: monthly.toFixed(2),
        totalPayment: (monthly * n).toFixed(2),
        totalInterest: '0.00',
        schedule: []
      });
      return;
    }

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    let balance = principal;
    const schedule = [];

    for (let i = 1; i <= Math.min(n, 12); i++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPayment - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month: i,
        payment: monthlyPayment.toFixed(2),
        principal: principalPayment.toFixed(2),
        interest: interestPayment.toFixed(2),
        balance: Math.max(0, balance).toFixed(2)
      });
    }

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      schedule
    });
  };

  return (
    <CalculatorLayout title="Amortization Calculator" description="Calculate loan amortization schedule with principal and interest breakdown.">
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
        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
        >
          Calculate
        </button>
        {result && (
          <div className="mt-6 space-y-4">
            <div className="p-4 bg-muted rounded-[3px]">
              <h3 className="font-bold text-lg mb-3">Summary:</h3>
              <div className="space-y-2">
                <p><strong>Monthly Payment:</strong> ${result.monthlyPayment}</p>
                <p><strong>Total Payment:</strong> ${result.totalPayment}</p>
                <p><strong>Total Interest:</strong> ${result.totalInterest}</p>
              </div>
            </div>
            {result.schedule.length > 0 && (
              <div className="p-4 bg-muted rounded-[3px]">
                <h3 className="font-bold text-lg mb-3">Amortization Schedule (First Year):</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Month</th>
                        <th className="text-right p-2">Payment</th>
                        <th className="text-right p-2">Principal</th>
                        <th className="text-right p-2">Interest</th>
                        <th className="text-right p-2">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row: any) => (
                        <tr key={row.month} className="border-b">
                          <td className="p-2">{row.month}</td>
                          <td className="text-right p-2">${row.payment}</td>
                          <td className="text-right p-2">${row.principal}</td>
                          <td className="text-right p-2">${row.interest}</td>
                          <td className="text-right p-2">${row.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
