"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function PregnancyConceptionCalculatorPage() {
  const [dueDate, setDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const due = new Date(dueDate);
    
    // Conception date is approximately 266 days (38 weeks) before due date
    const conceptionDate = new Date(due.getTime() - 266 * 24 * 60 * 60 * 1000);
    
    // Last menstrual period is approximately 280 days (40 weeks) before due date
    const lmp = new Date(due.getTime() - 280 * 24 * 60 * 60 * 1000);
    
    // Conception window (5 days around conception date)
    const conceptionStart = new Date(conceptionDate.getTime() - 2 * 24 * 60 * 60 * 1000);
    const conceptionEnd = new Date(conceptionDate.getTime() + 2 * 24 * 60 * 60 * 1000);

    setResult({
      conceptionDate: conceptionDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      conceptionStart: conceptionStart.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      conceptionEnd: conceptionEnd.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      lmp: lmp.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    });
  };

  return (
    <CalculatorLayout title="Pregnancy Conception Calculator" description="Calculate conception date from due date.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
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
              <p><strong>Estimated Last Menstrual Period:</strong> {result.lmp}</p>
              <p><strong>Estimated Conception Date:</strong> {result.conceptionDate}</p>
              <p><strong>Conception Date Range:</strong> {result.conceptionStart} - {result.conceptionEnd}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
