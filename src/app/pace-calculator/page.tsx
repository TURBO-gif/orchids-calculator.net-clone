"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function PaceCalculatorPage() {
  const [distance, setDistance] = useState('5');
  const [hours, setHours] = useState('0');
  const [minutes, setMinutes] = useState('25');
  const [seconds, setSeconds] = useState('0');
  const [unit, setUnit] = useState('km');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const dist = parseFloat(distance) || 0;
    const h = parseInt(hours) || 0;
    const m = parseInt(minutes) || 0;
    const s = parseInt(seconds) || 0;

    const totalSeconds = h * 3600 + m * 60 + s;
    const totalMinutes = totalSeconds / 60;

    if (dist === 0 || totalSeconds === 0) {
      setResult({ error: 'Please enter valid distance and time' });
      return;
    }

    // Calculate pace (minutes per unit)
    const paceMinutes = totalMinutes / dist;
    const paceMin = Math.floor(paceMinutes);
    const paceSec = Math.round((paceMinutes - paceMin) * 60);

    // Calculate speed
    const speed = dist / (totalSeconds / 3600);

    // Convert if needed
    let paceKm = paceMinutes;
    let paceMile = paceMinutes;
    let speedKmh = speed;
    let speedMph = speed;

    if (unit === 'km') {
      paceMile = paceMinutes * 1.60934;
      speedMph = speed / 1.60934;
      speedKmh = speed;
    } else {
      paceKm = paceMinutes / 1.60934;
      speedKmh = speed * 1.60934;
      speedMph = speed;
    }

    const paceKmMin = Math.floor(paceKm);
    const paceKmSec = Math.round((paceKm - paceKmMin) * 60);
    const paceMileMin = Math.floor(paceMile);
    const paceMileSec = Math.round((paceMile - paceMileMin) * 60);

    setResult({
      paceKm: `${paceKmMin}:${paceKmSec.toString().padStart(2, '0')}`,
      paceMile: `${paceMileMin}:${paceMileSec.toString().padStart(2, '0')}`,
      speedKmh: speedKmh.toFixed(2),
      speedMph: speedMph.toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Pace Calculator" description="Calculate your running or walking pace and speed.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Distance</label>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
            />
            <select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              className="border border-input rounded-[3px] px-3 py-2 text-sm"
            >
              <option value="km">km</option>
              <option value="mi">miles</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold mb-2">Time</label>
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-xs mb-1">Hours</label>
              <input
                type="number"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Minutes</label>
              <input
                type="number"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Seconds</label>
              <input
                type="number"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </div>
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
            {result.error ? (
              <p className="text-destructive">{result.error}</p>
            ) : (
              <div className="space-y-2">
                <p><strong>Pace per km:</strong> {result.paceKm} min/km</p>
                <p><strong>Pace per mile:</strong> {result.paceMile} min/mi</p>
                <p><strong>Speed:</strong> {result.speedKmh} km/h ({result.speedMph} mph)</p>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
