"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function FinanceCalculatorPage() {
  const [calculationType, setCalculationType] = useState('presentValue');
  const [futureValue, setFutureValue] = useState('10000');
  const [presentValue, setPresentValue] = useState('8000');
  const [payment, setPayment] = useState('100');
  const [rate, setRate] = useState('5');
  const [periods, setPeriods] = useState('10');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const fv = parseFloat(futureValue) || 0;
    const pv = parseFloat(presentValue) || 0;
    const pmt = parseFloat(payment) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const n = parseFloat(periods) || 0;

    let calculatedValue = 0;

    switch (calculationType) {
      case 'presentValue':
        // PV = FV / (1 + r)^n
        calculatedValue = fv / Math.pow(1 + r, n);
        break;
      case 'futureValue':
        // FV = PV * (1 + r)^n
        calculatedValue = pv * Math.pow(1 + r, n);
        break;
      case 'payment':
        // PMT = (r * PV) / (1 - (1 + r)^-n)
        if (r === 0) {
          calculatedValue = pv / n;
        } else {
          calculatedValue = (r * pv) / (1 - Math.pow(1 + r, -n));
        }
        break;
      case 'rate':
        // Using approximation for interest rate
        calculatedValue = ((Math.pow(fv / pv, 1 / n) - 1) * 100);
        break;
    }

    setResult({
      value: calculatedValue.toFixed(2),
      type: calculationType,
      inputPV: pv,
      inputFV: fv,
      inputPMT: pmt,
      inputRate: r,
      inputPeriods: n
    });
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

  const getChartData = () => {
    if (!result) return [];

    switch (result.type) {
      case 'presentValue':
        return [
          { name: 'Present Value', value: parseFloat(result.value), color: '#6366f1' },
          { name: 'Interest to Earn', value: result.inputFV - parseFloat(result.value), color: '#10b981' }
        ];
      case 'futureValue':
        return [
          { name: 'Present Value', value: result.inputPV, color: '#6366f1' },
          { name: 'Interest Earned', value: parseFloat(result.value) - result.inputPV, color: '#10b981' }
        ];
      case 'payment':
        const totalPayments = parseFloat(result.value) * result.inputPeriods;
        return [
          { name: 'Principal', value: result.inputPV, color: '#6366f1' },
          { name: 'Interest', value: totalPayments - result.inputPV, color: '#ef4444' }
        ];
      default:
        return [];
    }
  };

  return (
    <CalculatorLayout title="Finance Calculator" description="Calculate present value, future value, payment, or interest rate with interactive visualizations.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Finance Calculation</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Calculate</label>
                <select
                  value={calculationType}
                  onChange={(e) => setCalculationType(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                >
                  <option value="presentValue">Present Value</option>
                  <option value="futureValue">Future Value</option>
                  <option value="payment">Payment</option>
                  <option value="rate">Interest Rate</option>
                </select>
              </div>

              {calculationType !== 'presentValue' && (
                <div>
                  <label className="block text-sm font-bold mb-1">Present Value</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={presentValue}
                      onChange={(e) => setPresentValue(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}

              {calculationType !== 'futureValue' && (
                <div>
                  <label className="block text-sm font-bold mb-1">Future Value</label>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">$</span>
                    <input
                      type="number"
                      value={futureValue}
                      onChange={(e) => setFutureValue(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                  </div>
                </div>
              )}

              {calculationType !== 'rate' && (
                <div>
                  <label className="block text-sm font-bold mb-1">Interest Rate (% per period)</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(e.target.value)}
                      className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-bold mb-1">Number of Periods</label>
                <input
                  type="number"
                  value={periods}
                  onChange={(e) => setPeriods(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
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
                <h3 className="font-bold text-lg mb-4 text-accent">
                  {result.type === 'presentValue' && 'Present Value'}
                  {result.type === 'futureValue' && 'Future Value'}
                  {result.type === 'payment' && 'Payment per Period'}
                  {result.type === 'rate' && 'Interest Rate'}
                </h3>
                <div className="text-4xl font-bold text-foreground mb-2">
                  {result.type === 'rate' 
                    ? `${result.value}%`
                    : formatCurrency(result.value)
                  }
                </div>
              </div>

              {/* Visualization Chart */}
              {result.type !== 'rate' && getChartData().length > 0 && (
                <div className="bg-card p-4 rounded-[3px] border border-border">
                  <h3 className="font-bold text-base mb-3">Breakdown</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getChartData()}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {getChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value as number)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                    {getChartData().map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }}></div>
                        <span>{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Calculation Details</h3>
                <div className="space-y-2 text-sm">
                  {result.type === 'presentValue' && (
                    <>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Future Value:</span>
                        <span className="font-semibold">{formatCurrency(result.inputFV)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Interest Rate:</span>
                        <span className="font-semibold">{(result.inputRate * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Periods:</span>
                        <span className="font-semibold">{result.inputPeriods}</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-border">
                        <span className="text-muted-foreground font-bold">Present Value:</span>
                        <span className="font-bold">{formatCurrency(result.value)}</span>
                      </div>
                    </>
                  )}
                  {result.type === 'futureValue' && (
                    <>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Present Value:</span>
                        <span className="font-semibold">{formatCurrency(result.inputPV)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Interest Rate:</span>
                        <span className="font-semibold">{(result.inputRate * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Periods:</span>
                        <span className="font-semibold">{result.inputPeriods}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Interest Earned:</span>
                        <span className="font-semibold text-[#10b981]">{formatCurrency(parseFloat(result.value) - result.inputPV)}</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-border">
                        <span className="text-muted-foreground font-bold">Future Value:</span>
                        <span className="font-bold">{formatCurrency(result.value)}</span>
                      </div>
                    </>
                  )}
                  {result.type === 'payment' && (
                    <>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Present Value:</span>
                        <span className="font-semibold">{formatCurrency(result.inputPV)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Interest Rate:</span>
                        <span className="font-semibold">{(result.inputRate * 100).toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Periods:</span>
                        <span className="font-semibold">{result.inputPeriods}</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-border">
                        <span className="text-muted-foreground font-bold">Payment:</span>
                        <span className="font-bold">{formatCurrency(result.value)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Total Paid:</span>
                        <span className="font-semibold">{formatCurrency(parseFloat(result.value) * result.inputPeriods)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Total Interest:</span>
                        <span className="font-semibold text-destructive">{formatCurrency((parseFloat(result.value) * result.inputPeriods) - result.inputPV)}</span>
                      </div>
                    </>
                  )}
                  {result.type === 'rate' && (
                    <>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Present Value:</span>
                        <span className="font-semibold">{formatCurrency(result.inputPV)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Future Value:</span>
                        <span className="font-semibold">{formatCurrency(result.inputFV)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Periods:</span>
                        <span className="font-semibold">{result.inputPeriods}</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-border">
                        <span className="text-muted-foreground font-bold">Interest Rate:</span>
                        <span className="font-bold">{result.value}%</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter calculation details and click Calculate to see your results</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}