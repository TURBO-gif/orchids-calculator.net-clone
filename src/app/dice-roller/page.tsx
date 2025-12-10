'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Dices, RotateCcw, Plus, Minus } from 'lucide-react';

interface RollResult {
  dice: number[];
  total: number;
  timestamp: Date;
}

const diceTypes = [4, 6, 8, 10, 12, 20, 100];

const diceFaces: { [key: number]: string[] } = {
  6: ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'],
};

export default function DiceRoller() {
  const [numDice, setNumDice] = useState(2);
  const [sides, setSides] = useState(6);
  const [modifier, setModifier] = useState(0);
  const [currentRoll, setCurrentRoll] = useState<RollResult | null>(null);
  const [history, setHistory] = useState<RollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);
  const [showHistory, setShowHistory] = useState(true);

  const rollDice = () => {
    setIsRolling(true);
    
    setTimeout(() => {
      const dice: number[] = [];
      for (let i = 0; i < numDice; i++) {
        dice.push(Math.floor(Math.random() * sides) + 1);
      }
      const total = dice.reduce((sum, d) => sum + d, 0) + modifier;
      
      const result: RollResult = {
        dice,
        total,
        timestamp: new Date(),
      };
      
      setCurrentRoll(result);
      setHistory((prev) => [result, ...prev].slice(0, 20));
      setIsRolling(false);
    }, 500);
  };

  const clearHistory = () => {
    setHistory([]);
    setCurrentRoll(null);
  };

  const stats = history.length > 0 ? {
    sum: history.reduce((sum, r) => sum + r.total, 0),
    avg: history.reduce((sum, r) => sum + r.total, 0) / history.length,
    min: Math.min(...history.map((r) => r.total)),
    max: Math.max(...history.map((r) => r.total)),
    count: history.length,
  } : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Calculators
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
              <Dices className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Dice Roller</h1>
              <p className="text-slate-600">Roll virtual dice with customizable options</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Dice Type</label>
                <div className="grid grid-cols-4 gap-2">
                  {diceTypes.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSides(d)}
                      className={`py-3 rounded-lg border-2 font-medium transition-all ${
                        sides === d
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-slate-200 hover:border-emerald-300'
                      }`}
                    >
                      d{d}
                    </button>
                  ))}
                  <input
                    type="number"
                    min="2"
                    max="1000"
                    value={sides}
                    onChange={(e) => setSides(Math.max(2, parseInt(e.target.value) || 6))}
                    className="py-3 px-2 rounded-lg border-2 border-slate-200 text-center focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
                    placeholder="Custom"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Number of Dice</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setNumDice(Math.max(1, numDice - 1))}
                    className="p-3 rounded-lg border border-slate-300 hover:bg-slate-50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={numDice}
                    onChange={(e) => setNumDice(Math.max(1, Math.min(100, parseInt(e.target.value) || 1)))}
                    className="flex-1 py-3 px-4 border border-slate-300 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => setNumDice(Math.min(100, numDice + 1))}
                    className="p-3 rounded-lg border border-slate-300 hover:bg-slate-50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Modifier</label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setModifier(modifier - 1)}
                    className="p-3 rounded-lg border border-slate-300 hover:bg-slate-50"
                  >
                    <Minus className="w-5 h-5" />
                  </button>
                  <input
                    type="number"
                    value={modifier}
                    onChange={(e) => setModifier(parseInt(e.target.value) || 0)}
                    className="flex-1 py-3 px-4 border border-slate-300 rounded-lg text-center text-xl font-bold focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    onClick={() => setModifier(modifier + 1)}
                    className="p-3 rounded-lg border border-slate-300 hover:bg-slate-50"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 mt-1 text-center">
                  Rolling: {numDice}d{sides}{modifier !== 0 ? (modifier > 0 ? `+${modifier}` : modifier) : ''}
                </p>
              </div>

              <button
                onClick={rollDice}
                disabled={isRolling}
                className={`w-full py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all text-xl ${
                  isRolling ? 'animate-pulse' : ''
                }`}
              >
                {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice'}
              </button>

              <button
                onClick={clearHistory}
                className="w-full py-3 border border-slate-300 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Clear History
              </button>
            </div>

            <div className="space-y-6">
              {currentRoll && (
                <div className={`bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white transition-all ${isRolling ? 'scale-105' : ''}`}>
                  <p className="text-emerald-100 text-sm mb-2">Result</p>
                  <p className="text-6xl font-bold text-center mb-4">{currentRoll.total}</p>
                  <div className="flex flex-wrap justify-center gap-3 mb-4">
                    {currentRoll.dice.map((d, i) => (
                      <div
                        key={i}
                        className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center text-2xl font-bold"
                      >
                        {sides === 6 && diceFaces[6] ? diceFaces[6][d - 1] : d}
                      </div>
                    ))}
                  </div>
                  {modifier !== 0 && (
                    <p className="text-center text-emerald-100">
                      ({currentRoll.dice.join(' + ')}) {modifier > 0 ? '+' : ''} {modifier} = {currentRoll.total}
                    </p>
                  )}
                </div>
              )}

              {stats && (
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Roll Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">Total Rolls</p>
                      <p className="text-xl font-bold text-slate-800">{stats.count}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">Sum</p>
                      <p className="text-xl font-bold text-slate-800">{stats.sum}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">Average</p>
                      <p className="text-xl font-bold text-slate-800">{stats.avg.toFixed(2)}</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-slate-200">
                      <p className="text-xs text-slate-500">Min / Max</p>
                      <p className="text-xl font-bold text-slate-800">{stats.min} / {stats.max}</p>
                    </div>
                  </div>
                </div>
              )}

              {history.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-slate-800">Roll History</h3>
                    <button
                      onClick={() => setShowHistory(!showHistory)}
                      className="text-sm text-emerald-600 hover:text-emerald-800"
                    >
                      {showHistory ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {showHistory && (
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {history.map((roll, i) => (
                        <div key={i} className="flex justify-between items-center py-2 border-b border-slate-200 text-sm">
                          <span className="text-slate-500">
                            [{roll.dice.join(', ')}]{modifier !== 0 ? ` ${modifier > 0 ? '+' : ''}${modifier}` : ''}
                          </span>
                          <span className="font-bold text-slate-800">{roll.total}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!currentRoll && (
                <div className="bg-slate-50 rounded-xl p-6 text-center">
                  <Dices className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500">Click &quot;Roll Dice&quot; to start rolling!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
