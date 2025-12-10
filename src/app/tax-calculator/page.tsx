"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function TaxCalculatorPage() {
  const [income, setIncome] = useState('75000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [deductionType, setDeductionType] = useState('standard');
  const [itemizedDeductions, setItemizedDeductions] = useState('0');
  const [retirement401k, setRetirement401k] = useState('0');
  const [iraContributions, setIraContributions] = useState('0');
  const [stateAbbr, setStateAbbr] = useState('CA');
  const [result, setResult] = useState<any>(null);

  const standardDeductions: { [key: string]: number } = {
    single: 14600,
    married: 29200,
    head: 21900
  };

  const stateTaxRates: { [key: string]: number } = {
    'AL': 5.0, 'AK': 0, 'AZ': 2.5, 'AR': 4.4, 'CA': 9.3, 'CO': 4.4, 'CT': 5.0, 'DE': 6.6,
    'FL': 0, 'GA': 5.49, 'HI': 8.25, 'ID': 5.8, 'IL': 4.95, 'IN': 3.05, 'IA': 5.7, 'KS': 5.7,
    'KY': 4.0, 'LA': 4.25, 'ME': 7.15, 'MD': 5.75, 'MA': 5.0, 'MI': 4.25, 'MN': 7.85, 'MS': 5.0,
    'MO': 4.95, 'MT': 5.9, 'NE': 5.84, 'NV': 0, 'NH': 0, 'NJ': 6.37, 'NM': 5.9, 'NY': 6.85,
    'NC': 4.75, 'ND': 2.5, 'OH': 3.5, 'OK': 4.75, 'OR': 9.0, 'PA': 3.07, 'RI': 5.99, 'SC': 6.4,
    'SD': 0, 'TN': 0, 'TX': 0, 'UT': 4.65, 'VT': 6.6, 'VA': 5.75, 'WA': 0, 'WV': 5.12,
    'WI': 5.3, 'WY': 0
  };

  const calculate = () => {
    const grossIncome = parseFloat(income) || 0;
    const retirement = Math.min(parseFloat(retirement401k) || 0, 23000);
    const ira = Math.min(parseFloat(iraContributions) || 0, 7000);
    
    const agi = grossIncome - retirement - ira;
    
    const standardDed = standardDeductions[filingStatus] || standardDeductions.single;
    const itemized = parseFloat(itemizedDeductions) || 0;
    const deduction = deductionType === 'standard' ? standardDed : itemized;
    
    const taxableIncome = Math.max(0, agi - deduction);

    const brackets2024: { [key: string]: { limit: number; rate: number }[] } = {
      single: [
        { limit: 11600, rate: 0.10 },
        { limit: 47150, rate: 0.12 },
        { limit: 100525, rate: 0.22 },
        { limit: 191950, rate: 0.24 },
        { limit: 243725, rate: 0.32 },
        { limit: 609350, rate: 0.35 },
        { limit: Infinity, rate: 0.37 }
      ],
      married: [
        { limit: 23200, rate: 0.10 },
        { limit: 94300, rate: 0.12 },
        { limit: 201050, rate: 0.22 },
        { limit: 383900, rate: 0.24 },
        { limit: 487450, rate: 0.32 },
        { limit: 731200, rate: 0.35 },
        { limit: Infinity, rate: 0.37 }
      ],
      head: [
        { limit: 16550, rate: 0.10 },
        { limit: 63100, rate: 0.12 },
        { limit: 100500, rate: 0.22 },
        { limit: 191950, rate: 0.24 },
        { limit: 243700, rate: 0.32 },
        { limit: 609350, rate: 0.35 },
        { limit: Infinity, rate: 0.37 }
      ]
    };

    let federalTax = 0;
    let remainingIncome = taxableIncome;
    let previousLimit = 0;
    const bracketBreakdown: { bracket: string; taxableAmount: number; rate: number; tax: number }[] = [];

    const selectedBrackets = brackets2024[filingStatus] || brackets2024.single;
    for (const bracket of selectedBrackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(remainingIncome, bracket.limit - previousLimit);
      const taxForBracket = taxableInBracket * bracket.rate;
      federalTax += taxForBracket;
      
      if (taxableInBracket > 0) {
        bracketBreakdown.push({
          bracket: `${(bracket.rate * 100).toFixed(0)}%`,
          taxableAmount: taxableInBracket,
          rate: bracket.rate,
          tax: taxForBracket
        });
      }
      
      remainingIncome -= taxableInBracket;
      previousLimit = bracket.limit;
    }

    const socialSecurityTax = Math.min(grossIncome, 168600) * 0.062;
    const medicareTax = grossIncome * 0.0145;
    const additionalMedicare = grossIncome > 200000 ? (grossIncome - 200000) * 0.009 : 0;
    const ficaTax = socialSecurityTax + medicareTax + additionalMedicare;

    const stateRate = stateTaxRates[stateAbbr] || 0;
    const stateTax = taxableIncome * (stateRate / 100);

    const totalTax = federalTax + ficaTax + stateTax;
    const effectiveRate = grossIncome > 0 ? (totalTax / grossIncome) * 100 : 0;
    const marginalRate = bracketBreakdown.length > 0 ? bracketBreakdown[bracketBreakdown.length - 1].rate * 100 : 0;
    const afterTaxIncome = grossIncome - totalTax;
    const monthlyTakeHome = afterTaxIncome / 12;

    setResult({
      grossIncome,
      agi,
      deduction,
      taxableIncome,
      federalTax,
      socialSecurityTax,
      medicareTax: medicareTax + additionalMedicare,
      ficaTax,
      stateTax,
      totalTax,
      effectiveRate,
      marginalRate,
      afterTaxIncome,
      monthlyTakeHome,
      bracketBreakdown
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

  const getChartData = () => {
    if (!result) return [];
    return [
      { name: 'Federal Tax', value: result.federalTax, color: '#ef4444' },
      { name: 'FICA', value: result.ficaTax, color: '#f97316' },
      { name: 'State Tax', value: result.stateTax, color: '#eab308' },
      { name: 'Take Home', value: result.afterTaxIncome, color: '#22c55e' }
    ].filter(item => item.value > 0);
  };

  return (
    <CalculatorLayout title="Income Tax Calculator" description="Estimate your 2024 federal and state income taxes with FICA, deductions, and retirement contributions.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Income Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Gross Annual Income</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Filing Status</label>
                <select
                  value={filingStatus}
                  onChange={(e) => setFilingStatus(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                >
                  <option value="single">Single</option>
                  <option value="married">Married Filing Jointly</option>
                  <option value="head">Head of Household</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">State</label>
                <select
                  value={stateAbbr}
                  onChange={(e) => setStateAbbr(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                >
                  {Object.keys(stateTaxRates).sort().map(state => (
                    <option key={state} value={state}>{state} ({stateTaxRates[state]}%)</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Deductions & Contributions</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Deduction Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={deductionType === 'standard'}
                      onChange={() => setDeductionType('standard')}
                    />
                    <span className="text-sm">Standard ({formatCurrency(standardDeductions[filingStatus])})</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={deductionType === 'itemized'}
                      onChange={() => setDeductionType('itemized')}
                    />
                    <span className="text-sm">Itemized</span>
                  </label>
                </div>
              </div>
              {deductionType === 'itemized' && (
                <div>
                  <label className="block text-sm font-bold mb-1">Itemized Deductions</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={itemizedDeductions}
                      onChange={(e) => setItemizedDeductions(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-bold mb-1">401(k) Contributions (max $23,000)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={retirement401k}
                    onChange={(e) => setRetirement401k(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">IRA Contributions (max $7,000)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={iraContributions}
                    onChange={(e) => setIraContributions(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-[#5f8d4e] text-white px-6 py-3 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
          >
            Calculate
          </button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-[#4a7c9e] text-white p-5 rounded-[3px]">
                <div className="text-center">
                  <div className="text-sm mb-1 opacity-90">Total Tax</div>
                  <div className="text-4xl font-bold">{formatCurrency(result.totalTax)}</div>
                  <div className="text-sm opacity-90 mt-1">Effective Rate: {result.effectiveRate.toFixed(1)}%</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#22c55e] text-white p-4 rounded-[3px]">
                  <div className="text-center">
                    <div className="text-xs mb-1 opacity-90">After-Tax Income</div>
                    <div className="text-xl font-bold">{formatCurrency(result.afterTaxIncome)}</div>
                  </div>
                </div>
                <div className="bg-[#6366f1] text-white p-4 rounded-[3px]">
                  <div className="text-center">
                    <div className="text-xs mb-1 opacity-90">Monthly Take Home</div>
                    <div className="text-xl font-bold">{formatCurrency(result.monthlyTakeHome)}</div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Tax Breakdown</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={getChartData()}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {getChartData().map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap justify-center gap-3 mt-2">
                  {getChartData().map((item, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Tax Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Gross Income</span>
                    <span className="font-semibold">{formatCurrency(result.grossIncome)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Adjusted Gross Income</span>
                    <span className="font-semibold">{formatCurrency(result.agi)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Deductions</span>
                    <span className="font-semibold">-{formatCurrency(result.deduction)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Taxable Income</span>
                    <span className="font-bold">{formatCurrency(result.taxableIncome)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Federal Tax</span>
                    <span className="font-semibold text-destructive">{formatCurrency(result.federalTax)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Social Security Tax</span>
                    <span className="font-semibold">{formatCurrency(result.socialSecurityTax)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Medicare Tax</span>
                    <span className="font-semibold">{formatCurrency(result.medicareTax)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">State Tax ({stateAbbr})</span>
                    <span className="font-semibold">{formatCurrency(result.stateTax)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t-2 border-border pt-2">
                    <span className="font-bold">Total Tax</span>
                    <span className="font-bold text-destructive">{formatCurrency(result.totalTax)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Marginal Tax Bracket</span>
                    <span className="font-semibold">{result.marginalRate.toFixed(0)}%</span>
                  </div>
                </div>
              </div>

              {result.bracketBreakdown.length > 0 && (
                <div className="bg-card p-4 rounded-[3px] border border-border">
                  <h3 className="font-bold text-base mb-3">Federal Tax by Bracket</h3>
                  <table className="w-full text-sm">
                    <thead className="bg-[#4a7c9e] text-white">
                      <tr>
                        <th className="text-left p-2 font-bold">Bracket</th>
                        <th className="text-right p-2 font-bold">Taxable</th>
                        <th className="text-right p-2 font-bold">Tax</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.bracketBreakdown.map((b: any, idx: number) => (
                        <tr key={idx} className="border-b border-border hover:bg-muted/50">
                          <td className="p-2">{b.bracket}</td>
                          <td className="p-2 text-right">{formatCurrency(b.taxableAmount)}</td>
                          <td className="p-2 text-right font-semibold">{formatCurrency(b.tax)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your income details and click Calculate to see your tax estimate</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
