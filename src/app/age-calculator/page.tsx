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

    const diffMs = current.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const totalSeconds = Math.floor(diffMs / 1000);

    const nextBirthday = new Date(current.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= current) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));

    const dayOfWeekBorn = birth.toLocaleDateString('en-US', { weekday: 'long' });

    setResult({
      years,
      months,
      days,
      totalDays,
      totalMonths,
      totalWeeks,
      totalHours,
      totalMinutes,
      totalSeconds,
      daysUntilBirthday,
      dayOfWeekBorn,
      nextBirthdayDate: nextBirthday.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    });
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <CalculatorLayout title="Age Calculator" description="Calculate your exact age in years, months, weeks, days, hours, minutes, and seconds.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Enter Dates</h3>
            <div className="space-y-3">
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
                <label className="block text-sm font-bold mb-1">Age at the Date of</label>
                <input
                  type="date"
                  value={currentDate}
                  onChange={(e) => setCurrentDate(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
          <button
            onClick={calculate}
            className="w-full bg-[#5f8d4e] text-white px-6 py-3 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
          >
            Calculate
          </button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-[#4a7c9e] text-white p-5 rounded-[3px]">
                <div className="text-center">
                  <div className="text-sm mb-2 opacity-90">Age</div>
                  <div className="text-4xl font-bold mb-1">
                    {result.years} years, {result.months} months, {result.days} days
                  </div>
                  <div className="text-sm opacity-90 mt-2">
                    or {formatNumber(result.totalMonths)} months, or {formatNumber(result.totalWeeks)} weeks, or {formatNumber(result.totalDays)} days
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Age in Different Units</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#4a7c9e] text-white">
                      <tr>
                        <th className="text-left p-2 font-bold">Unit</th>
                        <th className="text-right p-2 font-bold">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2">Years</td>
                        <td className="p-2 text-right font-semibold">{result.years}</td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2">Months</td>
                        <td className="p-2 text-right font-semibold">{formatNumber(result.totalMonths)}</td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2">Weeks</td>
                        <td className="p-2 text-right font-semibold">{formatNumber(result.totalWeeks)}</td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2">Days</td>
                        <td className="p-2 text-right font-semibold">{formatNumber(result.totalDays)}</td>
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

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Birthday Info</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Day of Week Born</span>
                    <span className="font-semibold">{result.dayOfWeekBorn}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Next Birthday</span>
                    <span className="font-semibold">{result.nextBirthdayDate}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Days Until Next Birthday</span>
                    <span className="font-semibold text-[#5f8d4e]">{result.daysUntilBirthday} days</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your date of birth and click Calculate to see your age</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
