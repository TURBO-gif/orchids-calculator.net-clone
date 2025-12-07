"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [daysToAdd, setDaysToAdd] = useState('30');
  const [result, setResult] = useState<any>(null);

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const diffYears = end.getFullYear() - start.getFullYear();

    setResult({
      days: diffDays,
      weeks: diffWeeks,
      months: diffMonths,
      years: diffYears
    });
  };

  const calculateAddDays = () => {
    const start = new Date(startDate);
    const days = parseInt(daysToAdd) || 0;
    const newDate = new Date(start.getTime() + days * 24 * 60 * 60 * 1000);
    
    setResult({
      newDate: newDate.toISOString().split('T')[0],
      dateString: newDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    });
  };

  return (
    <CalculatorLayout title="Date Calculator" description="Calculate the difference between dates or add/subtract days.">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-bold">Calculate Date Difference</h3>
          <div>
            <label className="block text-sm font-bold mb-1">Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={calculateDifference}
            className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
          >
            Calculate Difference
          </button>
        </div>

        <div className="space-y-4 border-t pt-6">
          <h3 className="font-bold">Add/Subtract Days</h3>
          <div>
            <label className="block text-sm font-bold mb-1">Starting Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Days to Add (use negative to subtract)</label>
            <input
              type="number"
              value={daysToAdd}
              onChange={(e) => setDaysToAdd(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
          <button
            onClick={calculateAddDays}
            className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
          >
            Calculate New Date
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            <div className="space-y-2">
              {result.days !== undefined && (
                <>
                  <p><strong>Days:</strong> {result.days}</p>
                  <p><strong>Weeks:</strong> {result.weeks}</p>
                  <p><strong>Months:</strong> {result.months}</p>
                  <p><strong>Years:</strong> {result.years}</p>
                </>
              )}
              {result.newDate && (
                <>
                  <p><strong>New Date:</strong> {result.newDate}</p>
                  <p><strong>Date:</strong> {result.dateString}</p>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
