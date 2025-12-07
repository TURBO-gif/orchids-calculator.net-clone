"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function HoursCalculatorPage() {
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [breakMinutes, setBreakMinutes] = useState('60');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);
    const breakMins = parseInt(breakMinutes) || 0;

    const startMinutes = startHour * 60 + startMin;
    let endMinutes = endHour * 60 + endMin;

    // Handle overnight shift
    if (endMinutes < startMinutes) {
      endMinutes += 24 * 60;
    }

    const totalMinutes = endMinutes - startMinutes - breakMins;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const decimal = (totalMinutes / 60).toFixed(2);

    setResult({
      hours,
      minutes,
      decimal,
      totalMinutes
    });
  };

  return (
    <CalculatorLayout title="Hours Calculator" description="Calculate hours worked between two times.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Start Time</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">End Time</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Break Time (minutes)</label>
          <input
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
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
              <p><strong>Total Time:</strong> {result.hours}h {result.minutes}m</p>
              <p><strong>Decimal Hours:</strong> {result.decimal} hours</p>
              <p><strong>Total Minutes:</strong> {result.totalMinutes} minutes</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
