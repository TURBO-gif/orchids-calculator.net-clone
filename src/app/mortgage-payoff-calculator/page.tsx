"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function MortgagePayoffCalculatorPage() {
  const [loanBalance, setLoanBalance] = useState('250000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [monthlyPayment, setMonthlyPayment] = useState('1580');
  const [extraPaymentType, setExtraPaymentType] = useState('monthly');
  const [extraPayment, setExtraPayment] = useState('200');
  const [oneTimePayment, setOneTimePayment] = useState('0');
  const [oneTimeMonth, setOneTimeMonth] = useState('1');
  const [biweekly, setBiweekly] = useState(false);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const balance = parseFloat(loanBalance) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const payment = parseFloat(monthlyPayment) || 0;
    const extra = parseFloat(extraPayment) || 0;
    const oneTime = parseFloat(oneTimePayment) || 0;
    const oneTimeAt = parseInt(oneTimeMonth) || 1;

    const calculatePayoff = (monthlyExtra: number, oneTimePmt: number, oneTimeAtMonth: number, isBiweekly: boolean) => {
      let bal = balance;
      let months = 0;
      let totalInterest = 0;
      const schedule = [];
      const effectivePayment = isBiweekly ? payment / 2 : payment;
      const paymentsPerMonth = isBiweekly ? 2.166667 : 1;

      while (bal > 0 && months < 600) {
        months++;
        const interest = bal * rate;
        totalInterest += interest;
        
        let principalPayment = effectivePayment * paymentsPerMonth - interest + monthlyExtra;
        
        if (months === oneTimeAtMonth) {
          principalPayment += oneTimePmt;
        }
        
        if (principalPayment > bal) {
          principalPayment = bal;
        }
        
        bal -= principalPayment;
        if (bal < 0) bal = 0;

        if (months % 12 === 0 || bal === 0) {
          schedule.push({
            month: months,
            year: Math.ceil(months / 12),
            balance: bal,
            totalInterest,
          });
        }
      }

      return { months, totalInterest, totalPaid: balance + totalInterest, schedule };
    };

    const original = calculatePayoff(0, 0, 0, false);
    
    let withExtra;
    if (biweekly) {
      withExtra = calculatePayoff(extra, oneTime, oneTimeAt, true);
    } else {
      const monthlyExtraAmount = extraPaymentType === 'monthly' ? extra : extra / 12;
      withExtra = calculatePayoff(monthlyExtraAmount, oneTime, oneTimeAt, false);
    }

    const monthsSaved = original.months - withExtra.months;
    const interestSaved = original.totalInterest - withExtra.totalInterest;

    const chartData = [];
    const maxMonths = Math.max(original.schedule.length, withExtra.schedule.length);
    for (let i = 0; i < maxMonths; i++) {
      const year = i + 1;
      chartData.push({
        year,
        original: original.schedule[i]?.balance || 0,
        withExtra: withExtra.schedule[i]?.balance || 0,
      });
    }

    setResult({
      original,
      withExtra,
      monthsSaved,
      interestSaved,
      chartData,
      payoffDate: new Date(Date.now() + withExtra.months * 30.44 * 24 * 60 * 60 * 1000),
      originalPayoffDate: new Date(Date.now() + original.months * 30.44 * 24 * 60 * 60 * 1000),
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

  const formatMonths = (months: number) => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (years === 0) return `${remainingMonths} months`;
    if (remainingMonths === 0) return `${years} years`;
    return `${years} years, ${remainingMonths} months`;
  };

  return (
    <CalculatorLayout title="Mortgage Payoff Calculator" description="Calculate how extra payments can help you pay off your mortgage faster and save on interest.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Current Mortgage</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Current Loan Balance</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={loanBalance}
                    onChange={(e) => setLoanBalance(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Interest Rate</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Monthly Payment</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={monthlyPayment}
                    onChange={(e) => setMonthlyPayment(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Extra Payment Options</h3>
            
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={biweekly}
                  onChange={(e) => setBiweekly(e.target.checked)}
                  className="rounded"
                />
                <span>Biweekly payments (pay half monthly payment every 2 weeks)</span>
              </label>

              <div>
                <label className="block text-sm font-bold mb-1">Extra Payment</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={extraPayment}
                      onChange={(e) => setExtraPayment(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                  </div>
                  <select
                    value={extraPaymentType}
                    onChange={(e) => setExtraPaymentType(e.target.value)}
                    className="border border-input rounded-[3px] px-3 py-2 text-sm"
                    disabled={biweekly}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <label className="block text-sm font-bold mb-1">One-time Extra Payment</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={oneTimePayment}
                      onChange={(e) => setOneTimePayment(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-muted-foreground">at month</span>
                    <input
                      type="number"
                      min="1"
                      value={oneTimeMonth}
                      onChange={(e) => setOneTimeMonth(e.target.value)}
                      className="w-16 border border-input rounded-[3px] px-2 py-2 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold"
          >
            Calculate Payoff
          </button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-4 text-accent">Payoff Summary</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted/30 rounded">
                    <div className="text-sm text-muted-foreground mb-1">Time Saved</div>
                    <div className="text-2xl font-bold text-green-600">{formatMonths(result.monthsSaved)}</div>
                  </div>
                  <div className="text-center p-3 bg-muted/30 rounded">
                    <div className="text-sm text-muted-foreground mb-1">Interest Saved</div>
                    <div className="text-2xl font-bold text-green-600">{formatCurrency(result.interestSaved)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Comparison</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#4a7c9e] text-white">
                      <th className="py-2 px-3 text-left font-bold"></th>
                      <th className="py-2 px-3 text-right font-bold">Original</th>
                      <th className="py-2 px-3 text-right font-bold">With Extra</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3">Payoff Time</td>
                      <td className="py-2 px-3 text-right">{formatMonths(result.original.months)}</td>
                      <td className="py-2 px-3 text-right font-semibold text-green-600">{formatMonths(result.withExtra.months)}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3">Total Interest</td>
                      <td className="py-2 px-3 text-right text-red-600">{formatCurrency(result.original.totalInterest)}</td>
                      <td className="py-2 px-3 text-right font-semibold text-green-600">{formatCurrency(result.withExtra.totalInterest)}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3">Total Paid</td>
                      <td className="py-2 px-3 text-right">{formatCurrency(result.original.totalPaid)}</td>
                      <td className="py-2 px-3 text-right font-semibold">{formatCurrency(result.withExtra.totalPaid)}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 px-3">Payoff Date</td>
                      <td className="py-2 px-3 text-right">{result.originalPayoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                      <td className="py-2 px-3 text-right font-semibold text-green-600">{result.payoffDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Balance Over Time</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={result.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="year" 
                        tick={{ fontSize: 11 }} 
                        tickFormatter={(v) => `Yr ${v}`}
                      />
                      <YAxis 
                        tick={{ fontSize: 11 }} 
                        tickFormatter={(v) => `$${(v/1000).toFixed(0)}k`}
                      />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="original" 
                        name="Original" 
                        stroke="#ef4444" 
                        fill="#ef444433"
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="withExtra" 
                        name="With Extra Payments" 
                        stroke="#10b981" 
                        fill="#10b98133"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-[3px] border border-amber-200 dark:border-amber-800">
                <h4 className="font-bold text-sm mb-2 text-amber-800 dark:text-amber-200">Prepayment Penalty Note</h4>
                <p className="text-xs text-amber-700 dark:text-amber-300">
                  Some mortgages have prepayment penalties. Check your loan agreement before making extra payments.
                  Penalties typically phase out within the first 3-5 years of the loan.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your mortgage details and click Calculate to see how extra payments can help you pay off faster.</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
