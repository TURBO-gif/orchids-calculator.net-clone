"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function Calculator401kPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [currentBalance, setCurrentBalance] = useState('50000');
  const [annualSalary, setAnnualSalary] = useState('75000');
  const [contributionPercent, setContributionPercent] = useState('10');
  const [employerMatch, setEmployerMatch] = useState('50');
  const [employerMatchLimit, setEmployerMatchLimit] = useState('6');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [salaryIncrease, setSalaryIncrease] = useState('3');
  const [result, setResult] = useState<any>(null);

  const IRS_LIMIT_2024 = 23000;
  const IRS_CATCHUP_2024 = 7500;
  const CATCHUP_AGE = 50;

  const calculate = () => {
    const age = parseInt(currentAge) || 30;
    const retAge = parseInt(retirementAge) || 65;
    const balance = parseFloat(currentBalance) || 0;
    const salary = parseFloat(annualSalary) || 0;
    const contribPct = (parseFloat(contributionPercent) || 0) / 100;
    const matchPct = (parseFloat(employerMatch) || 0) / 100;
    const matchLimitPct = (parseFloat(employerMatchLimit) || 0) / 100;
    const returnRate = (parseFloat(annualReturn) || 0) / 100;
    const salaryGrowth = (parseFloat(salaryIncrease) || 0) / 100;

    const yearsToRetirement = retAge - age;
    let currentBal = balance;
    let currentSalary = salary;
    const schedule = [];
    let totalContributions = balance;
    let totalEmployerMatch = 0;
    let totalGrowth = 0;

    for (let year = 1; year <= yearsToRetirement; year++) {
      const currentYear = age + year;
      const irsLimit = currentYear >= CATCHUP_AGE ? IRS_LIMIT_2024 + IRS_CATCHUP_2024 : IRS_LIMIT_2024;
      
      let employeeContrib = currentSalary * contribPct;
      if (employeeContrib > irsLimit) {
        employeeContrib = irsLimit;
      }
      
      const matchableContrib = Math.min(currentSalary * matchLimitPct, employeeContrib);
      const employerContrib = matchableContrib * matchPct;
      
      const totalAnnualContrib = employeeContrib + employerContrib;
      const growth = currentBal * returnRate;
      
      currentBal = currentBal + totalAnnualContrib + growth;
      totalContributions += employeeContrib;
      totalEmployerMatch += employerContrib;
      totalGrowth += growth;

      schedule.push({
        year,
        age: currentYear,
        salary: currentSalary,
        employeeContrib,
        employerContrib,
        growth,
        balance: currentBal,
      });

      currentSalary *= (1 + salaryGrowth);
    }

    const monthlyWithdrawal4Percent = (currentBal * 0.04) / 12;
    
    const optimalContribPct = matchLimitPct * 100;

    setResult({
      finalBalance: currentBal,
      totalContributions,
      totalEmployerMatch,
      totalGrowth,
      monthlyWithdrawal4Percent,
      yearsToRetirement,
      schedule,
      optimalContribPct,
      currentContribPct: contribPct * 100,
      isMaxingMatch: contribPct >= matchLimitPct,
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const chartData = result?.schedule.filter((_: any, i: number) => i % 5 === 0 || i === result.schedule.length - 1) || [];

  const breakdownData = result ? [
    { name: 'Your Contributions', value: result.totalContributions, color: '#6366f1' },
    { name: 'Employer Match', value: result.totalEmployerMatch, color: '#10b981' },
    { name: 'Investment Growth', value: result.totalGrowth, color: '#f59e0b' },
  ] : [];

  return (
    <CalculatorLayout title="401(k) Calculator" description="Plan your retirement savings and estimate your 401(k) balance with employer matching contributions.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Personal Information</h3>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-bold mb-1">Current Age</label>
                <input
                  type="number"
                  value={currentAge}
                  onChange={(e) => setCurrentAge(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Retirement Age</label>
                <input
                  type="number"
                  value={retirementAge}
                  onChange={(e) => setRetirementAge(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="mt-3">
              <label className="block text-sm font-bold mb-1">Current 401(k) Balance</label>
              <div className="flex items-center gap-2">
                <span className="text-sm">$</span>
                <input
                  type="number"
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(e.target.value)}
                  className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Salary & Contribution</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Annual Salary</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={annualSalary}
                    onChange={(e) => setAnnualSalary(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Your Contribution (%)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={contributionPercent}
                    onChange={(e) => setContributionPercent(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Expected Salary Increase (%/year)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={salaryIncrease}
                    onChange={(e) => setSalaryIncrease(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Employer Match</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Employer Match (%)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="10"
                    value={employerMatch}
                    onChange={(e) => setEmployerMatch(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">e.g., 50% means employer matches 50 cents per dollar</p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Match Limit (% of salary)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="1"
                    value={employerMatchLimit}
                    onChange={(e) => setEmployerMatchLimit(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">Employer matches up to this % of your salary</p>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Expected Annual Return</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.5"
                    value={annualReturn}
                    onChange={(e) => setAnnualReturn(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={calculate}
            className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold"
          >
            Calculate
          </button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">401(k) Balance at Retirement</h3>
                <div className="text-4xl font-bold text-foreground mb-3">
                  {formatCurrency(result.finalBalance)}
                </div>
                <div className="text-sm text-muted-foreground">
                  After {result.yearsToRetirement} years (at age {parseInt(retirementAge)})
                </div>
              </div>

              {!result.isMaxingMatch && (
                <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-[3px] border border-amber-200 dark:border-amber-800">
                  <h4 className="font-bold text-sm mb-2 text-amber-800 dark:text-amber-200">Maximize Your Match!</h4>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    You&apos;re contributing {result.currentContribPct}% but your employer matches up to {result.optimalContribPct}%. 
                    Consider increasing your contribution to at least {result.optimalContribPct}% to get the full employer match - it&apos;s free money!
                  </p>
                </div>
              )}

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Monthly Retirement Income</h3>
                <div className="p-3 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-800">
                  <div className="text-sm text-muted-foreground mb-1">Using 4% Safe Withdrawal Rule</div>
                  <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                    {formatCurrency(result.monthlyWithdrawal4Percent)}/month
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Balance Breakdown</h3>
                <div className="space-y-2">
                  {breakdownData.map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{formatCurrency(item.value)}</div>
                        <div className="text-xs text-muted-foreground">
                          {((item.value / result.finalBalance) * 100).toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Balance Growth Over Time</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                      <XAxis 
                        dataKey="age" 
                        tick={{ fontSize: 11 }} 
                        tickFormatter={(v) => `${v}`}
                      />
                      <YAxis 
                        tick={{ fontSize: 11 }} 
                        tickFormatter={(v) => `$${(v/1000000).toFixed(1)}M`}
                      />
                      <Tooltip 
                        formatter={(value: number) => formatCurrency(value)}
                        labelFormatter={(label) => `Age ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="balance" 
                        name="Balance" 
                        stroke="#6366f1" 
                        fill="#6366f133"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-[3px] border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-sm mb-2 text-blue-800 dark:text-blue-200">2024 IRS Contribution Limits</h4>
                <ul className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Under 50: ${IRS_LIMIT_2024.toLocaleString()} annual limit</li>
                  <li>• 50 and older: ${(IRS_LIMIT_2024 + IRS_CATCHUP_2024).toLocaleString()} (includes ${IRS_CATCHUP_2024.toLocaleString()} catch-up)</li>
                </ul>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your information and click Calculate to see your projected 401(k) balance at retirement.</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
