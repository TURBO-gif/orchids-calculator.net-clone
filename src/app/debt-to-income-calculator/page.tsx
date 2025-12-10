"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function DebtToIncomeCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState('6000');
  const [mortgage, setMortgage] = useState('1500');
  const [carPayment, setCarPayment] = useState('400');
  const [creditCards, setCreditCards] = useState('200');
  const [studentLoans, setStudentLoans] = useState('300');
  const [otherDebt, setOtherDebt] = useState('0');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const income = parseFloat(monthlyIncome) || 0;
    const mort = parseFloat(mortgage) || 0;
    const car = parseFloat(carPayment) || 0;
    const credit = parseFloat(creditCards) || 0;
    const student = parseFloat(studentLoans) || 0;
    const other = parseFloat(otherDebt) || 0;

    const totalDebt = mort + car + credit + student + other;
    const frontEndRatio = (mort / income) * 100;
    const backEndRatio = (totalDebt / income) * 100;

    let rating = '';
    let color = '';
    if (backEndRatio <= 20) { rating = 'Excellent'; color = 'text-green-600'; }
    else if (backEndRatio <= 35) { rating = 'Good'; color = 'text-blue-600'; }
    else if (backEndRatio <= 43) { rating = 'Fair'; color = 'text-yellow-600'; }
    else { rating = 'High Risk'; color = 'text-red-600'; }

    setResult({
      totalDebt,
      frontEndRatio: frontEndRatio.toFixed(1),
      backEndRatio: backEndRatio.toFixed(1),
      rating,
      color,
      remainingIncome: income - totalDebt
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  return (
    <CalculatorLayout title="Debt-to-Income Ratio Calculator" description="Calculate your debt-to-income ratio to understand your financial health.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Monthly Income</h3>
            <div>
              <label className="block text-sm font-bold mb-1">Gross Monthly Income</label>
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <input type="number" value={monthlyIncome} onChange={(e) => setMonthlyIncome(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Monthly Debt Payments</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Mortgage/Rent</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={mortgage} onChange={(e) => setMortgage(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Car Payment</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={carPayment} onChange={(e) => setCarPayment(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Credit Card Payments</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={creditCards} onChange={(e) => setCreditCards(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Student Loans</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={studentLoans} onChange={(e) => setStudentLoans(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Other Debt</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input type="number" value={otherDebt} onChange={(e) => setOtherDebt(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" />
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
                <h3 className="font-bold text-lg mb-2 text-accent">Debt-to-Income Ratio</h3>
                <div className={`text-4xl font-bold ${result.color}`}>{result.backEndRatio}%</div>
                <div className={`text-lg font-semibold mt-1 ${result.color}`}>{result.rating}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">DTI Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Front-End Ratio (Housing):</span><span className="font-semibold">{result.frontEndRatio}%</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Back-End Ratio (Total):</span><span className="font-semibold">{result.backEndRatio}%</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Monthly Debt:</span><span className="font-semibold">{formatCurrency(result.totalDebt)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Remaining Income:</span><span className="font-bold text-accent">{formatCurrency(result.remainingIncome)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">DTI Guidelines</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span><span>20% or less - Excellent</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span>21-35% - Good</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-500"></span><span>36-43% - Fair (Max for most mortgages)</span></div>
                  <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span>44%+ - High Risk</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your income and debts to calculate your debt-to-income ratio</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
