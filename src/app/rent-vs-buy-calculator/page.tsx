"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function RentVsBuyCalculatorPage() {
  const [homePrice, setHomePrice] = useState('350000');
  const [downPayment, setDownPayment] = useState('70000');
  const [interestRate, setInterestRate] = useState('6.5');
  const [propertyTax, setPropertyTax] = useState('1.2');
  const [insurance, setInsurance] = useState('1500');
  const [maintenance, setMaintenance] = useState('1');
  const [monthlyRent, setMonthlyRent] = useState('2000');
  const [rentIncrease, setRentIncrease] = useState('3');
  const [appreciation, setAppreciation] = useState('3');
  const [years, setYears] = useState('7');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100 / 12;
    const term = 30 * 12;
    const tax = (parseFloat(propertyTax) || 0) / 100;
    const ins = parseFloat(insurance) || 0;
    const maint = (parseFloat(maintenance) || 0) / 100;
    const rent = parseFloat(monthlyRent) || 0;
    const rentInc = (parseFloat(rentIncrease) || 0) / 100;
    const appRate = (parseFloat(appreciation) || 0) / 100;
    const holdYears = parseFloat(years) || 7;

    const loanAmount = price - down;
    const monthlyPI = rate > 0 ? (loanAmount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1) : loanAmount / term;
    const monthlyTax = (price * tax) / 12;
    const monthlyIns = ins / 12;
    const monthlyMaint = (price * maint) / 12;
    const totalMonthlyOwn = monthlyPI + monthlyTax + monthlyIns + monthlyMaint;

    let totalRentCost = 0;
    let currentRent = rent;
    for (let y = 0; y < holdYears; y++) {
      totalRentCost += currentRent * 12;
      currentRent *= (1 + rentInc);
    }

    const futureValue = price * Math.pow(1 + appRate, holdYears);
    const equity = futureValue - loanAmount * 0.85;
    const totalOwnCost = totalMonthlyOwn * 12 * holdYears + down;
    const netOwnCost = totalOwnCost - equity;

    const buyIsBetter = netOwnCost < totalRentCost;
    const savings = Math.abs(totalRentCost - netOwnCost);

    setResult({
      monthlyOwn: totalMonthlyOwn, monthlyRent: rent, totalRentCost, totalOwnCost, equity, netOwnCost,
      futureValue, buyIsBetter, savings, holdYears
    });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Rent vs. Buy Calculator" description="Compare the costs of renting versus buying a home over time.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Buy Scenario</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Home Price</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Down Payment</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Interest Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Home Appreciation</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={appreciation} onChange={(e) => setAppreciation(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%/yr</span></div></div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Rent Scenario</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Monthly Rent</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={monthlyRent} onChange={(e) => setMonthlyRent(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Annual Rent Increase</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={rentIncrease} onChange={(e) => setRentIncrease(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Time Horizon</label><select value={years} onChange={(e) => setYears(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="3">3 years</option><option value="5">5 years</option><option value="7">7 years</option><option value="10">10 years</option><option value="15">15 years</option></select></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Compare</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className={`bg-card p-5 rounded-[3px] border-2 ${result.buyIsBetter ? 'border-green-500' : 'border-blue-500'}`}>
                <h3 className={`font-bold text-lg mb-2 ${result.buyIsBetter ? 'text-green-600' : 'text-blue-600'}`}>
                  {result.buyIsBetter ? 'Buying is Better!' : 'Renting is Better!'}
                </h3>
                <div className="text-4xl font-bold text-foreground">Save {formatCurrency(result.savings)}</div>
                <div className="text-sm text-muted-foreground">Over {result.holdYears} years</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Monthly Comparison</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Monthly Ownership Cost:</span><span className="font-semibold">{formatCurrency(result.monthlyOwn)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Current Monthly Rent:</span><span className="font-semibold">{formatCurrency(result.monthlyRent)}</span></div>
                </div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">{result.holdYears}-Year Total Cost</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Rent Paid:</span><span className="font-semibold text-red-600">{formatCurrency(result.totalRentCost)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Total Ownership Cost:</span><span className="font-semibold">{formatCurrency(result.totalOwnCost)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Est. Home Equity:</span><span className="font-semibold text-green-600">-{formatCurrency(result.equity)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Net Buy Cost:</span><span className="font-bold">{formatCurrency(result.netOwnCost)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter details to compare renting vs buying</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
