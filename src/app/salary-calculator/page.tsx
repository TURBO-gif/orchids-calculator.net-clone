"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function SalaryCalculatorPage() {
  const [amount, setAmount] = useState('60000');
  const [period, setPeriod] = useState('year');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const sal = parseFloat(amount) || 0;
    const hours = parseFloat(hoursPerWeek) || 40;
    
    let yearlyAmount = 0;
    
    switch(period) {
      case 'hour':
        yearlyAmount = sal * hours * 52;
        break;
      case 'day':
        yearlyAmount = sal * 5 * 52;
        break;
      case 'week':
        yearlyAmount = sal * 52;
        break;
      case 'month':
        yearlyAmount = sal * 12;
        break;
      case 'year':
        yearlyAmount = sal;
        break;
    }
    
    const monthly = yearlyAmount / 12;
    const weekly = yearlyAmount / 52;
    const daily = weekly / 5;
    const hourly = yearlyAmount / (hours * 52);

    setResult({
      yearly: yearlyAmount.toFixed(2),
      monthly: monthly.toFixed(2),
      weekly: weekly.toFixed(2),
      daily: daily.toFixed(2),
      hourly: hourly.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Salary Calculator" description="Convert between different salary periods.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Amount ($)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Pay Period</label>
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="hour">Hourly</option>
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Hours per Week</label>
          <input
            type="number"
            value={hoursPerWeek}
            onChange={(e) => setHoursPerWeek(e.target.value)}
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
              <p><strong>Hourly:</strong> ${result.hourly}</p>
              <p><strong>Daily:</strong> ${result.daily}</p>
              <p><strong>Weekly:</strong> ${result.weekly}</p>
              <p><strong>Monthly:</strong> ${result.monthly}</p>
              <p><strong>Yearly:</strong> ${result.yearly}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
