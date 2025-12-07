"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState('300000');
  const [downPayment, setDownPayment] = useState('60000');
  const [downPaymentPercent, setDownPaymentPercent] = useState('20');
  const [loanTerm, setLoanTerm] = useState('30');
  const [interestRate, setInterestRate] = useState('6.5');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [homeInsurance, setHomeInsurance] = useState('1000');
  const [pmi, setPmi] = useState('0');
  const [hoaFee, setHoaFee] = useState('0');
  const [result, setResult] = useState<any>(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleDownPaymentChange = (value: string) => {
    setDownPayment(value);
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(value) || 0;
    if (price > 0) {
      setDownPaymentPercent(((down / price) * 100).toFixed(2));
    }
  };

  const handleDownPaymentPercentChange = (value: string) => {
    setDownPaymentPercent(value);
    const price = parseFloat(homePrice) || 0;
    const percent = parseFloat(value) || 0;
    setDownPayment((price * (percent / 100)).toFixed(2));
  };

  const handleHomePriceChange = (value: string) => {
    setHomePrice(value);
    const price = parseFloat(value) || 0;
    const percent = parseFloat(downPaymentPercent) || 0;
    setDownPayment((price * (percent / 100)).toFixed(2));
  };

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const loanAmount = price - down;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const n = (parseFloat(loanTerm) || 0) * 12;
    const propTaxRate = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const pmiAmount = parseFloat(pmi) || 0;
    const hoa = parseFloat(hoaFee) || 0;

    // Calculate principal and interest
    let monthlyPI = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (rate === 0) {
      monthlyPI = loanAmount / n;
      totalPayment = monthlyPI * n;
      totalInterest = 0;
    } else {
      monthlyPI = (loanAmount * rate * Math.pow(1 + rate, n)) / (Math.pow(1 + rate, n) - 1);
      totalPayment = monthlyPI * n;
      totalInterest = totalPayment - loanAmount;
    }

    // Calculate other monthly costs
    const monthlyPropertyTax = (price * (propTaxRate / 100)) / 12;
    const monthlyInsurance = insurance / 12;
    const monthlyPMI = pmiAmount;
    const monthlyHOA = hoa;

    const totalMonthly = monthlyPI + monthlyPropertyTax + monthlyInsurance + monthlyPMI + monthlyHOA;

    // Calculate amortization schedule
    const schedule = [];
    let balance = loanAmount;
    for (let i = 1; i <= n; i++) {
      const interestPayment = balance * rate;
      const principalPayment = monthlyPI - interestPayment;
      balance -= principalPayment;

      if (i <= 12 || i % 12 === 0 || i === n) {
        schedule.push({
          month: i,
          principalPayment: principalPayment.toFixed(2),
          interestPayment: interestPayment.toFixed(2),
          totalPayment: monthlyPI.toFixed(2),
          balance: Math.max(0, balance).toFixed(2)
        });
      }
    }

    setResult({
      monthlyPI: monthlyPI.toFixed(2),
      monthlyPropertyTax: monthlyPropertyTax.toFixed(2),
      monthlyInsurance: monthlyInsurance.toFixed(2),
      monthlyPMI: monthlyPMI.toFixed(2),
      monthlyHOA: monthlyHOA.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      downPayment: down.toFixed(2),
      schedule: schedule
    });
  };

  return (
    <CalculatorLayout title="Mortgage Calculator" description="Calculate your monthly mortgage payment including taxes, insurance, PMI, and HOA fees.">
      <div className="space-y-6">
        {/* Input Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-bold mb-1">Home Price ($)</label>
            <input
              type="number"
              value={homePrice}
              onChange={(e) => handleHomePriceChange(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Down Payment ($)</label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => handleDownPaymentChange(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Down Payment (%)</label>
            <input
              type="number"
              step="0.01"
              value={downPaymentPercent}
              onChange={(e) => handleDownPaymentPercentChange(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Loan Term (years)</label>
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
            <label className="block text-sm font-bold mb-1">Interest Rate (%)</label>
            <input
              type="number"
              step="0.01"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Property Tax (% per year)</label>
            <input
              type="number"
              step="0.01"
              value={propertyTax}
              onChange={(e) => setPropertyTax(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Home Insurance ($ per year)</label>
            <input
              type="number"
              value={homeInsurance}
              onChange={(e) => setHomeInsurance(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">PMI ($ per month)</label>
            <input
              type="number"
              value={pmi}
              onChange={(e) => setPmi(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">HOA Fee ($ per month)</label>
            <input
              type="number"
              value={hoaFee}
              onChange={(e) => setHoaFee(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
        </div>

        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
        >
          Calculate
        </button>

        {/* Results Section */}
        {result && (
          <div className="space-y-6">
            {/* Monthly Payment Breakdown */}
            <div className="bg-card border border-border rounded-[3px] p-6">
              <h3 className="font-bold text-xl mb-4 text-primary">Monthly Payment Breakdown</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span className="font-semibold">Principal & Interest:</span>
                  <span className="text-lg font-bold">${result.monthlyPI}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Property Tax:</span>
                  <span>${result.monthlyPropertyTax}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border">
                  <span>Home Insurance:</span>
                  <span>${result.monthlyInsurance}</span>
                </div>
                {parseFloat(result.monthlyPMI) > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span>PMI:</span>
                    <span>${result.monthlyPMI}</span>
                  </div>
                )}
                {parseFloat(result.monthlyHOA) > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-border">
                    <span>HOA Fee:</span>
                    <span>${result.monthlyHOA}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3 bg-muted px-4 rounded-[3px] mt-2">
                  <span className="font-bold text-lg">Total Monthly Payment:</span>
                  <span className="text-2xl font-bold text-primary">${result.totalMonthly}</span>
                </div>
              </div>
            </div>

            {/* Loan Summary */}
            <div className="bg-card border border-border rounded-[3px] p-6">
              <h3 className="font-bold text-xl mb-4 text-primary">Loan Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Home Price</p>
                  <p className="font-bold text-lg">${parseFloat(homePrice).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Down Payment</p>
                  <p className="font-bold text-lg">${result.downPayment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
                  <p className="font-bold text-lg">${result.loanAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Interest Paid</p>
                  <p className="font-bold text-lg text-destructive">${result.totalInterest}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Payment (Principal + Interest)</p>
                  <p className="font-bold text-lg">${result.totalPayment}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Loan Term</p>
                  <p className="font-bold text-lg">{loanTerm} years</p>
                </div>
              </div>
            </div>

            {/* Amortization Schedule */}
            <div className="bg-card border border-border rounded-[3px] p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xl text-primary">Amortization Schedule</h3>
                <button
                  onClick={() => setShowSchedule(!showSchedule)}
                  className="text-accent hover:underline text-sm font-semibold"
                >
                  {showSchedule ? 'Hide Schedule' : 'Show Schedule'}
                </button>
              </div>
              
              {showSchedule && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-muted">
                        <th className="px-4 py-2 text-left font-bold">Month</th>
                        <th className="px-4 py-2 text-right font-bold">Principal</th>
                        <th className="px-4 py-2 text-right font-bold">Interest</th>
                        <th className="px-4 py-2 text-right font-bold">Total Payment</th>
                        <th className="px-4 py-2 text-right font-bold">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.schedule.map((row: any, index: number) => (
                        <tr key={index} className="border-b border-border hover:bg-muted/50">
                          <td className="px-4 py-2">{row.month}</td>
                          <td className="px-4 py-2 text-right">${row.principalPayment}</td>
                          <td className="px-4 py-2 text-right">${row.interestPayment}</td>
                          <td className="px-4 py-2 text-right">${row.totalPayment}</td>
                          <td className="px-4 py-2 text-right font-semibold">${row.balance}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}