"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';
import { toast } from 'sonner';

interface GenerationResult {
  numbers: number[];
  timestamp: Date;
}

export default function RandomNumberGeneratorPage() {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [quantity, setQuantity] = useState('1');
  const [allowDuplicates, setAllowDuplicates] = useState(true);
  const [sortNumbers, setSortNumbers] = useState(false);
  const [allowDecimals, setAllowDecimals] = useState(false);
  const [decimalPlaces, setDecimalPlaces] = useState('2');
  const [numbers, setNumbers] = useState<number[]>([]);
  const [showStatistics, setShowStatistics] = useState(false);
  const [history, setHistory] = useState<GenerationResult[]>([]);

  const generate = () => {
    const minNum = parseFloat(min) || 1;
    const maxNum = parseFloat(max) || 100;
    const qty = parseInt(quantity) || 1;

    // Validation
    if (minNum >= maxNum) {
      toast.error('Minimum must be less than maximum');
      return;
    }

    if (qty < 1) {
      toast.error('Quantity must be at least 1');
      return;
    }

    if (qty > 10000) {
      toast.error('Quantity cannot exceed 10,000');
      return;
    }

    if (!allowDuplicates && qty > (maxNum - minNum + 1)) {
      toast.error(`Cannot generate ${qty} unique numbers in range ${minNum}-${maxNum}`);
      return;
    }

    const result: number[] = [];
    const used = new Set<number>();

    for (let i = 0; i < qty; i++) {
      let num: number;
      let attempts = 0;
      
      do {
        if (allowDecimals) {
          const decimals = parseInt(decimalPlaces) || 2;
          num = parseFloat((Math.random() * (maxNum - minNum) + minNum).toFixed(decimals));
        } else {
          num = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        }
        attempts++;
        
        if (!allowDuplicates && attempts > 10000) {
          toast.error('Could not generate unique numbers. Try increasing the range.');
          return;
        }
      } while (!allowDuplicates && used.has(num));

      result.push(num);
      used.add(num);
    }

    // Sort if requested
    if (sortNumbers) {
      result.sort((a, b) => a - b);
    }

    setNumbers(result);
    
    // Add to history (keep last 5)
    setHistory(prev => [{ numbers: result, timestamp: new Date() }, ...prev].slice(0, 5));
    
    toast.success(`Generated ${result.length} number${result.length > 1 ? 's' : ''}`);
  };

  const calculateStatistics = () => {
    if (numbers.length === 0) return null;

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    const average = sum / numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    
    // Calculate mode
    const frequency: Record<number, number> = {};
    numbers.forEach(num => {
      frequency[num] = (frequency[num] || 0) + 1;
    });
    const maxFreq = Math.max(...Object.values(frequency));
    const modes = Object.entries(frequency)
      .filter(([_, freq]) => freq === maxFreq)
      .map(([num, _]) => parseFloat(num));
    
    const range = Math.max(...numbers) - Math.min(...numbers);
    
    // Standard deviation
    const variance = numbers.reduce((acc, num) => acc + Math.pow(num - average, 2), 0) / numbers.length;
    const stdDev = Math.sqrt(variance);

    return {
      sum,
      average,
      median,
      mode: modes.length === numbers.length ? 'N/A' : modes.join(', '),
      min: Math.min(...numbers),
      max: Math.max(...numbers),
      range,
      stdDev
    };
  };

  const copyToClipboard = () => {
    const text = numbers.join(', ');
    navigator.clipboard.writeText(text).then(() => {
      toast.success('Copied to clipboard');
    }).catch(() => {
      toast.error('Failed to copy');
    });
  };

  const downloadAsCSV = () => {
    const csv = numbers.join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `random-numbers-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success('Downloaded as CSV');
  };

  const loadFromHistory = (index: number) => {
    const historyItem = history[index];
    if (historyItem) {
      setNumbers(historyItem.numbers);
      toast.success('Loaded from history');
    }
  };

  const formatNumber = (num: number) => {
    if (allowDecimals) {
      return num.toFixed(parseInt(decimalPlaces) || 2);
    }
    return num.toString();
  };

  const stats = calculateStatistics();

  return (
    <CalculatorLayout title="Random Number Generator" description="Generate random numbers with advanced options including sorting, statistics, and export features.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Basic Settings</h3>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-bold mb-1">Minimum Value</label>
                <input
                  type="number"
                  step={allowDecimals ? '0.01' : '1'}
                  value={min}
                  onChange={(e) => setMin(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-1">Maximum Value</label>
                <input
                  type="number"
                  step={allowDecimals ? '0.01' : '1'}
                  value={max}
                  onChange={(e) => setMax(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-1">Quantity (How Many Numbers)</label>
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                />
                <p className="text-xs text-muted-foreground mt-1">Max: 10,000 numbers</p>
              </div>
            </div>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Advanced Options</h3>
            
            <div className="space-y-3">
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowDuplicates}
                    onChange={(e) => setAllowDuplicates(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Allow Duplicate Numbers</span>
                </label>
                <p className="text-xs text-muted-foreground ml-6 mt-1">
                  Uncheck to generate only unique numbers
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sortNumbers}
                    onChange={(e) => setSortNumbers(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Sort Numbers (Ascending)</span>
                </label>
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={allowDecimals}
                    onChange={(e) => setAllowDecimals(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-sm">Allow Decimal Numbers</span>
                </label>
              </div>

              {allowDecimals && (
                <div className="ml-6">
                  <label className="block text-sm font-bold mb-1">Decimal Places</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={decimalPlaces}
                    onChange={(e) => setDecimalPlaces(e.target.value)}
                    className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
                  />
                </div>
              )}
            </div>
          </div>

          <button
            onClick={generate}
            className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
          >
            Generate Numbers
          </button>
        </div>

        {/* Results Section */}
        <div className="space-y-4">
          {numbers.length > 0 ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-lg text-accent">Generated Numbers</h3>
                  <span className="text-sm text-muted-foreground">Count: {numbers.length}</span>
                </div>
                
                <div className="max-h-64 overflow-y-auto mb-4 p-3 bg-muted rounded-[3px]">
                  <div className="flex flex-wrap gap-2">
                    {numbers.map((num, idx) => (
                      <div key={idx} className="bg-accent text-white px-3 py-1.5 rounded-[3px] font-semibold text-sm">
                        {formatNumber(num)}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={copyToClipboard}
                    className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded-[3px] hover:bg-secondary/80 transition-colors text-sm font-semibold"
                  >
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={downloadAsCSV}
                    className="flex-1 bg-secondary text-secondary-foreground px-4 py-2 rounded-[3px] hover:bg-secondary/80 transition-colors text-sm font-semibold"
                  >
                    Download CSV
                  </button>
                </div>
              </div>

              {stats && (
                <div className="bg-card p-4 rounded-[3px] border border-border">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-base">Statistics</h3>
                    <button
                      onClick={() => setShowStatistics(!showStatistics)}
                      className="text-sm text-accent hover:text-accent/80 font-semibold"
                    >
                      {showStatistics ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  
                  {showStatistics && (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Sum:</span>
                        <span className="font-semibold">{stats.sum.toFixed(allowDecimals ? parseInt(decimalPlaces) : 0)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Average:</span>
                        <span className="font-semibold">{stats.average.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Median:</span>
                        <span className="font-semibold">{stats.median.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Mode:</span>
                        <span className="font-semibold">{stats.mode}</span>
                      </div>
                      <div className="flex justify-between py-1 border-t border-border pt-2">
                        <span className="text-muted-foreground">Minimum:</span>
                        <span className="font-semibold">{formatNumber(stats.min)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Maximum:</span>
                        <span className="font-semibold">{formatNumber(stats.max)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Range:</span>
                        <span className="font-semibold">{stats.range.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between py-1">
                        <span className="text-muted-foreground">Std Deviation:</span>
                        <span className="font-semibold">{stats.stdDev.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {history.length > 0 && (
                <div className="bg-card p-4 rounded-[3px] border border-border">
                  <h3 className="font-bold text-base mb-3">Recent Generations</h3>
                  <div className="space-y-2">
                    {history.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-[3px] hover:bg-muted/70 transition-colors">
                        <div className="text-sm">
                          <span className="font-semibold">{item.numbers.length} numbers</span>
                          <span className="text-muted-foreground ml-2">
                            {item.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                        <button
                          onClick={() => loadFromHistory(index)}
                          className="text-xs text-accent hover:text-accent/80 font-semibold"
                        >
                          Load
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p className="mb-2">No numbers generated yet</p>
              <p className="text-sm">Enter your settings and click "Generate Numbers" to get started</p>
            </div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}