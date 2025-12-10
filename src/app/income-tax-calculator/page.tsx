"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

const filingStatuses = [
  { value: 'single', label: 'Single' },
  { value: 'married', label: 'Married Filing Jointly' },
  { value: 'marriedSeparate', label: 'Married Filing Separately' },
  { value: 'headOfHousehold', label: 'Head of Household' },
];

const federalBrackets2024: Record<string, { rate: number; min: number; max: number }[]> = {
  single: [
    { rate: 10, min: 0, max: 11600 },
    { rate: 12, min: 11600, max: 47150 },
    { rate: 22, min: 47150, max: 100525 },
    { rate: 24, min: 100525, max: 191950 },
    { rate: 32, min: 191950, max: 243725 },
    { rate: 35, min: 243725, max: 609350 },
    { rate: 37, min: 609350, max: Infinity },
  ],
  married: [
    { rate: 10, min: 0, max: 23200 },
    { rate: 12, min: 23200, max: 94300 },
    { rate: 22, min: 94300, max: 201050 },
    { rate: 24, min: 201050, max: 383900 },
    { rate: 32, min: 383900, max: 487450 },
    { rate: 35, min: 487450, max: 731200 },
    { rate: 37, min: 731200, max: Infinity },
  ],
  marriedSeparate: [
    { rate: 10, min: 0, max: 11600 },
    { rate: 12, min: 11600, max: 47150 },
    { rate: 22, min: 47150, max: 100525 },
    { rate: 24, min: 100525, max: 191950 },
    { rate: 32, min: 191950, max: 243725 },
    { rate: 35, min: 243725, max: 365600 },
    { rate: 37, min: 365600, max: Infinity },
  ],
  headOfHousehold: [
    { rate: 10, min: 0, max: 16550 },
    { rate: 12, min: 16550, max: 63100 },
    { rate: 22, min: 63100, max: 100500 },
    { rate: 24, min: 100500, max: 191950 },
    { rate: 32, min: 191950, max: 243700 },
    { rate: 35, min: 243700, max: 609350 },
    { rate: 37, min: 609350, max: Infinity },
  ],
};

const standardDeductions2024: Record<string, number> = {
  single: 14600,
  married: 29200,
  marriedSeparate: 14600,
  headOfHousehold: 21900,
};

export default function IncomeTaxCalculatorPage() {
  const [grossIncome, setGrossIncome] = useState('75000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [deductionType, setDeductionType] = useState('standard');
  const [itemizedDeductions, setItemizedDeductions] = useState('0');
  const [retirement401k, setRetirement401k] = useState('0');
  const [iraContribution, setIraContribution] = useState('0');
  const [dependents, setDependents] = useState('0');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const income = parseFloat(grossIncome) || 0;
    const contrib401k = Math.min(parseFloat(retirement401k) || 0, 23000);
    const contribIRA = Math.min(parseFloat(iraContribution) || 0, 7000);
    const numDependents = parseInt(dependents) || 0;

    const deduction = deductionType === 'standard' 
      ? standardDeductions2024[filingStatus]
      : parseFloat(itemizedDeductions) || 0;

    const agi = income - contrib401k - contribIRA;
    const taxableIncome = Math.max(0, agi - deduction);

    const brackets = federalBrackets2024[filingStatus];
    let federalTax = 0;
    const bracketBreakdown = [];

    for (const bracket of brackets) {
      if (taxableIncome > bracket.min) {
        const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
        const taxInBracket = taxableInBracket * (bracket.rate / 100);
        federalTax += taxInBracket;
        
        if (taxableInBracket > 0) {
          bracketBreakdown.push({
            rate: bracket.rate,
            income: taxableInBracket,
            tax: taxInBracket,
          });
        }
      }
    }

    const childTaxCredit = numDependents * 2000;
    federalTax = Math.max(0, federalTax - childTaxCredit);

    const socialSecurityTax = Math.min(income, 168600) * 0.062;
    const medicareTax = income * 0.0145;
    const additionalMedicare = income > 200000 ? (income - 200000) * 0.009 : 0;
    const ficaTax = socialSecurityTax + medicareTax + additionalMedicare;

    const totalTax = federalTax + ficaTax;
    const takeHome = income - totalTax - contrib401k - contribIRA;
    const effectiveRate = (totalTax / income) * 100;
    const marginalRate = brackets.find(b => taxableIncome >= b.min && taxableIncome < b.max)?.rate || 0;

    setResult({
      grossIncome: income,
      agi,
      deduction,
      taxableIncome,
      federalTax,
      socialSecurityTax,
      medicareTax: medicareTax + additionalMedicare,
      ficaTax,
      totalTax,
      takeHome,
      takeHomeMonthly: takeHome / 12,
      effectiveRate,
      marginalRate,
      bracketBreakdown,
      childTaxCredit,
      retirement: contrib401k + contribIRA,
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

  const pieData = result ? [
    { name: 'Take Home', value: result.takeHome, color: '#10b981' },
    { name: 'Federal Tax', value: result.federalTax, color: '#6366f1' },
    { name: 'FICA', value: result.ficaTax, color: '#f59e0b' },
    { name: 'Retirement', value: result.retirement, color: '#8b5cf6' },
  ].filter(d => d.value > 0) : [];

  return (
    <CalculatorLayout title="Income Tax Calculator" description="Calculate your federal income tax, FICA taxes, and take-home pay with deductions and credits.">
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
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(e.target.value)}
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
                  {filingStatuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Number of Dependents</label>
                <input
                  type="number"
                  min="0"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Deductions</h3>
            
            <div className="space-y-3">
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deductionType"
                    checked={deductionType === 'standard'}
                    onChange={() => setDeductionType('standard')}
                  />
                  <span className="text-sm">Standard ({formatCurrency(standardDeductions2024[filingStatus])})</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="deductionType"
                    checked={deductionType === 'itemized'}
                    onChange={() => setDeductionType('itemized')}
                  />
                  <span className="text-sm">Itemized</span>
                </label>
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
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Pre-tax Retirement Contributions</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">401(k) Contribution</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={retirement401k}
                    onChange={(e) => setRetirement401k(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    placeholder="Max $23,000"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Traditional IRA Contribution</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={iraContribution}
                    onChange={(e) => setIraContribution(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    placeholder="Max $7,000"
                  />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold"
          >
            Calculate Tax
          </button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Take Home Pay</div>
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(result.takeHome)}</div>
                    <div className="text-sm text-muted-foreground">{formatCurrency(result.takeHomeMonthly)}/month</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Total Tax</div>
                    <div className="text-3xl font-bold text-red-600">{formatCurrency(result.totalTax)}</div>
                    <div className="text-sm text-muted-foreground">{result.effectiveRate.toFixed(1)}% effective</div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Tax Breakdown</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2">Gross Income</td>
                      <td className="py-2 text-right font-semibold">{formatCurrency(result.grossIncome)}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2">Pre-tax Deductions (401k, IRA)</td>
                      <td className="py-2 text-right text-red-600">-{formatCurrency(result.retirement)}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2">Adjusted Gross Income (AGI)</td>
                      <td className="py-2 text-right font-semibold">{formatCurrency(result.agi)}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2">{deductionType === 'standard' ? 'Standard' : 'Itemized'} Deduction</td>
                      <td className="py-2 text-right text-red-600">-{formatCurrency(result.deduction)}</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-2 font-bold">Taxable Income</td>
                      <td className="py-2 text-right font-bold">{formatCurrency(result.taxableIncome)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Tax Details</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2">Federal Income Tax</td>
                      <td className="py-2 text-right font-semibold text-red-600">{formatCurrency(result.federalTax)}</td>
                    </tr>
                    {result.childTaxCredit > 0 && (
                      <tr className="border-b border-border">
                        <td className="py-2 text-sm text-muted-foreground pl-4">Child Tax Credit Applied</td>
                        <td className="py-2 text-right text-green-600">-{formatCurrency(result.childTaxCredit)}</td>
                      </tr>
                    )}
                    <tr className="border-b border-border">
                      <td className="py-2">Social Security Tax (6.2%)</td>
                      <td className="py-2 text-right font-semibold text-red-600">{formatCurrency(result.socialSecurityTax)}</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2">Medicare Tax (1.45%)</td>
                      <td className="py-2 text-right font-semibold text-red-600">{formatCurrency(result.medicareTax)}</td>
                    </tr>
                    <tr className="border-b border-border bg-muted/30">
                      <td className="py-2 font-bold">Total Tax</td>
                      <td className="py-2 text-right font-bold text-red-600">{formatCurrency(result.totalTax)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Federal Tax Bracket Breakdown</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#4a7c9e] text-white">
                      <th className="py-2 px-2 text-left font-bold">Bracket</th>
                      <th className="py-2 px-2 text-right font-bold">Income</th>
                      <th className="py-2 px-2 text-right font-bold">Tax</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.bracketBreakdown.map((b: any, i: number) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="py-2 px-2">{b.rate}%</td>
                        <td className="py-2 px-2 text-right">{formatCurrency(b.income)}</td>
                        <td className="py-2 px-2 text-right font-semibold">{formatCurrency(b.tax)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3 text-sm">
                  <span className="text-muted-foreground">Marginal Tax Rate: </span>
                  <span className="font-bold">{result.marginalRate}%</span>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Income Distribution</h3>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {pieData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}: {formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your income information and click Calculate to see your tax breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
