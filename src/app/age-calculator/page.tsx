"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState('1990-01-01');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const birth = new Date(birthDate);
    const current = new Date(currentDate);
    
    let years = current.getFullYear() - birth.getFullYear();
    let months = current.getMonth() - birth.getMonth();
    let days = current.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(current.getFullYear(), current.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const totalDays = Math.floor((current.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);

    setResult({
      years,
      months,
      days,
      totalDays,
      totalMonths,
      totalWeeks
    });
  };

  return (
    <CalculatorLayout title="Age Calculator" description="Calculate your exact age in years, months, and days.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Date of Birth</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Current Date</label>
          <input
            type="date"
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
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
              <p><strong>Age:</strong> {result.years} years, {result.months} months, {result.days} days</p>
              <p><strong>Total Months:</strong> {result.totalMonths}</p>
              <p><strong>Total Weeks:</strong> {result.totalWeeks}</p>
              <p><strong>Total Days:</strong> {result.totalDays}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
