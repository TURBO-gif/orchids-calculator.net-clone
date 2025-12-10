"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RentalPropertyCalculatorPage() {
  const [purchasePrice, setPurchasePrice] = useState('250000');
  const [downPayment, setDownPayment] = useState('50000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [loanTerm, setLoanTerm] = useState('30');
  const [monthlyRent, setMonthlyRent] = useState('2000');
  const [propertyTax, setPropertyTax] = useState('3000');
  const [insurance, setInsurance] = useState('1500');
  const [maintenance, setMaintenance] = useState('2500');
  const [vacancy, setVacancy] = useState('5');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(purchasePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = (parseFloat(loanTerm) || 30) * 12;
    const rent = parseFloat(monthlyRent) || 0;
    const tax = (parseFloat(propertyTax) || 0) / 12;
    const ins = (parseFloat(insurance) || 0) / 12;
    const maint = (parseFloat(maintenance) || 0) / 12;
    const vacancyRate = (parseFloat(vacancy) || 0) / 100;

    const loanAmount = price - down;
    const monthlyPI = rate > 0 ? (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : loanAmount / term;
    const effectiveRent = rent * (1 - vacancyRate);
    const totalExpenses = monthlyPI + tax + ins + maint;
    const cashFlow = effectiveRent - totalExpenses;
    const annualCashFlow = cashFlow * 12;
    const cashOnCashReturn = (annualCashFlow / down) * 100;
    const capRate = ((rent * 12 - (tax * 12 + ins * 12 + maint * 12)) / price) * 100;

    setResult({
      monthlyPI, effectiveRent, totalExpenses, cashFlow, annualCashFlow,
      cashOnCashReturn: cashOnCashReturn.toFixed(2),
      capRate: capRate.toFixed(2),
      monthlyTax: tax, monthlyInsurance: ins, monthlyMaintenance: maint
    });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Rental Property Calculator" description="Analyze rental property investment returns and cash flow.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Property Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Purchase Price</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={purchasePrice} onChange={(e) => setPurchasePrice(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Down Payment</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Monthly Rent</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Annual Expenses</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Property Tax</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={propertyTax} onChange={(e) => setPropertyTax(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Insurance</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Maintenance</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Vacancy Rate</label><div className="flex items-center gap-2"><input type="number" value={vacancy} onChange={(e) => setVacancy(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className={`bg-card p-5 rounded-[3px] border-2 ${result.cashFlow >= 0 ? 'border-green-500' : 'border-red-500'}`}>
                <h3 className="font-bold text-lg mb-2 text-accent">Monthly Cash Flow</h3>
                <div className={`text-4xl font-bold ${result.cashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(result.cashFlow)}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Investment Metrics</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Cash-on-Cash Return:</span><span className="font-semibold">{result.cashOnCashReturn}%</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Cap Rate:</span><span className="font-semibold">{result.capRate}%</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Annual Cash Flow:</span><span className="font-semibold">{formatCurrency(result.annualCashFlow)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Monthly Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Effective Rent:</span><span className="font-semibold text-green-600">+{formatCurrency(result.effectiveRent)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Mortgage (P&I):</span><span className="font-semibold text-red-600">-{formatCurrency(result.monthlyPI)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Property Tax:</span><span className="font-semibold text-red-600">-{formatCurrency(result.monthlyTax)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Insurance:</span><span className="font-semibold text-red-600">-{formatCurrency(result.monthlyInsurance)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Maintenance:</span><span className="font-semibold text-red-600">-{formatCurrency(result.monthlyMaintenance)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter property details to analyze investment returns</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
