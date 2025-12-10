"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function PensionCalculatorPage() {
  const [currentAge, setCurrentAge] = useState('35');
  const [retirementAge, setRetirementAge] = useState('65');
  const [yearsOfService, setYearsOfService] = useState('30');
  const [finalSalary, setFinalSalary] = useState('80000');
  const [multiplier, setMultiplier] = useState('2');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const age = parseFloat(currentAge) || 0;
    const retAge = parseFloat(retirementAge) || 65;
    const years = parseFloat(yearsOfService) || 0;
    const salary = parseFloat(finalSalary) || 0;
    const mult = (parseFloat(multiplier) || 2) / 100;

    const yearsUntilRetirement = retAge - age;
    const annualPension = salary * years * mult;
    const monthlyPension = annualPension / 12;
    const replacementRate = (annualPension / salary) * 100;
    const lifeExpectancy = 85;
    const yearsInRetirement = lifeExpectancy - retAge;
    const totalPension = annualPension * yearsInRetirement;

    setResult({ annualPension, monthlyPension, replacementRate: replacementRate.toFixed(1), yearsUntilRetirement, yearsInRetirement, totalPension });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Pension Calculator" description="Calculate your estimated pension benefits based on years of service.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Pension Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Current Age</label><input type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1">Retirement Age</label><input type="number" value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1">Years of Service at Retirement</label><input type="number" value={yearsOfService} onChange={(e) => setYearsOfService(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1">Final Average Salary</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={finalSalary} onChange={(e) => setFinalSalary(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Benefit Multiplier</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={multiplier} onChange={(e) => setMultiplier(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div><p className="text-xs text-muted-foreground mt-1">Typical range: 1.5% - 2.5% per year</p></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Monthly Pension</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.monthlyPension)}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Pension Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Annual Pension:</span><span className="font-semibold">{formatCurrency(result.annualPension)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Income Replacement:</span><span className="font-semibold">{result.replacementRate}%</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Years Until Retirement:</span><span className="font-semibold">{result.yearsUntilRetirement}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Est. Years in Retirement:</span><span className="font-semibold">{result.yearsInRetirement}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Total Lifetime Pension:</span><span className="font-bold text-accent">{formatCurrency(result.totalPension)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter your pension details to calculate benefits</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
