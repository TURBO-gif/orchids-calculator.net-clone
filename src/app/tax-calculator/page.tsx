"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function TaxCalculatorPage() {
  const [income, setIncome] = useState('50000');
  const [filingStatus, setFilingStatus] = useState('single');
  const [deductions, setDeductions] = useState('12950');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const grossIncome = parseFloat(income) || 0;
    const deduction = parseFloat(deductions) || 0;
    const taxableIncome = Math.max(0, grossIncome - deduction);

    // 2023 Tax Brackets (simplified)
    const brackets: any = {
      single: [
        { limit: 11000, rate: 0.10 },
        { limit: 44725, rate: 0.12 },
        { limit: 95375, rate: 0.22 },
        { limit: 182100, rate: 0.24 },
        { limit: 231250, rate: 0.32 },
        { limit: 578125, rate: 0.35 },
        { limit: Infinity, rate: 0.37 }
      ],
      married: [
        { limit: 22000, rate: 0.10 },
        { limit: 89050, rate: 0.12 },
        { limit: 190750, rate: 0.22 },
        { limit: 364200, rate: 0.24 },
        { limit: 462500, rate: 0.32 },
        { limit: 693750, rate: 0.35 },
        { limit: Infinity, rate: 0.37 }
      ]
    };

    let tax = 0;
    let remainingIncome = taxableIncome;
    let previousLimit = 0;

    const selectedBrackets = brackets[filingStatus];
    for (const bracket of selectedBrackets) {
      if (remainingIncome <= 0) break;
      
      const taxableInBracket = Math.min(remainingIncome, bracket.limit - previousLimit);
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
      previousLimit = bracket.limit;
    }

    const effectiveRate = grossIncome > 0 ? (tax / grossIncome) * 100 : 0;
    const afterTaxIncome = grossIncome - tax;

    setResult({
      grossIncome: grossIncome.toFixed(2),
      deductions: deduction.toFixed(2),
      taxableIncome: taxableIncome.toFixed(2),
      estimatedTax: tax.toFixed(2),
      effectiveRate: effectiveRate.toFixed(2),
      afterTaxIncome: afterTaxIncome.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Income Tax Calculator" description="Estimate your federal income tax (2023 rates).">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Gross Income ($)</label>
          <input
            type="number"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
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
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Deductions ($)</label>
          <input
            type="number"
            value={deductions}
            onChange={(e) => setDeductions(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
        >
          Calculate
        </button>
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            <div className="space-y-2">
              <p><strong>Gross Income:</strong> ${result.grossIncome}</p>
              <p><strong>Deductions:</strong> ${result.deductions}</p>
              <p><strong>Taxable Income:</strong> ${result.taxableIncome}</p>
              <p><strong>Estimated Tax:</strong> ${result.estimatedTax}</p>
              <p><strong>Effective Tax Rate:</strong> {result.effectiveRate}%</p>
              <p><strong>After-Tax Income:</strong> ${result.afterTaxIncome}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
