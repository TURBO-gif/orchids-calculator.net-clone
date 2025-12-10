"use client";

import React, { useState, useEffect } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { ArrowRightLeft, RefreshCw } from 'lucide-react';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'KRW', name: 'South Korean Won', symbol: '₩' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
  { code: 'RUB', name: 'Russian Ruble', symbol: '₽' },
];

const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.50,
  CAD: 1.36,
  AUD: 1.53,
  CHF: 0.88,
  CNY: 7.24,
  INR: 83.12,
  MXN: 17.15,
  BRL: 4.97,
  KRW: 1328.50,
  SGD: 1.34,
  HKD: 7.82,
  NOK: 10.72,
  SEK: 10.45,
  DKK: 6.87,
  NZD: 1.64,
  ZAR: 18.65,
  RUB: 91.50,
};

export default function CurrencyCalculatorPage() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [customRate, setCustomRate] = useState('');
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [result, setResult] = useState<any>(null);

  const getRate = (from: string, to: string) => {
    if (useCustomRate && customRate) {
      return parseFloat(customRate);
    }
    const fromRate = exchangeRates[from] || 1;
    const toRate = exchangeRates[to] || 1;
    return toRate / fromRate;
  };

  const convert = () => {
    const amountNum = parseFloat(amount) || 0;
    const rate = getRate(fromCurrency, toCurrency);
    const converted = amountNum * rate;
    const inverseRate = 1 / rate;

    setResult({
      amount: amountNum,
      from: fromCurrency,
      to: toCurrency,
      rate,
      inverseRate,
      converted,
      fromSymbol: currencies.find(c => c.code === fromCurrency)?.symbol || '',
      toSymbol: currencies.find(c => c.code === toCurrency)?.symbol || '',
    });
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  useEffect(() => {
    convert();
  }, [amount, fromCurrency, toCurrency, customRate, useCustomRate]);

  const formatNumber = (num: number, decimals = 2) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  const commonConversions = [
    { from: 'USD', to: 'EUR' },
    { from: 'USD', to: 'GBP' },
    { from: 'EUR', to: 'GBP' },
    { from: 'USD', to: 'JPY' },
    { from: 'USD', to: 'CAD' },
    { from: 'EUR', to: 'JPY' },
  ];

  return (
    <CalculatorLayout title="Currency Calculator" description="Convert between world currencies using live or custom exchange rates.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Currency Conversion</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  placeholder="Enter amount"
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1">From</label>
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  >
                    {currencies.map(c => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={swapCurrencies}
                  className="mt-6 p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors"
                  title="Swap currencies"
                >
                  <ArrowRightLeft className="w-5 h-5 text-accent" />
                </button>

                <div className="flex-1">
                  <label className="block text-sm font-bold mb-1">To</label>
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  >
                    {currencies.map(c => (
                      <option key={c.code} value={c.code}>{c.code} - {c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <label className="flex items-center gap-2 text-sm mb-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useCustomRate}
                    onChange={(e) => setUseCustomRate(e.target.checked)}
                    className="rounded"
                  />
                  <span>Use custom exchange rate</span>
                </label>
                {useCustomRate && (
                  <div>
                    <label className="block text-sm font-bold mb-1">
                      1 {fromCurrency} = ? {toCurrency}
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      value={customRate}
                      onChange={(e) => setCustomRate(e.target.value)}
                      className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                      placeholder="Enter custom rate"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-3">Quick Conversions</h3>
            <div className="grid grid-cols-2 gap-2">
              {commonConversions.map((conv, i) => {
                const rate = getRate(conv.from, conv.to);
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setFromCurrency(conv.from);
                      setToCurrency(conv.to);
                    }}
                    className={`p-2 text-xs rounded border transition-colors ${
                      fromCurrency === conv.from && toCurrency === conv.to
                        ? 'border-accent bg-accent/10'
                        : 'border-border hover:border-accent/50'
                    }`}
                  >
                    <div className="font-semibold">{conv.from}/{conv.to}</div>
                    <div className="text-muted-foreground">{formatNumber(rate, 4)}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {result && (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <div className="text-center">
                  <div className="text-lg text-muted-foreground mb-1">
                    {formatNumber(result.amount)} {result.from} =
                  </div>
                  <div className="text-4xl font-bold text-foreground">
                    {result.toSymbol}{formatNumber(result.converted, 4)} {result.to}
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Exchange Rate</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <span className="text-sm">1 {result.from}</span>
                    <span className="font-bold">{formatNumber(result.rate, 6)} {result.to}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted/30 rounded">
                    <span className="text-sm">1 {result.to}</span>
                    <span className="font-bold">{formatNumber(result.inverseRate, 6)} {result.from}</span>
                  </div>
                </div>
              </div>

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Conversion Table</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 font-bold">{result.from}</th>
                      <th className="text-right py-2 font-bold">{result.to}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 5, 10, 25, 50, 100, 500, 1000].map(val => (
                      <tr key={val} className="border-b border-border/50">
                        <td className="py-2">{formatNumber(val, 0)}</td>
                        <td className="text-right py-2 font-semibold">
                          {formatNumber(val * result.rate, 2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-[3px] border border-blue-200 dark:border-blue-800">
                <h4 className="font-bold text-sm mb-2 text-blue-800 dark:text-blue-200">Note</h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Exchange rates are approximate and for informational purposes only. 
                  Actual rates may vary. For accurate rates, check with your bank or financial institution.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
