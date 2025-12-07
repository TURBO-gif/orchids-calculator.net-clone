"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function TimeCalculatorPage() {
  const [hours1, setHours1] = useState('2');
  const [minutes1, setMinutes1] = useState('30');
  const [seconds1, setSeconds1] = useState('45');
  const [hours2, setHours2] = useState('1');
  const [minutes2, setMinutes2] = useState('15');
  const [seconds2, setSeconds2] = useState('30');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const totalSeconds1 = (parseInt(hours1) || 0) * 3600 + (parseInt(minutes1) || 0) * 60 + (parseInt(seconds1) || 0);
    const totalSeconds2 = (parseInt(hours2) || 0) * 3600 + (parseInt(minutes2) || 0) * 60 + (parseInt(seconds2) || 0);

    let resultSeconds = 0;
    if (operation === 'add') {
      resultSeconds = totalSeconds1 + totalSeconds2;
    } else {
      resultSeconds = Math.abs(totalSeconds1 - totalSeconds2);
    }

    const hours = Math.floor(resultSeconds / 3600);
    const minutes = Math.floor((resultSeconds % 3600) / 60);
    const seconds = resultSeconds % 60;

    setResult({
      hours,
      minutes,
      seconds,
      totalSeconds: resultSeconds
    });
  };

  return (
    <CalculatorLayout title="Time Calculator" description="Add or subtract time durations.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-2">Time 1</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs mb-1">Hours</label>
              <input
                type="number"
                value={hours1}
                onChange={(e) => setHours1(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Minutes</label>
              <input
                type="number"
                value={minutes1}
                onChange={(e) => setMinutes1(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Seconds</label>
              <input
                type="number"
                value={seconds1}
                onChange={(e) => setSeconds1(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold mb-1">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="add">Add (+)</option>
            <option value="subtract">Subtract (−)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold mb-2">Time 2</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs mb-1">Hours</label>
              <input
                type="number"
                value={hours2}
                onChange={(e) => setHours2(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Minutes</label>
              <input
                type="number"
                value={minutes2}
                onChange={(e) => setMinutes2(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Seconds</label>
              <input
                type="number"
                value={seconds2}
                onChange={(e) => setSeconds2(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold w-full"
        >
          Calculate
        </button>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Result:</h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{result.hours}h {result.minutes}m {result.seconds}s</p>
              <p><strong>Total Seconds:</strong> {result.totalSeconds}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
