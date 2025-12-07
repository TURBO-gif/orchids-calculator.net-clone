"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function DueDateCalculatorPage() {
  const [method, setMethod] = useState('lmp');
  const [lastPeriod, setLastPeriod] = useState(new Date().toISOString().split('T')[0]);
  const [conceptionDate, setConceptionDate] = useState(new Date().toISOString().split('T')[0]);
  const [ultrasoundDate, setUltrasoundDate] = useState(new Date().toISOString().split('T')[0]);
  const [gestationalAge, setGestationalAge] = useState('12');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let dueDate: Date;
    let conceptionEst: Date;
    
    if (method === 'lmp') {
      const lmp = new Date(lastPeriod);
      dueDate = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
      conceptionEst = new Date(lmp.getTime() + 14 * 24 * 60 * 60 * 1000);
    } else if (method === 'conception') {
      const conception = new Date(conceptionDate);
      dueDate = new Date(conception.getTime() + 266 * 24 * 60 * 60 * 1000);
      conceptionEst = conception;
    } else {
      // Ultrasound method
      const ultrasound = new Date(ultrasoundDate);
      const ga = parseInt(gestationalAge) || 0;
      const daysRemaining = 280 - (ga * 7);
      dueDate = new Date(ultrasound.getTime() + daysRemaining * 24 * 60 * 60 * 1000);
      conceptionEst = new Date(dueDate.getTime() - 266 * 24 * 60 * 60 * 1000);
    }

    // Current progress
    const today = new Date();
    const daysSinceConception = Math.floor((today.getTime() - conceptionEst.getTime()) / (24 * 60 * 60 * 1000));
    const weeks = Math.floor((daysSinceConception + 14) / 7);
    const days = (daysSinceConception + 14) % 7;
    
    let trimester = 1;
    if (weeks >= 27) trimester = 3;
    else if (weeks >= 13) trimester = 2;

    const daysUntilDue = Math.floor((dueDate.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));

    setResult({
      dueDate: dueDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      conceptionDate: conceptionEst.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
      weeks,
      days,
      trimester,
      daysUntilDue: Math.max(0, daysUntilDue)
    });
  };

  return (
    <CalculatorLayout title="Due Date Calculator" description="Calculate your baby's due date using different methods.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Calculation Method</label>
          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="lmp">Last Menstrual Period</option>
            <option value="conception">Conception Date</option>
            <option value="ultrasound">Ultrasound</option>
          </select>
        </div>

        {method === 'lmp' && (
          <div>
            <label className="block text-sm font-bold mb-1">First Day of Last Period</label>
            <input
              type="date"
              value={lastPeriod}
              onChange={(e) => setLastPeriod(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
        )}

        {method === 'conception' && (
          <div>
            <label className="block text-sm font-bold mb-1">Conception Date</label>
            <input
              type="date"
              value={conceptionDate}
              onChange={(e) => setConceptionDate(e.target.value)}
              className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
            />
          </div>
        )}

        {method === 'ultrasound' && (
          <>
            <div>
              <label className="block text-sm font-bold mb-1">Ultrasound Date</label>
              <input
                type="date"
                value={ultrasoundDate}
                onChange={(e) => setUltrasoundDate(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Gestational Age at Ultrasound (weeks)</label>
              <input
                type="number"
                value={gestationalAge}
                onChange={(e) => setGestationalAge(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </>
        )}

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
              <p><strong>Current Progress:</strong> {result.weeks} weeks, {result.days} days</p>
              <p><strong>Trimester:</strong> {result.trimester}</p>
              <p><strong>Days Until Due Date:</strong> {result.daysUntilDue}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
