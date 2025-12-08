"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface YearlyGrowth {
  year: number;
  principal: number;
  interest: number;
  totalValue: number;
}

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState('5000');
  const [monthlyContribution, setMonthlyContribution] = useState('100');
  const [rate, setRate] = useState('7');
  const [time, setTime] = useState('10');
  const [compounding, setCompounding] = useState('monthly');
  const [result, setResult] = useState<any>(null);
  const [yearlyGrowth, setYearlyGrowth] = useState<YearlyGrowth[]>([]);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const pmt = parseFloat(monthlyContribution) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;

    const frequencies: any = {
      annually: 1,
      semiannually: 2,
      quarterly: 4,
      monthly: 12,
      daily: 365
    };

    const n = frequencies[compounding] || 12;
    
    // Future value with compound interest
    const fvPrincipal = p * Math.pow(1 + r / n, n * t);
    
    // Future value of monthly contributions
    const monthlyRate = r / 12;
    const months = t * 12;
    const fvContributions = pmt * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    
    const finalAmount = fvPrincipal + fvContributions;
    const totalContributions = p + (pmt * months);
    const totalInterest = finalAmount - totalContributions;

    setResult({
      finalAmount: finalAmount.toFixed(2),
      totalContributions: totalContributions.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      initialPrincipal: p.toFixed(2)
    });

    // Generate yearly growth data
    const yearlyData: YearlyGrowth[] = [];
    for (let year = 0; year <= t; year++) {
      const yearMonths = year * 12;
      const yearPrincipal = p * Math.pow(1 + r / n, n * year);
      const yearContributions = year > 0 ? pmt * ((Math.pow(1 + monthlyRate, yearMonths) - 1) / monthlyRate) * (1 + monthlyRate) : 0;
      const yearTotal = yearPrincipal + yearContributions;
      const yearTotalContributions = p + (pmt * yearMonths);
      const yearInterest = yearTotal - yearTotalContributions;

      yearlyData.push({
        year,
        principal: yearTotalContributions,
        interest: yearInterest,
        totalValue: yearTotal
      });
    }
    setYearlyGrowth(yearlyData);
  };

  const formatCurrency = (value: string | number) => {
    const num = typeof value === 'string' ? parseFloat(value) : value;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  return (
    <CalculatorLayout title="Compound Interest Calculator" description="Calculate compound interest with regular contributions and visualize your investment growth over time.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Investment Details</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Initial Principal</label>
                <div className="flex items-center gap-2">
                  <span className="text-sm">$</span>
                  <input
                    type="number"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
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
                <label className="block text-sm font-bold mb-1">Annual Interest Rate</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    value={rate}
                    onChange={(e) => setRate(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">%</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Time Period</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm">years</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-1">Compound Frequency</label>
                <select
                  value={compounding}
                  onChange={(e) => setCompounding(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                >
                  <option value="annually">Annually</option>
                  <option value="semiannually">Semi-annually</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="monthly">Monthly</option>
                  <option value="daily">Daily</option>
                </select>
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

        {/* Results Section */}
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-4 text-accent">Final Amount</h3>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {formatCurrency(result.finalAmount)}
                </div>
              </div>

              {/* Breakdown Chart */}
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Investment Breakdown</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Contributions', value: parseFloat(result.totalContributions), color: '#6366f1' },
                          { name: 'Interest Earned', value: parseFloat(result.totalInterest), color: '#10b981' }
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {[
                          { color: '#6366f1' },
                          { color: '#10b981' }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#6366f1]"></div>
                    <span>Contributions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-sm bg-[#10b981]"></div>
                    <span>Interest Earned</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Investment Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Initial Principal:</span>
                    <span className="font-semibold">{formatCurrency(result.initialPrincipal)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Total Contributions:</span>
                    <span className="font-semibold">{formatCurrency(result.totalContributions)}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Interest Earned:</span>
                    <span className="font-semibold text-[#10b981]">{formatCurrency(result.totalInterest)}</span>
                  </div>
                  <div className="flex justify-between py-1 border-t border-border">
                    <span className="text-muted-foreground font-bold">Final Amount:</span>
                    <span className="font-bold">{formatCurrency(result.finalAmount)}</span>
                  </div>
                </div>
              </div>

              {yearlyGrowth.length > 0 && (
                <div className="bg-card p-4 rounded-[3px] border border-border">
                  <h3 className="font-bold text-base mb-3">Investment Growth Chart</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart 
                        data={yearlyGrowth}
                        margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis 
                          dataKey="year" 
                          label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                          tick={{ fontSize: 12 }}
                        />
                        <Tooltip 
                          formatter={(value) => formatCurrency(value as number)}
                          labelFormatter={(label) => `Year ${label}`}
                        />
                        <Legend wrapperStyle={{ paddingTop: '20px' }} />
                        <Line 
                          type="monotone" 
                          dataKey="totalValue" 
                          stroke="#6366f1" 
                          name="Total Value"
                          strokeWidth={2}
                          dot={true}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="principal" 
                          stroke="#94a3b8" 
                          name="Contributions"
                          strokeWidth={2}
                          dot={true}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="interest" 
                          stroke="#10b981" 
                          name="Interest"
                          strokeWidth={2}
                          dot={true}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter investment details and click Calculate to see your results</p>
            </div>
          )}
        </div>
      </div>

      {/* Yearly Growth Table */}
      {result && yearlyGrowth.length > 0 && (
        <div className="mt-8">
          <div className="bg-card rounded-[3px] border border-border overflow-hidden">
            <h3 className="font-bold text-lg p-4 border-b border-border">Year-by-Year Growth</h3>
            
            <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#4a7c9e] text-white sticky top-0">
                  <tr>
                    <th className="text-left p-3 font-bold">Year</th>
                    <th className="text-right p-3 font-bold">Contributions</th>
                    <th className="text-right p-3 font-bold">Interest Earned</th>
                    <th className="text-right p-3 font-bold">Total Value</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyGrowth.map((row, index) => (
                    <tr key={index} className="border-t border-border hover:bg-muted/50">
                      <td className="p-3">{row.year}</td>
                      <td className="p-3 text-right">{formatCurrency(row.principal)}</td>
                      <td className="p-3 text-right">{formatCurrency(row.interest)}</td>
                      <td className="p-3 text-right font-semibold">{formatCurrency(row.totalValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </CalculatorLayout>
  );
}