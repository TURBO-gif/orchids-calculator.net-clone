"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface YearlyData {
  age: number;
  year: number;
  balance: number;
  contributions: number;
  interest: number;
}

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState('30');
  const [retirementAge, setRetirementAge] = useState('65');
  const [lifeExpectancy, setLifeExpectancy] = useState('90');
  const [currentSavings, setCurrentSavings] = useState('50000');
  const [monthlyContribution, setMonthlyContribution] = useState('500');
  const [annualReturn, setAnnualReturn] = useState('7');
  const [postRetirementReturn, setPostRetirementReturn] = useState('4');
  const [inflationRate, setInflationRate] = useState('2.5');
  const [socialSecurity, setSocialSecurity] = useState('2000');
  const [result, setResult] = useState<any>(null);
  const [yearlyData, setYearlyData] = useState<YearlyData[]>([]);

  const calculate = () => {
    const age = parseFloat(currentAge) || 0;
    const retAge = parseFloat(retirementAge) || 65;
    const endAge = parseFloat(lifeExpectancy) || 90;
    const yearsToRetirement = retAge - age;
    const retirementYears = endAge - retAge;
    const savings = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = (parseFloat(annualReturn) || 0) / 100;
    const postRate = (parseFloat(postRetirementReturn) || 0) / 100;
    const inflation = (parseFloat(inflationRate) || 0) / 100;
    const ss = parseFloat(socialSecurity) || 0;

    const monthlyRate = rate / 12;
    const months = yearsToRetirement * 12;

    let balance = savings;
    let totalContributions = savings;
    const data: YearlyData[] = [];
    const currentYear = new Date().getFullYear();

    for (let year = 0; year <= yearsToRetirement; year++) {
      if (year > 0) {
        for (let m = 0; m < 12; m++) {
          balance = balance * (1 + monthlyRate) + monthly;
        }
        totalContributions += monthly * 12;
      }
      data.push({
        age: age + year,
        year: currentYear + year,
        balance: balance,
        contributions: totalContributions,
        interest: balance - totalContributions
      });
    }

    const savingsAtRetirement = balance;
    const totalInterestEarned = savingsAtRetirement - totalContributions;

    const monthlyPostRate = postRate / 12;
    const retirementMonths = retirementYears * 12;
    const monthlyWithdrawal = savingsAtRetirement > 0 && retirementMonths > 0
      ? (savingsAtRetirement * monthlyPostRate) / (1 - Math.pow(1 + monthlyPostRate, -retirementMonths))
      : 0;

    const inflationAdjustedWithdrawal = monthlyWithdrawal / Math.pow(1 + inflation, yearsToRetirement);
    const totalWithSocialSecurity = monthlyWithdrawal + ss;

    const safeWithdrawalRate = 0.04;
    const safeMonthlyWithdrawal = (savingsAtRetirement * safeWithdrawalRate) / 12;

    let savingsLastsYears = 0;
    let tempBalance = savingsAtRetirement;
    while (tempBalance > 0 && savingsLastsYears < 100) {
      tempBalance = tempBalance * (1 + postRate) - (monthlyWithdrawal * 12);
      savingsLastsYears++;
    }

    setResult({
      savingsAtRetirement,
      totalContributions,
      totalInterestEarned,
      yearsToRetirement,
      monthlyWithdrawal,
      inflationAdjustedWithdrawal,
      totalWithSocialSecurity,
      safeMonthlyWithdrawal,
      savingsLastsYears,
      retirementYears,
      annualWithdrawal: monthlyWithdrawal * 12
    });

    setYearlyData(data);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <CalculatorLayout title="Retirement Calculator" description="Plan your retirement with projections for savings, monthly withdrawals, and longevity estimates.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Personal Information</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-3">
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
                <div>
                  <label className="block text-sm font-bold mb-1">Life Expectancy</label>
                  <input
                    type="number"
                    value={lifeExpectancy}
                    onChange={(e) => setLifeExpectancy(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Savings & Contributions</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Current Retirement Savings</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Monthly Contribution</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Expected Social Security (monthly)</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={socialSecurity}
                    onChange={(e) => setSocialSecurity(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Rate Assumptions</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-bold mb-1">Pre-Retirement Return</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Post-Retirement Return</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={postRetirementReturn}
                      onChange={(e) => setPostRetirementReturn(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Inflation Rate</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.1"
                    value={inflationRate}
                    onChange={(e) => setInflationRate(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
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
                  <div className="text-sm mb-1 opacity-90">Savings at Retirement (Age {retirementAge})</div>
                  <div className="text-4xl font-bold">{formatCurrency(result.savingsAtRetirement)}</div>
                  <div className="text-sm opacity-90 mt-1">{result.yearsToRetirement} years to retirement</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#5f8d4e] text-white p-4 rounded-[3px]">
                  <div className="text-center">
                    <div className="text-xs mb-1 opacity-90">Monthly Withdrawal</div>
                    <div className="text-2xl font-bold">{formatCurrency(result.monthlyWithdrawal)}</div>
                    <div className="text-xs opacity-90 mt-1">for {result.retirementYears} years</div>
                  </div>
                </div>
                <div className="bg-[#6a5acd] text-white p-4 rounded-[3px]">
                  <div className="text-center">
                    <div className="text-xs mb-1 opacity-90">With Social Security</div>
                    <div className="text-2xl font-bold">{formatCurrency(result.totalWithSocialSecurity)}</div>
                    <div className="text-xs opacity-90 mt-1">total monthly income</div>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Retirement Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Total Contributions</span>
                    <span className="font-semibold">{formatCurrency(result.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Interest Earned</span>
                    <span className="font-semibold text-[#2e7d32]">{formatCurrency(result.totalInterestEarned)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Annual Withdrawal</span>
                    <span className="font-semibold">{formatCurrency(result.annualWithdrawal)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Safe Withdrawal (4% rule)</span>
                    <span className="font-semibold">{formatCurrency(result.safeMonthlyWithdrawal)}/mo</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Inflation-Adjusted Value</span>
                    <span className="font-semibold">{formatCurrency(result.inflationAdjustedWithdrawal)}/mo</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Savings Lasts</span>
                    <span className="font-semibold">{Math.min(result.savingsLastsYears, 100)}+ years</span>
                  </div>
                </div>
              </div>

              {yearlyData.length > 0 && (
                <div className="bg-card p-4 rounded-[3px] border border-border">
                  <h3 className="font-bold text-base mb-3">Savings Growth Projection</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={yearlyData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="age" 
                          label={{ value: 'Age', position: 'insideBottom', offset: -5 }}
                          tick={{ fontSize: 11 }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                          tick={{ fontSize: 11 }}
                        />
                        <Tooltip 
                          formatter={(value: number) => formatCurrency(value)}
                          labelFormatter={(label) => `Age ${label}`}
                        />
                        <Legend wrapperStyle={{ paddingTop: '10px' }} />
                        <Area 
                          type="monotone" 
                          dataKey="interest" 
                          stackId="1"
                          stroke="#10b981" 
                          fill="#10b981"
                          name="Interest Earned"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="contributions" 
                          stackId="1"
                          stroke="#6366f1" 
                          fill="#6366f1"
                          name="Contributions"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter your retirement details and click Calculate to see projections</p>
            </div>
          )}
        </div>
      </div>

      {result && yearlyData.length > 0 && (
        <div className="mt-8 bg-card rounded-[3px] border border-border overflow-hidden">
          <h3 className="font-bold text-lg p-4 border-b border-border">Year-by-Year Projection</h3>
          <div className="overflow-x-auto max-h-[400px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#4a7c9e] text-white sticky top-0">
                <tr>
                  <th className="text-left p-3 font-bold">Age</th>
                  <th className="text-left p-3 font-bold">Year</th>
                  <th className="text-right p-3 font-bold">Balance</th>
                  <th className="text-right p-3 font-bold">Contributions</th>
                  <th className="text-right p-3 font-bold">Interest</th>
                </tr>
              </thead>
              <tbody>
                {yearlyData.map((row, index) => (
                  <tr key={index} className={`border-t border-border hover:bg-muted/50 ${row.age === parseInt(retirementAge) ? 'bg-[#e8f5e9]' : ''}`}>
                    <td className="p-3">{row.age}</td>
                    <td className="p-3">{row.year}</td>
                    <td className="p-3 text-right font-semibold">{formatCurrency(row.balance)}</td>
                    <td className="p-3 text-right">{formatCurrency(row.contributions)}</td>
                    <td className="p-3 text-right text-[#2e7d32]">{formatCurrency(row.interest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}
