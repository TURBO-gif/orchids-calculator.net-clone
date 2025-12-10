"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

type CalcMode = 'calculator' | 'duration' | 'expression';

export default function TimeCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>('calculator');
  const [days1, setDays1] = useState('0');
  const [hours1, setHours1] = useState('2');
  const [minutes1, setMinutes1] = useState('30');
  const [seconds1, setSeconds1] = useState('45');
  const [days2, setDays2] = useState('0');
  const [hours2, setHours2] = useState('1');
  const [minutes2, setMinutes2] = useState('15');
  const [seconds2, setSeconds2] = useState('30');
  const [operation, setOperation] = useState('add');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:30');
  const [expression, setExpression] = useState('1d 2h 30m + 45m - 15s');
  const [result, setResult] = useState<any>(null);

  const parseTimeToSeconds = (d: string, h: string, m: string, s: string) => {
    return (parseInt(d) || 0) * 86400 + 
           (parseInt(h) || 0) * 3600 + 
           (parseInt(m) || 0) * 60 + 
           (parseInt(s) || 0);
  };

  const secondsToTime = (totalSeconds: number) => {
    const negative = totalSeconds < 0;
    totalSeconds = Math.abs(totalSeconds);
    
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds, negative };
  };

  const formatTime = (time: ReturnType<typeof secondsToTime>) => {
    const parts = [];
    if (time.days > 0) parts.push(`${time.days}d`);
    if (time.hours > 0 || parts.length > 0) parts.push(`${time.hours}h`);
    if (time.minutes > 0 || parts.length > 0) parts.push(`${time.minutes}m`);
    parts.push(`${time.seconds}s`);
    return (time.negative ? '-' : '') + parts.join(' ');
  };

  const calculateTime = () => {
    const totalSeconds1 = parseTimeToSeconds(days1, hours1, minutes1, seconds1);
    const totalSeconds2 = parseTimeToSeconds(days2, hours2, minutes2, seconds2);

    let resultSeconds = operation === 'add' 
      ? totalSeconds1 + totalSeconds2 
      : totalSeconds1 - totalSeconds2;

    const time = secondsToTime(resultSeconds);

    setResult({
      type: 'calculator',
      ...time,
      totalSeconds: Math.abs(resultSeconds),
      totalMinutes: (Math.abs(resultSeconds) / 60).toFixed(2),
      totalHours: (Math.abs(resultSeconds) / 3600).toFixed(4),
      totalDays: (Math.abs(resultSeconds) / 86400).toFixed(6),
      negative: resultSeconds < 0,
    });
  };

  const calculateDuration = () => {
    const [startHour, startMin] = startTime.split(':').map(Number);
    const [endHour, endMin] = endTime.split(':').map(Number);

    let startSeconds = startHour * 3600 + startMin * 60;
    let endSeconds = endHour * 3600 + endMin * 60;

    let diffSeconds = endSeconds - startSeconds;
    if (diffSeconds < 0) {
      diffSeconds += 86400;
    }

    const time = secondsToTime(diffSeconds);

    setResult({
      type: 'duration',
      ...time,
      totalSeconds: diffSeconds,
      totalMinutes: (diffSeconds / 60).toFixed(2),
      totalHours: (diffSeconds / 3600).toFixed(4),
      decimalHours: (diffSeconds / 3600).toFixed(2),
    });
  };

  const calculateExpression = () => {
    try {
      const regex = /([+-]?\s*\d+(?:\.\d+)?)\s*([dhms])/gi;
      let totalSeconds = 0;
      let match;
      let lastIndex = 0;
      let currentSign = 1;

      const cleanExpr = expression.replace(/\s+/g, '');
      
      const tokens = expression.match(/[+-]?\s*\d+(?:\.\d+)?\s*[dhms]/gi) || [];
      
      for (const token of tokens) {
        const cleanToken = token.replace(/\s/g, '');
        const value = parseFloat(cleanToken);
        const unit = cleanToken.slice(-1).toLowerCase();
        
        let seconds = 0;
        switch (unit) {
          case 'd': seconds = value * 86400; break;
          case 'h': seconds = value * 3600; break;
          case 'm': seconds = value * 60; break;
          case 's': seconds = value; break;
        }
        totalSeconds += seconds;
      }

      const time = secondsToTime(totalSeconds);

      setResult({
        type: 'expression',
        ...time,
        totalSeconds: Math.abs(totalSeconds),
        totalMinutes: (Math.abs(totalSeconds) / 60).toFixed(2),
        totalHours: (Math.abs(totalSeconds) / 3600).toFixed(4),
        negative: totalSeconds < 0,
        expression,
      });
    } catch (e) {
      setResult({ type: 'expression', error: 'Invalid expression format' });
    }
  };

  const handleCalculate = () => {
    switch (mode) {
      case 'calculator':
        calculateTime();
        break;
      case 'duration':
        calculateDuration();
        break;
      case 'expression':
        calculateExpression();
        break;
    }
  };

  return (
    <CalculatorLayout title="Time Calculator" description="Add or subtract time durations, calculate duration between times, or use expression format (e.g., 1d 2h 30m + 45m).">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setMode('calculator')}
                className={`py-2 px-4 rounded-[3px] font-semibold text-sm transition-colors ${
                  mode === 'calculator' ? 'bg-[#4a7c9e] text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Add/Subtract
              </button>
              <button
                onClick={() => setMode('duration')}
                className={`py-2 px-4 rounded-[3px] font-semibold text-sm transition-colors ${
                  mode === 'duration' ? 'bg-[#4a7c9e] text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Duration
              </button>
              <button
                onClick={() => setMode('expression')}
                className={`py-2 px-4 rounded-[3px] font-semibold text-sm transition-colors ${
                  mode === 'expression' ? 'bg-[#4a7c9e] text-white' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                Expression
              </button>
            </div>

            {mode === 'calculator' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">Time 1</label>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-xs mb-1 text-muted-foreground">Days</label>
                      <input
                        type="number"
                        value={days1}
                        onChange={(e) => setDays1(e.target.value)}
                        className="w-full border border-input rounded-[3px] px-2 py-2 text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-muted-foreground">Hours</label>
                      <input
                        type="number"
                        value={hours1}
                        onChange={(e) => setHours1(e.target.value)}
                        className="w-full border border-input rounded-[3px] px-2 py-2 text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-muted-foreground">Minutes</label>
                      <input
                        type="number"
                        value={minutes1}
                        onChange={(e) => setMinutes1(e.target.value)}
                        className="w-full border border-input rounded-[3px] px-2 py-2 text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-muted-foreground">Seconds</label>
                      <input
                        type="number"
                        value={seconds1}
                        onChange={(e) => setSeconds1(e.target.value)}
                        className="w-full border border-input rounded-[3px] px-2 py-2 text-sm text-center"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-1">Operation</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="operation"
                        checked={operation === 'add'}
                        onChange={() => setOperation('add')}
                      />
                      <span className="text-sm">Add (+)</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="operation"
                        checked={operation === 'subtract'}
                        onChange={() => setOperation('subtract')}
                      />
                      <span className="text-sm">Subtract (-)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Time 2</label>
                  <div className="grid grid-cols-4 gap-2">
                    <div>
                      <label className="block text-xs mb-1 text-muted-foreground">Days</label>
                      <input
                        type="number"
                        value={days2}
                        onChange={(e) => setDays2(e.target.value)}
                        className="w-full border border-input rounded-[3px] px-2 py-2 text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-muted-foreground">Hours</label>
                      <input
                        type="number"
                        value={hours2}
                        onChange={(e) => setHours2(e.target.value)}
                        className="w-full border border-input rounded-[3px] px-2 py-2 text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-muted-foreground">Minutes</label>
                      <input
                        type="number"
                        value={minutes2}
                        onChange={(e) => setMinutes2(e.target.value)}
                        className="w-full border border-input rounded-[3px] px-2 py-2 text-sm text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1 text-muted-foreground">Seconds</label>
                      <input
                        type="number"
                        value={seconds2}
                        onChange={(e) => setSeconds2(e.target.value)}
                        className="w-full border border-input rounded-[3px] px-2 py-2 text-sm text-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mode === 'duration' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Calculate duration between two times:</p>
                <div className="grid grid-cols-2 gap-4">
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
                </div>
                <p className="text-xs text-muted-foreground">If end time is earlier than start time, it assumes the next day.</p>
              </div>
            )}

            {mode === 'expression' && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Enter time expression using d (days), h (hours), m (minutes), s (seconds):</p>
                <div>
                  <label className="block text-sm font-bold mb-1">Expression</label>
                  <input
                    type="text"
                    value={expression}
                    onChange={(e) => setExpression(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm font-mono"
                    placeholder="e.g., 1d 2h 30m + 45m - 15s"
                  />
                </div>
                <div className="text-xs text-muted-foreground">
                  <p><strong>Examples:</strong></p>
                  <ul className="list-disc list-inside space-y-1 mt-1">
                    <li>1d 2h 3m 4s + 4h 5s - 30m</li>
                    <li>2h 30m + 1h 45m</li>
                    <li>5d - 36h</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleCalculate}
            className="w-full bg-[#4a7c9e] text-white px-6 py-3 rounded-[3px] hover:bg-[#3d6a89] transition-colors font-bold"
          >
            Calculate
          </button>
        </div>

        <div className="space-y-4">
          {result && !result.error ? (
            <>
              <div className="bg-[#d4edda] p-5 rounded-[3px] border border-[#c3e6cb]">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Result</div>
                  <div className="text-3xl font-bold text-[#155724]">
                    {result.negative && '-'}
                    {result.days > 0 && `${result.days}d `}
                    {result.hours}h {result.minutes}m {result.seconds}s
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Time Breakdown</h3>
                <table className="w-full text-sm">
                  <tbody>
                    {result.days > 0 && (
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="py-2 text-muted-foreground">Days</td>
                        <td className="py-2 text-right font-semibold">{result.days}</td>
                      </tr>
                    )}
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 text-muted-foreground">Hours</td>
                      <td className="py-2 text-right font-semibold">{result.hours}</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 text-muted-foreground">Minutes</td>
                      <td className="py-2 text-right font-semibold">{result.minutes}</td>
                    </tr>
                    <tr className="hover:bg-muted/50">
                      <td className="py-2 text-muted-foreground">Seconds</td>
                      <td className="py-2 text-right font-semibold">{result.seconds}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Total Conversions</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 text-muted-foreground">Total Seconds</td>
                      <td className="py-2 text-right font-semibold">{result.totalSeconds.toLocaleString()}</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 text-muted-foreground">Total Minutes</td>
                      <td className="py-2 text-right font-semibold">{result.totalMinutes}</td>
                    </tr>
                    <tr className="border-b border-border hover:bg-muted/50">
                      <td className="py-2 text-muted-foreground">Total Hours</td>
                      <td className="py-2 text-right font-semibold">{result.totalHours}</td>
                    </tr>
                    {result.totalDays && (
                      <tr className="hover:bg-muted/50">
                        <td className="py-2 text-muted-foreground">Total Days</td>
                        <td className="py-2 text-right font-semibold">{result.totalDays}</td>
                      </tr>
                    )}
                    {result.decimalHours && (
                      <tr className="hover:bg-muted/50">
                        <td className="py-2 text-muted-foreground">Decimal Hours</td>
                        <td className="py-2 text-right font-semibold">{result.decimalHours}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </>
          ) : result?.error ? (
            <div className="bg-red-50 dark:bg-red-950/20 p-4 rounded-[3px] text-red-600">
              {result.error}
            </div>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Select a mode, enter time values, and click Calculate</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
