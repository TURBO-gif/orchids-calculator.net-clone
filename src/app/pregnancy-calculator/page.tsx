"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function PregnancyCalculatorPage() {
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [cycleLength, setCycleLength] = useState('28');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const lmp = new Date(lastPeriod);
    const cycle = parseInt(cycleLength) || 28;

    // Estimated Due Date (Naegele's rule): LMP + 280 days
    const dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);

    // Conception date (approximately 14 days after LMP)
    const conceptionDate = new Date(lmp.getTime() + 14 * 24 * 60 * 60 * 1000);

    // Current pregnancy progress
    const today = new Date();
    const daysSinceLMP = Math.floor((today.getTime() - lmp.getTime()) / (24 * 60 * 60 * 1000));
    const weeks = Math.floor(daysSinceLMP / 7);
    const days = daysSinceLMP % 7;

    // Trimester
    let trimester = 1;
    if (weeks >= 27) trimester = 3;
    else if (weeks >= 13) trimester = 2;

    // Days until due date
    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    setResult({
      dueDate: dueDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      conceptionDate: conceptionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      weeks,
      days,
      trimester,
      daysUntilDue: Math.max(0, daysUntilDue),
      isPregnant: daysUntilDue > 0
    });
  };

  return (
    <CalculatorLayout title="Pregnancy Calculator" description="Calculate your due date and pregnancy milestones.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">First Day of Last Period</label>
          <input
            type="date"
            value={lastPeriod}
            onChange={(e) => setLastPeriod(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Average Cycle Length (days)</label>
          <input
            type="number"
            value={cycleLength}
            onChange={(e) => setCycleLength(e.target.value)}
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
              <p><strong>Estimated Due Date:</strong> {result.dueDate}</p>
              <p><strong>Estimated Conception Date:</strong> {result.conceptionDate}</p>
              {result.isPregnant && (
                <>
                  <p><strong>Current Progress:</strong> {result.weeks} weeks, {result.days} days</p>
                  <p><strong>Trimester:</strong> {result.trimester}</p>
                  <p><strong>Days Until Due Date:</strong> {result.daysUntilDue}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
