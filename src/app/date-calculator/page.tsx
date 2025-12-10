"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function DateCalculatorPage() {
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [daysToAdd, setDaysToAdd] = useState('30');
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [excludeWeekends, setExcludeWeekends] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [addResult, setAddResult] = useState<any>(null);

  const calculateDifference = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const diffMs = end.getTime() - start.getTime();
    let totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (includeEndDay) totalDays += 1;

    let businessDays = 0;
    const tempDate = new Date(start);
    while (tempDate <= end) {
      const dayOfWeek = tempDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        businessDays++;
      }
      tempDate.setDate(tempDate.getDate() + 1);
    }
    if (!includeEndDay) businessDays = Math.max(0, businessDays - 1);

    const displayDays = excludeWeekends ? businessDays : totalDays;

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const totalWeeks = Math.floor(totalDays / 7);
    const remainingDays = totalDays % 7;
    const totalHours = Math.floor(Math.abs(diffMs) / (1000 * 60 * 60));
    const totalMinutes = Math.floor(Math.abs(diffMs) / (1000 * 60));
    const totalSeconds = Math.floor(Math.abs(diffMs) / 1000);

    const startDayName = start.toLocaleDateString('en-US', { weekday: 'long' });
    const endDayName = end.toLocaleDateString('en-US', { weekday: 'long' });

    setResult({
      years,
      months,
      days,
      totalDays: displayDays,
      totalWeeks,
      remainingDays,
      businessDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      startDayName,
      endDayName,
      isNegative: diffMs < 0
    });
  };

  const calculateAddDays = () => {
    const start = new Date(startDate);
    let daysToAddNum = parseInt(daysToAdd) || 0;
    const isSubtract = daysToAddNum < 0;
    daysToAddNum = Math.abs(daysToAddNum);

    let newDate = new Date(start);
    
    if (excludeWeekends) {
      let addedDays = 0;
      const direction = isSubtract ? -1 : 1;
      while (addedDays < daysToAddNum) {
        newDate.setDate(newDate.getDate() + direction);
        const dayOfWeek = newDate.getDay();
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
          addedDays++;
        }
      }
    } else {
      newDate = new Date(start.getTime() + (isSubtract ? -1 : 1) * daysToAddNum * 24 * 60 * 60 * 1000);
    }
    
    setAddResult({
      newDate: newDate.toISOString().split('T')[0],
      dateString: newDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      dayOfWeek: newDate.toLocaleDateString('en-US', { weekday: 'long' })
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <CalculatorLayout title="Date Calculator" description="Calculate the difference between dates, add or subtract days, and find business days.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Date Difference Calculator</h3>
            <div className="space-y-3">
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
              <div className="flex flex-col gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={includeEndDay}
                    onChange={(e) => setIncludeEndDay(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Include end day in calculation
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={excludeWeekends}
                    onChange={(e) => setExcludeWeekends(e.target.checked)}
                    className="w-4 h-4"
                  />
                  Exclude weekends (business days only)
                </label>
              </div>
              <button
                onClick={calculateDifference}
                className="w-full bg-[#5f8d4e] text-white px-6 py-2 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
              >
                Calculate Difference
              </button>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Add/Subtract Days</h3>
            <div className="space-y-3">
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
                <label className="block text-sm font-bold mb-1">Days to Add/Subtract</label>
                <input
                  type="number"
                  value={daysToAdd}
                  onChange={(e) => setDaysToAdd(e.target.value)}
                  placeholder="Use negative for subtraction"
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">Use negative number to subtract days</p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={excludeWeekends}
                  onChange={(e) => setExcludeWeekends(e.target.checked)}
                  className="w-4 h-4"
                />
                Skip weekends (add business days only)
              </label>
              <button
                onClick={calculateAddDays}
                className="w-full bg-[#5f8d4e] text-white px-6 py-2 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
              >
                Calculate Date
              </button>
            </div>
          </div>
        </div>

        {result && (
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Date Difference Results</h3>
            <div className="bg-[#4a7c9e] text-white p-4 rounded-[3px] mb-4">
              <div className="text-center">
                <div className="text-sm mb-1 opacity-90">From {result.startDayName} to {result.endDayName}</div>
                <div className="text-3xl font-bold">
                  {result.isNegative && '-'}{result.years > 0 && `${result.years} year${result.years > 1 ? 's' : ''}, `}
                  {result.months > 0 && `${result.months} month${result.months > 1 ? 's' : ''}, `}
                  {result.days} day{result.days !== 1 ? 's' : ''}
                </div>
                <div className="text-sm opacity-90 mt-1">
                  or {formatNumber(result.totalDays)} days {excludeWeekends ? '(business days)' : ''}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-muted rounded-[3px] text-center">
                <div className="text-2xl font-bold">{formatNumber(result.totalDays)}</div>
                <div className="text-xs text-muted-foreground">Total Days</div>
              </div>
              <div className="p-3 bg-muted rounded-[3px] text-center">
                <div className="text-2xl font-bold">{result.totalWeeks}</div>
                <div className="text-xs text-muted-foreground">Weeks</div>
              </div>
              <div className="p-3 bg-muted rounded-[3px] text-center">
                <div className="text-2xl font-bold">{result.businessDays}</div>
                <div className="text-xs text-muted-foreground">Business Days</div>
              </div>
              <div className="p-3 bg-muted rounded-[3px] text-center">
                <div className="text-2xl font-bold">{formatNumber(result.totalHours)}</div>
                <div className="text-xs text-muted-foreground">Hours</div>
              </div>
            </div>

            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#4a7c9e] text-white">
                  <tr>
                    <th className="text-left p-2 font-bold">Unit</th>
                    <th className="text-right p-2 font-bold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="p-2">Years, Months, Days</td>
                    <td className="p-2 text-right font-semibold">{result.years}y {result.months}m {result.days}d</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="p-2">Total Days</td>
                    <td className="p-2 text-right font-semibold">{formatNumber(result.totalDays)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="p-2">Weeks and Days</td>
                    <td className="p-2 text-right font-semibold">{result.totalWeeks} weeks, {result.remainingDays} days</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="p-2">Business Days (Mon-Fri)</td>
                    <td className="p-2 text-right font-semibold">{formatNumber(result.businessDays)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="p-2">Hours</td>
                    <td className="p-2 text-right font-semibold">{formatNumber(result.totalHours)}</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-muted/50">
                    <td className="p-2">Minutes</td>
                    <td className="p-2 text-right font-semibold">{formatNumber(result.totalMinutes)}</td>
                  </tr>
                  <tr className="hover:bg-muted/50">
                    <td className="p-2">Seconds</td>
                    <td className="p-2 text-right font-semibold">{formatNumber(result.totalSeconds)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {addResult && (
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Add/Subtract Result</h3>
            <div className="bg-[#5f8d4e] text-white p-4 rounded-[3px]">
              <div className="text-center">
                <div className="text-sm mb-1 opacity-90">Result Date</div>
                <div className="text-3xl font-bold">{addResult.dateString}</div>
                <div className="text-sm opacity-90 mt-1">{addResult.newDate}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
