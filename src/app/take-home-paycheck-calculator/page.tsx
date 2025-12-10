"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function TakeHomePaycheckCalculatorPage() {
  const [salary, setSalary] = useState('75000');
  const [payFrequency, setPayFrequency] = useState('biweekly');
  const [filingStatus, setFilingStatus] = useState('single');
  const [state, setState] = useState('CA');
  const [retirement401k, setRetirement401k] = useState('6');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const annual = parseFloat(salary) || 0;
    const k401 = (parseFloat(retirement401k) || 0) / 100;
    const periods = payFrequency === 'weekly' ? 52 : payFrequency === 'biweekly' ? 26 : payFrequency === 'semimonthly' ? 24 : 12;

    const gross = annual / periods;
    const retirement = gross * k401;
    const taxableIncome = gross - retirement;

    const federalTax = taxableIncome * (filingStatus === 'single' ? 0.22 : 0.18);
    const stateTaxRates: Record<string, number> = { CA: 0.093, NY: 0.085, TX: 0, FL: 0, WA: 0 };
    const stateTax = taxableIncome * (stateTaxRates[state] || 0.05);
    const socialSecurity = gross * 0.062;
    const medicare = gross * 0.0145;
    const totalDeductions = federalTax + stateTax + socialSecurity + medicare + retirement;
    const takeHome = gross - totalDeductions;

    setResult({ gross, retirement, federalTax, stateTax, socialSecurity, medicare, totalDeductions, takeHome, periods, annual: takeHome * periods });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(value);

  return (
    <CalculatorLayout title="Take-Home Paycheck Calculator" description="Calculate your net pay after taxes and deductions.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Salary Information</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Annual Salary</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={salary} onChange={(e) => setSalary(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Pay Frequency</label><select value={payFrequency} onChange={(e) => setPayFrequency(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="weekly">Weekly</option><option value="biweekly">Bi-weekly</option><option value="semimonthly">Semi-monthly</option><option value="monthly">Monthly</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Filing Status</label><select value={filingStatus} onChange={(e) => setFilingStatus(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="single">Single</option><option value="married">Married Filing Jointly</option></select></div>
              <div><label className="block text-sm font-bold mb-1">State</label><select value={state} onChange={(e) => setState(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="CA">California</option><option value="NY">New York</option><option value="TX">Texas</option><option value="FL">Florida</option><option value="WA">Washington</option></select></div>
              <div><label className="block text-sm font-bold mb-1">401(k) Contribution</label><div className="flex items-center gap-2"><input type="number" value={retirement401k} onChange={(e) => setRetirement401k(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Take-Home Pay</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.takeHome)}</div>
                <div className="text-sm text-muted-foreground">Per paycheck ({result.periods}x/year)</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Paycheck Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Gross Pay:</span><span className="font-semibold">{formatCurrency(result.gross)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Federal Tax:</span><span className="font-semibold text-red-600">-{formatCurrency(result.federalTax)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">State Tax:</span><span className="font-semibold text-red-600">-{formatCurrency(result.stateTax)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Social Security:</span><span className="font-semibold text-red-600">-{formatCurrency(result.socialSecurity)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Medicare:</span><span className="font-semibold text-red-600">-{formatCurrency(result.medicare)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">401(k):</span><span className="font-semibold text-blue-600">-{formatCurrency(result.retirement)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Annual Take-Home:</span><span className="font-bold text-accent">{formatCurrency(result.annual)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter salary details to calculate take-home pay</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
