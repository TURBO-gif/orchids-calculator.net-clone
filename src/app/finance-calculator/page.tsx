"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function FinanceCalculatorPage() {
  const [calculationType, setCalculationType] = useState('presentValue');
  const [futureValue, setFutureValue] = useState('10000');
  const [presentValue, setPresentValue] = useState('8000');
  const [payment, setPayment] = useState('100');
  const [rate, setRate] = useState('5');
  const [periods, setPeriods] = useState('10');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const fv = parseFloat(futureValue) || 0;
    const pv = parseFloat(presentValue) || 0;
    const pmt = parseFloat(payment) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const n = parseFloat(periods) || 0;

    let calculatedValue = 0;

    switch (calculationType) {
      case 'presentValue':
        // PV = FV / (1 + r)^n
        calculatedValue = fv / Math.pow(1 + r, n);
        break;
      case 'futureValue':
        // FV = PV * (1 + r)^n
        calculatedValue = pv * Math.pow(1 + r, n);
        break;
      case 'payment':
        // PMT = (r * PV) / (1 - (1 + r)^-n)
        if (r === 0) {
          calculatedValue = pv / n;
        } else {
          calculatedValue = (r * pv) / (1 - Math.pow(1 + r, -n));
        }
        break;
      case 'rate':
        // Using approximation for interest rate
        calculatedValue = ((Math.pow(fv / pv, 1 / n) - 1) * 100);
        break;
    }

    setResult({
      value: calculatedValue.toFixed(2),
      type: calculationType
    });
  };

  return (
    <CalculatorLayout title="Finance Calculator" description="Calculate present value, future value, payment, or interest rate.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Calculate</label>
          <select
            value={calculationType}
            onChange={(e) => setCalculationType(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="presentValue">Present Value</option>
            <option value="futureValue">Future Value</option>
            <option value="payment">Payment</option>
            <option value="rate">Interest Rate</option>
          </select>
        </div>

        {calculationType !== 'presentValue' && (
          <div>
            <label className="block text-sm font-bold mb-1">Present Value ($)</label>
            <input
              type="number"
              value={presentValue}
              onChange={(e) => setPresentValue(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
        )}

        {calculationType !== 'futureValue' && (
          <div>
            <label className="block text-sm font-bold mb-1">Future Value ($)</label>
            <input
              type="number"
              value={futureValue}
              onChange={(e) => setFutureValue(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
        )}

        {calculationType !== 'rate' && (
          <div>
            <label className="block text-sm font-bold mb-1">Interest Rate (% per period)</label>
            <input
              type="number"
              step="0.1"
              value={rate}
              onChange={(e) => setRate(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
        )}

        <div>
          <label className="block text-sm font-bold mb-1">Number of Periods</label>
          <input
            type="number"
            value={periods}
            onChange={(e) => setPeriods(e.target.value)}
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
            <h3 className="font-bold text-lg mb-3">Result:</h3>
            <div className="space-y-2">
              {result.type === 'presentValue' && <p><strong>Present Value:</strong> ${result.value}</p>}
              {result.type === 'futureValue' && <p><strong>Future Value:</strong> ${result.value}</p>}
              {result.type === 'payment' && <p><strong>Payment:</strong> ${result.value}</p>}
              {result.type === 'rate' && <p><strong>Interest Rate:</strong> {result.value}%</p>}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
