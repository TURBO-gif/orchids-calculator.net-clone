"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  totalInterest: number;
  balance: number;
}

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('6.5');
  const [propertyTax, setPropertyTax] = useState('3600');
  const [homeInsurance, setHomeInsurance] = useState('1200');
  const [pmi, setPmi] = useState('0');
  const [hoaFee, setHoaFee] = useState('0');
  const [startDate, setStartDate] = useState('Jan 2025');
  
  const [result, setResult] = useState<any>(null);
  const [amortizationSchedule, setAmortizationSchedule] = useState<AmortizationRow[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const updateDownPayment = (price: string, percent: string) => {
    const p = parseFloat(price) || 0;
    const pct = parseFloat(percent) || 0;
    const down = (p * pct) / 100;
    setDownPayment(down.toFixed(2));
  };

  const updateDownPaymentPercent = (price: string, down: string) => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(down) || 0;
    if (p > 0) {
      const pct = (d / p) * 100;
      setDownPaymentPercent(pct.toFixed(2));
    }
  };

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const loanAmount = price - down;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTerm) || 0) * 12;
    const monthlyPropertyTax = (parseFloat(propertyTax) || 0) / 12;
    const monthlyInsurance = (parseFloat(homeInsurance) || 0) / 12;
    const monthlyPMI = parseFloat(pmi) || 0;
    const monthlyHOA = parseFloat(hoaFee) || 0;

    if (rate === 0) {
      const monthly = loanAmount / n;
      const totalMonthly = monthly + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;
      
      setResult({
        monthlyPayment: monthly.toFixed(2),
        monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
        monthlyInsurance: monthlyInsurance.toFixed(2),
        monthlyPMI: monthlyPMI.toFixed(2),
        monthlyHOA: monthlyHOA.toFixed(2),
        totalMonthly: totalMonthly.toFixed(2),
        totalPayment: (monthly * n).toFixed(2),
        totalInterest: '0.00',
        loanAmount: loanAmount.toFixed(2),
        downPayment: down.toFixed(2),
        downPaymentPercent: ((down / price) * 100).toFixed(2)
      });
      
      generateAmortizationSchedule(loanAmount, 0, n, 0);
      return;
    }

    const monthlyPayment = (loanAmount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - loanAmount;
    const totalMonthly = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2),
      monthlyPMI: monthlyPMI.toFixed(2),
      monthlyHOA: monthlyHOA.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      downPayment: down.toFixed(2),
      downPaymentPercent: ((down / price) * 100).toFixed(2),
      payoffDate: calculatePayoffDate(startDate, n)
    });

    generateAmortizationSchedule(loanAmount, rate, n, monthlyPayment);
  };

  const generateAmortizationSchedule = (principal: number, monthlyRate: number, months: number, payment: number) => {
    const schedule: AmortizationRow[] = [];
    let balance = principal;
    let cumulativeInterest = 0;

    for (let i = 1; i <= months; i++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = payment - interestPayment;
      cumulativeInterest += interestPayment;
      balance -= principalPayment;

      if (balance < 0) balance = 0;

      schedule.push({
        month: i,
        payment: payment,
        principal: principalPayment,
        interest: interestPayment,
        totalInterest: cumulativeInterest,
        balance: balance
      });
    }

    setAmortizationSchedule(schedule);
  };

  const calculatePayoffDate = (start: string, months: number) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const [monthStr, yearStr] = start.split(' ');
    const startMonth = monthNames.indexOf(monthStr);
    const startYear = parseInt(yearStr);
    
    const totalMonths = startMonth + months;
    const endYear = startYear + Math.floor(totalMonths / 12);
    const endMonth = totalMonths % 12;
    
    return `${monthNames[endMonth]} ${endYear}`;
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
    <CalculatorLayout title="Mortgage Calculator" description="Calculate your monthly mortgage payment with taxes, insurance, PMI, and HOA fees. View detailed amortization schedule.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Mortgage Details</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Home Price</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={homePrice}
                    onChange={(e) => {
                      setHomePrice(e.target.value);
                      updateDownPayment(e.target.value, downPaymentPercent);
                    }}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Down Payment</label>
                <div className="flex gap-2">
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => {
                        setDownPayment(e.target.value);
                        updateDownPaymentPercent(homePrice, e.target.value);
                      }}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-1">
                    <input
                      type="number"
                      step="0.1"
                      value={downPaymentPercent}
                      onChange={(e) => {
                        setDownPaymentPercent(e.target.value);
                        updateDownPayment(homePrice, e.target.value);
                      }}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Loan Term</label>
                <select
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                >
                  <option value="10">10 years</option>
                  <option value="15">15 years</option>
                  <option value="20">20 years</option>
                  <option value="30">30 years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Interest Rate</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.001"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Start Date</label>
                <input
                  type="text"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="Jan 2025"
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Additional Costs (Optional)</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Property Tax (Yearly)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={propertyTax}
                    onChange={(e) => setPropertyTax(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Home Insurance (Yearly)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={homeInsurance}
                    onChange={(e) => setHomeInsurance(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">PMI (Monthly)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={pmi}
                    onChange={(e) => setPmi(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">HOA Fee (Monthly)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={hoaFee}
                    onChange={(e) => setHoaFee(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
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
                <div className="text-4xl font-bold text-foreground mb-4">
                  {formatCurrency(result.totalMonthly)}
                </div>
                <div className="space-y-2 text-sm border-t border-border pt-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mortgage Payment:</span>
                    <span className="font-semibold">{formatCurrency(result.monthlyPayment)}</span>
                  </div>
                  {parseFloat(result.monthlyPropertyTax) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Property Tax:</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyPropertyTax)}</span>
                    </div>
                  )}
                  {parseFloat(result.monthlyInsurance) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Home Insurance:</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyInsurance)}</span>
                    </div>
                  )}
                  {parseFloat(result.monthlyPMI) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">PMI:</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyPMI)}</span>
                    </div>
                  )}
                  {parseFloat(result.monthlyHOA) > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">HOA Fee:</span>
                      <span className="font-semibold">{formatCurrency(result.monthlyHOA)}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Loan Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Home Price:</span>
                    <span className="font-semibold">{formatCurrency(homePrice)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Down Payment:</span>
                    <span className="font-semibold">{formatCurrency(result.downPayment)} ({result.downPaymentPercent}%)</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-border">
                    <span className="text-muted-foreground font-bold">Loan Amount:</span>
                    <span className="font-bold">{formatCurrency(result.loanAmount)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Total Interest:</span>
                    <span className="font-semibold text-destructive">{formatCurrency(result.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-border">
                    <span className="text-muted-foreground font-bold">Total Payment:</span>
                    <span className="font-bold">{formatCurrency(result.totalPayment)}</span>
                  </div>
                  {result.payoffDate && (
                    <div className="flex justify-between py-1">
                      <span className="text-muted-foreground">Payoff Date:</span>
                      <span className="font-semibold">{result.payoffDate}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Payment Breakdown</h3>
                <div className="space-y-2">
                  {/* Visual bar representation */}
                  <div className="h-8 flex rounded-[3px] overflow-hidden">
                    <div 
                      className="bg-accent flex items-center justify-center text-xs text-white"
                      style={{ 
                        width: `${(parseFloat(result.loanAmount) / parseFloat(result.totalPayment)) * 100}%` 
                      }}
                    >
                      Principal
                    </div>
                    <div 
                      className="bg-destructive flex items-center justify-center text-xs text-white"
                      style={{ 
                        width: `${(parseFloat(result.totalInterest) / parseFloat(result.totalPayment)) * 100}%` 
                      }}
                    >
                      Interest
                    </div>
                  </div>
                  <div className="flex justify-between text-sm pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-accent rounded-sm"></div>
                      <span>Principal: {formatCurrency(result.loanAmount)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-destructive rounded-sm"></div>
                      <span>Interest: {formatCurrency(result.totalInterest)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {amortizationSchedule.length > 0 && (
                <div className="bg-card p-4 rounded-[3px] border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-base">Amortization Schedule</h3>
                    <button
                      onClick={() => setShowSchedule(!showSchedule)}
                      className="text-sm text-accent hover:text-accent/80 font-semibold"
                    >
                      {showSchedule ? 'Hide' : 'Show'} Schedule
                    </button>
                  </div>
                  
                  {showSchedule && (
                    <div className="overflow-x-auto max-h-96 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-muted sticky top-0">
                          <tr>
                            <th className="text-left p-2 font-bold">Month</th>
                            <th className="text-right p-2 font-bold">Payment</th>
                            <th className="text-right p-2 font-bold">Principal</th>
                            <th className="text-right p-2 font-bold">Interest</th>
                            <th className="text-right p-2 font-bold">Balance</th>
                          </tr>
                        </thead>
                        <tbody>
                          {amortizationSchedule.map((row, index) => (
                            <tr key={index} className="border-t border-border hover:bg-muted/50">
                              <td className="p-2">{row.month}</td>
                              <td className="p-2 text-right">{formatCurrency(row.payment)}</td>
                              <td className="p-2 text-right">{formatCurrency(row.principal)}</td>
                              <td className="p-2 text-right">{formatCurrency(row.interest)}</td>
                              <td className="p-2 text-right font-semibold">{formatCurrency(row.balance)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter mortgage details and click Calculate to see your results</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}