"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';

type CalculationMode = 'endAmount' | 'additionalContribution' | 'returnRate' | 'startingAmount' | 'investmentLength';

export default function InvestmentCalculatorPage() {
  const [mode, setMode] = useState<CalculationMode>('endAmount');
  const [targetAmount, setTargetAmount] = useState('1000000');
  const [startingAmount, setStartingAmount] = useState('20000');
  const [years, setYears] = useState('10');
  const [returnRate, setReturnRate] = useState('6');
  const [additionalContribution, setAdditionalContribution] = useState('1000');
  const [compound, setCompound] = useState('annually');
  const [contributeAt, setContributeAt] = useState<'beginning' | 'end'>('end');
  const [contributePeriod, setContributePeriod] = useState<'month' | 'year'>('month');
  const [result, setResult] = useState<any>(null);
  const [schedule, setSchedule] = useState<any[]>([]);
  const [scheduleView, setScheduleView] = useState<'annual' | 'monthly'>('annual');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const formatNumber = (value: number, decimals: number = 2) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(value);
  };

  const calculate = () => {
    const starting = parseFloat(startingAmount) || 0;
    const target = parseFloat(targetAmount) || 0;
    const time = parseFloat(years) || 0;
    const rate = parseFloat(returnRate) || 0;
    const monthly = parseFloat(additionalContribution) || 0;

    let calculatedResult: any = {};
    let annualSchedule: any[] = [];

    if (mode === 'endAmount') {
      // Calculate End Amount
      const periodsPerYear = contributePeriod === 'month' ? 12 : 1;
      const totalPeriods = time * periodsPerYear;
      const ratePerPeriod = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
      const periods = compound === 'annually' ? time : totalPeriods;

      const fvInitial = starting * Math.pow(1 + ratePerPeriod, periods);
      
      let fvContributions = 0;
      if (monthly > 0) {
        const adjustedRate = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
        const adjustedPeriods = compound === 'annually' ? time : totalPeriods;
        
        if (contributeAt === 'beginning') {
          fvContributions = monthly * ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate) * (1 + adjustedRate);
        } else {
          fvContributions = monthly * ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate);
        }
      }

      const endBalance = fvInitial + fvContributions;
      const totalContributions = monthly * (contributePeriod === 'month' ? 12 : 1) * time;
      const totalInterest = endBalance - starting - totalContributions;

      calculatedResult = {
        endBalance,
        startingAmount: starting,
        totalContributions,
        totalInterest
      };

      // Generate annual schedule
      for (let year = 1; year <= time; year++) {
        const yearStart = year === 1 ? starting : annualSchedule[year - 2].endingBalance;
        const yearlyDeposit = monthly * (contributePeriod === 'month' ? 12 : 1);
        
        const rateForCalc = compound === 'annually' ? rate / 100 : rate / 100 / (contributePeriod === 'month' ? 12 : 1);
        const periodsInYear = compound === 'annually' ? 1 : (contributePeriod === 'month' ? 12 : 1);
        
        let yearEndWithoutDeposit = yearStart * Math.pow(1 + rateForCalc, periodsInYear);
        
        let depositContribution = 0;
        if (monthly > 0) {
          if (contributeAt === 'beginning') {
            depositContribution = monthly * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc) * (1 + rateForCalc);
          } else {
            depositContribution = monthly * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc);
          }
        }
        
        const yearEnd = yearEndWithoutDeposit + depositContribution;
        const interest = yearEnd - yearStart - yearlyDeposit;

        annualSchedule.push({
          year,
          dateRange: `Jan ${2025 + year - 1} - Dec ${2025 + year - 1}`,
          deposit: yearlyDeposit,
          interest,
          endingBalance: yearEnd
        });
      }

    } else if (mode === 'additionalContribution') {
      // Calculate required additional contribution
      const periodsPerYear = contributePeriod === 'month' ? 12 : 1;
      const totalPeriods = time * periodsPerYear;
      const ratePerPeriod = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
      const periods = compound === 'annually' ? time : totalPeriods;

      const fvInitial = starting * Math.pow(1 + ratePerPeriod, periods);
      const remainingAmount = target - fvInitial;

      let requiredContribution = 0;
      if (remainingAmount > 0) {
        const adjustedRate = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
        const adjustedPeriods = compound === 'annually' ? time : totalPeriods;
        
        if (contributeAt === 'beginning') {
          requiredContribution = remainingAmount / (((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate) * (1 + adjustedRate));
        } else {
          requiredContribution = remainingAmount / ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate);
        }
      }

      const totalContributions = requiredContribution * periodsPerYear * time;
      const totalInterest = target - starting - totalContributions;

      calculatedResult = {
        requiredContribution,
        endBalance: target,
        startingAmount: starting,
        totalContributions,
        totalInterest,
        contributionPeriod: contributePeriod === 'month' ? 'month' : 'year'
      };

      // Generate schedule with calculated contribution
      for (let year = 1; year <= time; year++) {
        const yearStart = year === 1 ? starting : annualSchedule[year - 2].endingBalance;
        const yearlyDeposit = requiredContribution * periodsPerYear;
        
        const rateForCalc = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
        const periodsInYear = compound === 'annually' ? 1 : periodsPerYear;
        
        let yearEndWithoutDeposit = yearStart * Math.pow(1 + rateForCalc, periodsInYear);
        
        let depositContribution = 0;
        if (requiredContribution > 0) {
          if (contributeAt === 'beginning') {
            depositContribution = requiredContribution * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc) * (1 + rateForCalc);
          } else {
            depositContribution = requiredContribution * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc);
          }
        }
        
        const yearEnd = yearEndWithoutDeposit + depositContribution;
        const interest = yearEnd - yearStart - yearlyDeposit;

        annualSchedule.push({
          year,
          dateRange: `Jan ${2025 + year - 1} - Dec ${2025 + year - 1}`,
          deposit: yearlyDeposit,
          interest,
          endingBalance: yearEnd
        });
      }

    } else if (mode === 'returnRate') {
      // Calculate required return rate (using iterative approach)
      const periodsPerYear = contributePeriod === 'month' ? 12 : 1;
      const totalPeriods = time * periodsPerYear;
      const yearlyContribution = monthly * periodsPerYear;

      let low = 0, high = 100;
      let requiredRate = 0;
      
      for (let i = 0; i < 100; i++) {
        const mid = (low + high) / 2;
        const ratePerPeriod = compound === 'annually' ? mid / 100 : mid / 100 / periodsPerYear;
        const periods = compound === 'annually' ? time : totalPeriods;
        
        const fvInitial = starting * Math.pow(1 + ratePerPeriod, periods);
        
        let fvContributions = 0;
        if (monthly > 0) {
          const adjustedRate = compound === 'annually' ? mid / 100 : mid / 100 / periodsPerYear;
          const adjustedPeriods = compound === 'annually' ? time : totalPeriods;
          
          if (contributeAt === 'beginning') {
            fvContributions = monthly * ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate) * (1 + adjustedRate);
          } else {
            fvContributions = monthly * ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate);
          }
        }
        
        const endBalance = fvInitial + fvContributions;
        
        if (Math.abs(endBalance - target) < 0.01) {
          requiredRate = mid;
          break;
        }
        
        if (endBalance < target) {
          low = mid;
        } else {
          high = mid;
        }
      }

      const totalContributions = yearlyContribution * time;
      const totalInterest = target - starting - totalContributions;

      calculatedResult = {
        requiredRate,
        endBalance: target,
        startingAmount: starting,
        totalContributions,
        totalInterest
      };

      // Generate schedule with calculated rate
      for (let year = 1; year <= time; year++) {
        const yearStart = year === 1 ? starting : annualSchedule[year - 2].endingBalance;
        const yearlyDeposit = yearlyContribution;
        
        const rateForCalc = compound === 'annually' ? requiredRate / 100 : requiredRate / 100 / periodsPerYear;
        const periodsInYear = compound === 'annually' ? 1 : periodsPerYear;
        
        let yearEndWithoutDeposit = yearStart * Math.pow(1 + rateForCalc, periodsInYear);
        
        let depositContribution = 0;
        if (monthly > 0) {
          if (contributeAt === 'beginning') {
            depositContribution = monthly * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc) * (1 + rateForCalc);
          } else {
            depositContribution = monthly * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc);
          }
        }
        
        const yearEnd = yearEndWithoutDeposit + depositContribution;
        const interest = yearEnd - yearStart - yearlyDeposit;

        annualSchedule.push({
          year,
          dateRange: `Jan ${2025 + year - 1} - Dec ${2025 + year - 1}`,
          deposit: yearlyDeposit,
          interest,
          endingBalance: yearEnd
        });
      }

    } else if (mode === 'startingAmount') {
      // Calculate required starting amount
      const periodsPerYear = contributePeriod === 'month' ? 12 : 1;
      const totalPeriods = time * periodsPerYear;
      const ratePerPeriod = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
      const periods = compound === 'annually' ? time : totalPeriods;

      let fvContributions = 0;
      if (monthly > 0) {
        const adjustedRate = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
        const adjustedPeriods = compound === 'annually' ? time : totalPeriods;
        
        if (contributeAt === 'beginning') {
          fvContributions = monthly * ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate) * (1 + adjustedRate);
        } else {
          fvContributions = monthly * ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate);
        }
      }

      const remainingAmount = target - fvContributions;
      const requiredStarting = remainingAmount / Math.pow(1 + ratePerPeriod, periods);

      const totalContributions = monthly * periodsPerYear * time;
      const totalInterest = target - requiredStarting - totalContributions;

      calculatedResult = {
        requiredStarting,
        endBalance: target,
        totalContributions,
        totalInterest
      };

      // Generate schedule
      for (let year = 1; year <= time; year++) {
        const yearStart = year === 1 ? requiredStarting : annualSchedule[year - 2].endingBalance;
        const yearlyDeposit = monthly * periodsPerYear;
        
        const rateForCalc = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
        const periodsInYear = compound === 'annually' ? 1 : periodsPerYear;
        
        let yearEndWithoutDeposit = yearStart * Math.pow(1 + rateForCalc, periodsInYear);
        
        let depositContribution = 0;
        if (monthly > 0) {
          if (contributeAt === 'beginning') {
            depositContribution = monthly * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc) * (1 + rateForCalc);
          } else {
            depositContribution = monthly * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc);
          }
        }
        
        const yearEnd = yearEndWithoutDeposit + depositContribution;
        const interest = yearEnd - yearStart - yearlyDeposit;

        annualSchedule.push({
          year,
          dateRange: `Jan ${2025 + year - 1} - Dec ${2025 + year - 1}`,
          deposit: yearlyDeposit,
          interest,
          endingBalance: yearEnd
        });
      }

    } else if (mode === 'investmentLength') {
      // Calculate required years
      const periodsPerYear = contributePeriod === 'month' ? 12 : 1;
      const ratePerPeriod = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;

      let requiredYears = 0;
      let currentBalance = starting;
      let year = 0;
      const maxYears = 100;

      while (currentBalance < target && year < maxYears) {
        const periods = compound === 'annually' ? 1 : periodsPerYear;
        currentBalance = currentBalance * Math.pow(1 + ratePerPeriod, periods);
        
        if (monthly > 0) {
          const adjustedRate = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
          const adjustedPeriods = compound === 'annually' ? 1 : periodsPerYear;
          
          let contributionGrowth = 0;
          if (contributeAt === 'beginning') {
            contributionGrowth = monthly * ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate) * (1 + adjustedRate);
          } else {
            contributionGrowth = monthly * ((Math.pow(1 + adjustedRate, adjustedPeriods) - 1) / adjustedRate);
          }
          currentBalance += contributionGrowth;
        }
        
        year++;
      }

      requiredYears = year;
      const totalContributions = monthly * periodsPerYear * requiredYears;
      const totalInterest = target - starting - totalContributions;

      calculatedResult = {
        requiredYears,
        endBalance: target,
        startingAmount: starting,
        totalContributions,
        totalInterest
      };

      // Generate schedule
      for (let y = 1; y <= Math.min(requiredYears, 30); y++) {
        const yearStart = y === 1 ? starting : annualSchedule[y - 2].endingBalance;
        const yearlyDeposit = monthly * periodsPerYear;
        
        const rateForCalc = compound === 'annually' ? rate / 100 : rate / 100 / periodsPerYear;
        const periodsInYear = compound === 'annually' ? 1 : periodsPerYear;
        
        let yearEndWithoutDeposit = yearStart * Math.pow(1 + rateForCalc, periodsInYear);
        
        let depositContribution = 0;
        if (monthly > 0) {
          if (contributeAt === 'beginning') {
            depositContribution = monthly * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc) * (1 + rateForCalc);
          } else {
            depositContribution = monthly * ((Math.pow(1 + rateForCalc, periodsInYear) - 1) / rateForCalc);
          }
        }
        
        const yearEnd = yearEndWithoutDeposit + depositContribution;
        const interest = yearEnd - yearStart - yearlyDeposit;

        annualSchedule.push({
          year: y,
          dateRange: `Jan ${2025 + y - 1} - Dec ${2025 + y - 1}`,
          deposit: yearlyDeposit,
          interest,
          endingBalance: yearEnd
        });
      }
    }

    setResult(calculatedResult);
    setSchedule(annualSchedule);
  };

  const getChartData = () => {
    if (!result) return [];

    const startAmount = mode === 'startingAmount' ? result.requiredStarting : 
                       mode === 'endAmount' ? result.startingAmount :
                       result.startingAmount || 0;

    return [
      { name: 'Starting Amount', value: startAmount, color: '#4a7c9e' },
      { name: 'Total Contributions', value: result.totalContributions, color: '#82ca9d' },
      { name: 'Interest', value: result.totalInterest, color: '#ff8c69' }
    ];
  };

  const getBarChartData = () => {
    return schedule.map(item => ({
      year: item.year,
      'Starting Amount': item.year === 1 ? (mode === 'startingAmount' ? result.requiredStarting : result.startingAmount) : 0,
      'Contributions': item.deposit,
      'Interest': item.interest
    }));
  };

  const tabs = [
    { id: 'endAmount', label: 'End Amount' },
    { id: 'additionalContribution', label: 'Additional Contribution' },
    { id: 'returnRate', label: 'Return Rate' },
    { id: 'startingAmount', label: 'Starting Amount' },
    { id: 'investmentLength', label: 'Investment Length' }
  ];

  return (
    <CalculatorLayout 
      title="Investment Calculator" 
      description="Calculate investment returns and required contributions."
    >
      <div className="space-y-6">
        {/* Mode Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id as CalculationMode)}
              className={`px-4 py-2 rounded-[3px] font-bold text-sm transition-colors ${
                mode === tab.id
                  ? 'bg-[#4a7c9e] text-white'
                  : 'bg-[#e8e8e8] text-[#333] hover:bg-[#d0d0d0]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Inputs */}
          <div className="space-y-4">
            {mode !== 'endAmount' && (
              <div>
                <label className="block text-sm font-bold mb-1">Your Target</label>
                <input
                  type="number"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
            )}

            {mode !== 'startingAmount' && (
              <div>
                <label className="block text-sm font-bold mb-1">Starting Amount</label>
                <input
                  type="number"
                  value={startingAmount}
                  onChange={(e) => setStartingAmount(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
            )}

            {mode !== 'investmentLength' && (
              <div>
                <label className="block text-sm font-bold mb-1">After</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm text-muted-foreground">years</span>
                </div>
              </div>
            )}

            {mode !== 'returnRate' && (
              <div>
                <label className="block text-sm font-bold mb-1">Return Rate</label>
                <div className="flex gap-2 items-center">
                  <input
                    type="number"
                    step="0.1"
                    value={returnRate}
                    onChange={(e) => setReturnRate(e.target.value)}
                    className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-1">Compound</label>
              <select
                value={compound}
                onChange={(e) => setCompound(e.target.value)}
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              >
                <option value="annually">annually</option>
                <option value="monthly">monthly</option>
              </select>
            </div>

            {mode !== 'additionalContribution' && (
              <div>
                <label className="block text-sm font-bold mb-1">Additional Contribution</label>
                <input
                  type="number"
                  value={additionalContribution}
                  onChange={(e) => setAdditionalContribution(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-bold mb-2">Contribute at the</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="beginning"
                    checked={contributeAt === 'beginning'}
                    onChange={(e) => setContributeAt('beginning')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">beginning</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="end"
                    checked={contributeAt === 'end'}
                    onChange={(e) => setContributeAt('end')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">end</span>
                </label>
              </div>
              <div className="flex gap-4 mt-2">
                <span className="text-sm">of each</span>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="month"
                    checked={contributePeriod === 'month'}
                    onChange={(e) => setContributePeriod('month')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">month</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    value="year"
                    checked={contributePeriod === 'year'}
                    onChange={(e) => setContributePeriod('year')}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">year</span>
                </label>
              </div>
            </div>

            <button
              onClick={calculate}
              className="bg-[#5f8d4e] text-white px-6 py-2 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold w-full sm:w-auto flex items-center justify-center gap-2"
            >
              Calculate
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </div>

          {/* Right: Results */}
          {result && (
            <div className="bg-[#5f8d4e] text-white p-6 rounded-[3px]">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-xl">Results</h3>
                <button className="text-white hover:opacity-80 text-sm">save</button>
              </div>

              {mode === 'additionalContribution' && (
                <p className="mb-4 text-sm">
                  You will need to contribute <span className="text-[#90ee90] font-bold">{formatCurrency(result.requiredContribution)}</span> at the end of each {result.contributionPeriod} to reach the target of {formatCurrency(result.endBalance)}.
                </p>
              )}

              {mode === 'returnRate' && (
                <p className="mb-4 text-sm">
                  You will need an annual return rate of <span className="text-[#90ee90] font-bold">{formatNumber(result.requiredRate, 3)}%</span> to reach the target of {formatCurrency(result.endBalance)}.
                </p>
              )}

              {mode === 'startingAmount' && (
                <p className="mb-4 text-sm">
                  You will need to invest <span className="text-[#90ee90] font-bold">{formatCurrency(result.requiredStarting)}</span> at the beginning to reach the target of {formatCurrency(result.endBalance)}.
                </p>
              )}

              {mode === 'investmentLength' && (
                <p className="mb-4 text-sm">
                  You will need to invest <span className="text-[#90ee90] font-bold">{formatNumber(result.requiredYears, 3)} years</span> to reach the target of {formatCurrency(result.endBalance)}.
                </p>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="font-bold">End Balance</span>
                  <span className="font-bold">{formatCurrency(result.endBalance)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Starting Amount</span>
                  <span>{formatCurrency(mode === 'startingAmount' ? result.requiredStarting : result.startingAmount || parseFloat(startingAmount))}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Contributions</span>
                  <span>{formatCurrency(result.totalContributions)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Interest</span>
                  <span>{formatCurrency(result.totalInterest)}</span>
                </div>
              </div>

              <div className="bg-white rounded-[3px] p-4">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={getChartData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {getChartData().map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: any) => formatCurrency(value)}
                      contentStyle={{ background: '#fff', border: '1px solid #ccc', borderRadius: '3px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-3 justify-center mt-3">
                  {getChartData().map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-[#333]">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accumulation Schedule */}
        {result && schedule.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Accumulation Schedule</h2>
            
            <div className="flex gap-4 mb-4">
              <button
                onClick={() => setScheduleView('annual')}
                className={`px-4 py-2 font-bold rounded-t-[3px] ${
                  scheduleView === 'annual'
                    ? 'bg-white text-[#333] border-b-2 border-[#4a7c9e]'
                    : 'bg-transparent text-[#0066cc] hover:text-[#0052a3]'
                }`}
              >
                Annual Schedule
              </button>
              <button
                onClick={() => setScheduleView('monthly')}
                className={`px-4 py-2 font-bold rounded-t-[3px] ${
                  scheduleView === 'monthly'
                    ? 'bg-white text-[#333] border-b-2 border-[#4a7c9e]'
                    : 'bg-transparent text-[#0066cc] hover:text-[#0052a3]'
                }`}
              >
                Monthly Schedule
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              <div className="overflow-auto max-h-[600px]">
                <table className="w-full border-collapse">
                  <thead className="bg-[#4a7c9e] text-white sticky top-0">
                    <tr>
                      <th className="border border-[#ccc] px-3 py-2 text-left">Year</th>
                      <th className="border border-[#ccc] px-3 py-2 text-right">Deposit</th>
                      <th className="border border-[#ccc] px-3 py-2 text-right">Interest</th>
                      <th className="border border-[#ccc] px-3 py-2 text-right">Ending balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schedule.map((row, index) => (
                      <tr key={index} className="hover:bg-[#f5f5f5]">
                        <td className="border border-[#ccc] px-3 py-2">{row.year}</td>
                        <td className="border border-[#ccc] px-3 py-2 text-right">{formatCurrency(row.deposit)}</td>
                        <td className="border border-[#ccc] px-3 py-2 text-right">{formatCurrency(row.interest)}</td>
                        <td className="border border-[#ccc] px-3 py-2 text-right font-bold">{formatCurrency(row.endingBalance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={getBarChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="year" 
                      label={{ value: 'Year', position: 'insideBottom', offset: -5 }}
                    />
                    <YAxis />
                    <Tooltip 
                      formatter={(value: any) => formatCurrency(value)}
                      contentStyle={{ background: '#fff', border: '1px solid #ccc', borderRadius: '3px' }}
                    />
                    <Legend />
                    <Bar dataKey="Starting Amount" stackId="a" fill="#4a7c9e" />
                    <Bar dataKey="Contributions" stackId="a" fill="#82ca9d" />
                    <Bar dataKey="Interest" stackId="a" fill="#ff8c69" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}