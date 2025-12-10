"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function SalaryCalculatorPage() {
  const [amount, setAmount] = useState('60000');
  const [period, setPeriod] = useState('year');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [daysPerWeek, setDaysPerWeek] = useState('5');
  const [holidaysPerYear, setHolidaysPerYear] = useState('10');
  const [vacationDays, setVacationDays] = useState('15');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const sal = parseFloat(amount) || 0;
    const hours = parseFloat(hoursPerWeek) || 40;
    const days = parseFloat(daysPerWeek) || 5;
    const holidays = parseFloat(holidaysPerYear) || 0;
    const vacation = parseFloat(vacationDays) || 0;
    
    const weeksPerYear = 52;
    const totalDaysOff = holidays + vacation;
    const adjustedWeeks = weeksPerYear - (totalDaysOff / days);
    const totalWorkHours = hours * adjustedWeeks;
    
    let yearlyAmount = 0;
    let unadjustedYearly = 0;
    
    switch(period) {
      case 'hour':
        unadjustedYearly = sal * hours * weeksPerYear;
        yearlyAmount = sal * totalWorkHours;
        break;
      case 'day':
        unadjustedYearly = sal * days * weeksPerYear;
        yearlyAmount = sal * days * adjustedWeeks;
        break;
      case 'week':
        unadjustedYearly = sal * weeksPerYear;
        yearlyAmount = sal * adjustedWeeks;
        break;
      case 'biweekly':
        unadjustedYearly = sal * 26;
        yearlyAmount = unadjustedYearly;
        break;
      case 'semimonthly':
        unadjustedYearly = sal * 24;
        yearlyAmount = unadjustedYearly;
        break;
      case 'month':
        unadjustedYearly = sal * 12;
        yearlyAmount = unadjustedYearly;
        break;
      case 'year':
        unadjustedYearly = sal;
        yearlyAmount = sal;
        break;
    }
    
    const unadjusted = {
      hourly: unadjustedYearly / (hours * weeksPerYear),
      daily: unadjustedYearly / (days * weeksPerYear),
      weekly: unadjustedYearly / weeksPerYear,
      biweekly: unadjustedYearly / 26,
      semimonthly: unadjustedYearly / 24,
      monthly: unadjustedYearly / 12,
      yearly: unadjustedYearly
    };

    const adjusted = {
      hourly: yearlyAmount / totalWorkHours,
      daily: yearlyAmount / (days * adjustedWeeks),
      weekly: yearlyAmount / adjustedWeeks,
      biweekly: yearlyAmount / (adjustedWeeks / 2),
      semimonthly: yearlyAmount / 24,
      monthly: yearlyAmount / 12,
      yearly: yearlyAmount
    };

    setResult({
      unadjusted,
      adjusted,
      workDaysPerYear: Math.round(days * adjustedWeeks),
      workHoursPerYear: Math.round(totalWorkHours),
      totalDaysOff
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  return (
    <CalculatorLayout title="Salary Calculator" description="Convert salary between hourly, daily, weekly, bi-weekly, semi-monthly, monthly, and annual amounts with vacation and holiday adjustments.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Salary Information</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Salary Amount</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">per</span>
                  <select
                    value={period}
                    onChange={(e) => setPeriod(e.target.value)}
                    className="border border-input rounded-[3px] px-3 py-2 text-sm"
                  >
                    <option value="hour">Hour</option>
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="biweekly">Bi-Weekly</option>
                    <option value="semimonthly">Semi-Monthly</option>
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-1">Hours per Week</label>
                  <input
                    type="number"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Days per Week</label>
                  <input
                    type="number"
                    value={daysPerWeek}
                    onChange={(e) => setDaysPerWeek(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-1">Holidays per Year</label>
                  <input
                    type="number"
                    value={holidaysPerYear}
                    onChange={(e) => setHolidaysPerYear(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Vacation Days</label>
                  <input
                    type="number"
                    value={vacationDays}
                    onChange={(e) => setVacationDays(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
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
                  <div className="text-sm mb-1 opacity-90">Annual Salary (Adjusted)</div>
                  <div className="text-4xl font-bold">{formatCurrency(result.adjusted.yearly)}</div>
                  <div className="text-sm opacity-90 mt-1">
                    {result.workDaysPerYear} work days · {result.workHoursPerYear.toLocaleString()} work hours
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Salary Conversions</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-[#4a7c9e] text-white">
                      <tr>
                        <th className="text-left p-2 font-bold">Period</th>
                        <th className="text-right p-2 font-bold">Unadjusted</th>
                        <th className="text-right p-2 font-bold">Holidays & Vacation Adjusted</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2 font-semibold">Hourly</td>
                        <td className="p-2 text-right">{formatCurrency(result.unadjusted.hourly)}</td>
                        <td className="p-2 text-right font-semibold text-[#2e7d32]">{formatCurrency(result.adjusted.hourly)}</td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2 font-semibold">Daily</td>
                        <td className="p-2 text-right">{formatCurrency(result.unadjusted.daily)}</td>
                        <td className="p-2 text-right font-semibold text-[#2e7d32]">{formatCurrency(result.adjusted.daily)}</td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2 font-semibold">Weekly</td>
                        <td className="p-2 text-right">{formatCurrency(result.unadjusted.weekly)}</td>
                        <td className="p-2 text-right font-semibold text-[#2e7d32]">{formatCurrency(result.adjusted.weekly)}</td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2 font-semibold">Bi-Weekly</td>
                        <td className="p-2 text-right">{formatCurrency(result.unadjusted.biweekly)}</td>
                        <td className="p-2 text-right font-semibold text-[#2e7d32]">{formatCurrency(result.adjusted.biweekly)}</td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2 font-semibold">Semi-Monthly</td>
                        <td className="p-2 text-right">{formatCurrency(result.unadjusted.semimonthly)}</td>
                        <td className="p-2 text-right font-semibold text-[#2e7d32]">{formatCurrency(result.adjusted.semimonthly)}</td>
                      </tr>
                      <tr className="border-b border-border hover:bg-muted/50">
                        <td className="p-2 font-semibold">Monthly</td>
                        <td className="p-2 text-right">{formatCurrency(result.unadjusted.monthly)}</td>
                        <td className="p-2 text-right font-semibold text-[#2e7d32]">{formatCurrency(result.adjusted.monthly)}</td>
                      </tr>
                      <tr className="hover:bg-muted/50 bg-[#e8f5e9]">
                        <td className="p-2 font-bold">Annual</td>
                        <td className="p-2 text-right font-bold">{formatCurrency(result.unadjusted.yearly)}</td>
                        <td className="p-2 text-right font-bold text-[#2e7d32]">{formatCurrency(result.adjusted.yearly)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Work Schedule Summary</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-muted rounded-[3px]">
                    <div className="text-xl font-bold">{result.workDaysPerYear}</div>
                    <div className="text-xs text-muted-foreground">Work Days per Year</div>
                  </div>
                  <div className="p-3 bg-muted rounded-[3px]">
                    <div className="text-xl font-bold">{result.workHoursPerYear.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Work Hours per Year</div>
                  </div>
                  <div className="p-3 bg-muted rounded-[3px]">
                    <div className="text-xl font-bold">{result.totalDaysOff}</div>
                    <div className="text-xs text-muted-foreground">Total Days Off</div>
                  </div>
                  <div className="p-3 bg-muted rounded-[3px]">
                    <div className="text-xl font-bold">{hoursPerWeek}</div>
                    <div className="text-xs text-muted-foreground">Hours per Week</div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your salary details and click Calculate to see conversions</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
