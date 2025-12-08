"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  totalInterest: number;
  balance: number;
}

interface AnnualRow {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  balance: number;
}

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState('10000');
  const [loanTerm, setLoanTerm] = useState('5');
  const [interestRate, setInterestRate] = useState('5');
  const [result, setResult] = useState<any>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [annualSchedule, setAnnualSchedule] = useState<AnnualRow[]>([]);
  const [scheduleView, setScheduleView] = useState<'annual' | 'monthly'>('annual');

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
        loanAmount: principal.toFixed(2)
      });
      generateAmortizationSchedule(principal, 0, n, monthly);
      return;
    }

    const monthlyPayment = (principal * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanAmount: principal.toFixed(2)
    });

    generateAmortizationSchedule(principal, rate, n, monthlyPayment);
  };

  const generateAmortizationSchedule = (principal: number, monthlyRate: number, months: number, payment: number) => {
    const monthlySchedule: AmortizationRow[] = [];
    const annualSchedule: AnnualRow[] = [];
    let balance = principal;
    let cumulativeInterest = 0;
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      cumulativeInterest += interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;

      monthlySchedule.push({
        month: i,
        payment: payment,
        principal: principalPayment,
        interest: interestPayment,
        totalInterest: cumulativeInterest,
        balance: balance
      });

      if (i % 12 === 0 || i === months) {
        const yearNumber = Math.ceil(i / 12);
        annualSchedule.push({
          year: yearNumber,
          principalPaid: yearlyPrincipal,
          interestPaid: yearlyInterest,
          totalPaid: yearlyPrincipal + yearlyInterest,
          balance: balance
        });

        yearlyPrincipal = 0;
        yearlyInterest = 0;
      }
    }

    setAmortizationSchedule(monthlySchedule);
    setAnnualSchedule(annualSchedule);
  };

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <CalculatorLayout title="Loan Calculator" description="Calculate monthly loan payment and total interest with detailed amortization schedule.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Loan Details</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Loan Amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Loan Term</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                >
                  <option value="1">1 year</option>
                  <option value="2">2 years</option>
                  <option value="3">3 years</option>
                  <option value="5">5 years</option>
                  <option value="7">7 years</option>
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                </select>
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
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold"
          >
            Calculate
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-4 text-accent">Monthly Payment</h3>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {formatCurrency(result.monthlyPayment)}
                </div>
              </div>

              {/* Payment Breakdown Chart */}
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Payment Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Principal', value: parseFloat(result.loanAmount), color: '#6366f1' },
                          { name: 'Interest', value: parseFloat(result.totalInterest), color: '#ef4444' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { color: '#6366f1' },
                          { color: '#ef4444' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#6366f1]"></div>
                    <span>Principal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#ef4444]"></div>
                    <span>Interest</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Loan Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Loan Amount:</span>
                    <span className="font-semibold">{formatCurrency(result.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Total Interest:</span>
                    <span className="font-semibold text-destructive">{formatCurrency(result.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-border">
                    <span className="text-muted-foreground font-bold">Total Payment:</span>
                    <span className="font-bold">{formatCurrency(result.totalPayment)}</span>
                  </div>
                </div>
              </div>

              {amortizationSchedule.length > 0 && (
                <div className="bg-card p-4 rounded-[3px] border border-border">
                  <h3 className="font-bold text-base mb-3">Loan Progress Chart</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={amortizationSchedule.filter((_, idx) => idx % Math.ceil(amortizationSchedule.length / 100) === 0)}
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="month" 
                          label={{ value: 'Month', position: 'insideBottom', offset: -5 }}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => formatCurrency(value as number)}
                          labelFormatter={(label) => `Month ${label}`}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Line 
                          type="monotone" 
                          dataKey="balance" 
                          stroke="#6366f1" 
                          name="Balance"
                          strokeWidth={2}
                          dot={false}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="totalInterest" 
                          stroke="#10b981" 
                          name="Total Interest"
                          strokeWidth={2}
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter loan details and click Calculate to see your results</p>
            </div>
          )}
        </div>
      </div>

      {/* Amortization Schedule */}
      {result && amortizationSchedule.length > 0 && (
        <div className="mt-8">
          <div className="bg-card rounded-[3px] border border-border overflow-hidden">
            <h3 className="font-bold text-lg p-4 border-b border-border">Amortization Schedule</h3>
            
            <div className="flex border-b border-border">
              <button
                onClick={() => setScheduleView('annual')}
                className={`px-6 py-3 font-semibold text-sm transition-colors ${
                  scheduleView === 'annual'
                    ? 'bg-[#4a7c9e] text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Annual Schedule
              </button>
              <button
                onClick={() => setScheduleView('monthly')}
                className={`px-6 py-3 font-semibold text-sm transition-colors ${
                  scheduleView === 'monthly'
                    ? 'bg-[#4a7c9e] text-white'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Monthly Schedule
              </button>
            </div>

            {scheduleView === 'annual' && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#4a7c9e] text-white">
                    <tr>
                      <th className="text-left p-3 font-bold">Year</th>
                      <th className="text-right p-3 font-bold">Interest</th>
                      <th className="text-right p-3 font-bold">Principal</th>
                      <th className="text-right p-3 font-bold">Ending Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {annualSchedule.map((row, index) => (
                      <tr key={index} className="border-t border-border hover:bg-muted/50">
                        <td className="p-3">{row.year}</td>
                        <td className="p-3 text-right">{formatCurrency(row.interestPaid)}</td>
                        <td className="p-3 text-right">{formatCurrency(row.principalPaid)}</td>
                        <td className="p-3 text-right font-semibold">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {scheduleView === 'monthly' && (
              <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#4a7c9e] text-white sticky top-0">
                    <tr>
                      <th className="text-left p-3 font-bold">Month</th>
                      <th className="text-right p-3 font-bold">Interest</th>
                      <th className="text-right p-3 font-bold">Principal</th>
                      <th className="text-right p-3 font-bold">Ending Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amortizationSchedule.map((row, index) => (
                      <tr key={index} className="border-t border-border hover:bg-muted/50">
                        <td className="p-3">{row.month}</td>
                        <td className="p-3 text-right">{formatCurrency(row.interest)}</td>
                        <td className="p-3 text-right">{formatCurrency(row.principal)}</td>
                        <td className="p-3 text-right font-semibold">{formatCurrency(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}