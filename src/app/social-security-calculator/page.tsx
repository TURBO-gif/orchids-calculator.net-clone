"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function SocialSecurityCalculatorPage() {
  const [birthYear, setBirthYear] = useState('1970');
  const [retirementAge, setRetirementAge] = useState('67');
  const [avgEarnings, setAvgEarnings] = useState('60000');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const year = parseFloat(birthYear) || 1970;
    const retAge = parseFloat(retirementAge) || 67;
    const earnings = parseFloat(avgEarnings) || 0;

    let fra = 67;
    if (year <= 1937) fra = 65;
    else if (year <= 1954) fra = 66;
    else if (year <= 1959) fra = 66 + (year - 1954) / 6;

    const aime = earnings / 12;
    let pia = 0;
    if (aime <= 1115) pia = aime * 0.9;
    else if (aime <= 6721) pia = 1115 * 0.9 + (aime - 1115) * 0.32;
    else pia = 1115 * 0.9 + (6721 - 1115) * 0.32 + (aime - 6721) * 0.15;

    let benefit = pia;
    const monthsDiff = (retAge - fra) * 12;
    if (monthsDiff < 0) benefit = pia * (1 - Math.abs(monthsDiff) * 0.00556);
    else if (monthsDiff > 0) benefit = pia * (1 + monthsDiff * 0.00667);

    const annualBenefit = benefit * 12;
    const lifeExpectancy = 85;
    const yearsReceiving = lifeExpectancy - retAge;
    const lifetimeBenefits = annualBenefit * yearsReceiving;

    setResult({ monthlyBenefit: benefit, annualBenefit, fra, pia, lifetimeBenefits, yearsReceiving });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Social Security Calculator" description="Estimate your Social Security retirement benefits.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Your Information</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Birth Year</label><input type="number" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1">Planned Retirement Age</label><select value={retirementAge} onChange={(e) => setRetirementAge(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="62">62 (Early)</option><option value="65">65</option><option value="67">67 (Full)</option><option value="70">70 (Delayed)</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Average Annual Earnings (Top 35 Years)</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={avgEarnings} onChange={(e) => setAvgEarnings(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Estimated Monthly Benefit</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.monthlyBenefit)}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Benefit Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Full Retirement Age:</span><span className="font-semibold">{result.fra.toFixed(1)} years</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Primary Insurance Amount:</span><span className="font-semibold">{formatCurrency(result.pia)}/mo</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Annual Benefit:</span><span className="font-semibold">{formatCurrency(result.annualBenefit)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Est. Lifetime Benefits:</span><span className="font-bold text-accent">{formatCurrency(result.lifetimeBenefits)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter your details to estimate benefits</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
