'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Heart } from 'lucide-react';

const cupSizes = ['AA', 'A', 'B', 'C', 'D', 'DD/E', 'DDD/F', 'G', 'H', 'I', 'J', 'K'];

export default function BraSizeCalculator() {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');
  const [bustSize, setBustSize] = useState('36');
  const [bandSize, setBandSize] = useState('32');
  const [result, setResult] = useState<{
    us: string;
    uk: string;
    eu: string;
    au: string;
    fr: string;
    cupDifference: number;
    bandRounded: number;
  } | null>(null);

  const calculate = () => {
    let bust = parseFloat(bustSize) || 0;
    let band = parseFloat(bandSize) || 0;

    if (unit === 'cm') {
      bust = bust / 2.54;
      band = band / 2.54;
    }

    const bandRounded = Math.round(band / 2) * 2;
    const cupDifference = Math.round(bust - bandRounded);
    const cupIndex = Math.max(0, Math.min(cupDifference - 1, cupSizes.length - 1));
    const cupLetter = cupDifference > 0 ? cupSizes[cupIndex] : 'AA';

    const euBand = Math.round(bandRounded * 2.54 / 5) * 5;
    const frBand = euBand + 15;

    setResult({
      us: `${bandRounded}${cupLetter}`,
      uk: `${bandRounded}${cupLetter}`,
      eu: `${euBand}${cupLetter}`,
      au: `${bandRounded - 22}${cupLetter}`,
      fr: `${frBand}${cupLetter}`,
      cupDifference,
      bandRounded,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-pink-600 hover:text-pink-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Calculators
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Bra Size Calculator</h1>
              <p className="text-slate-600">Calculate your bra size in US, UK, EU & more</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Measurement Unit</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setUnit('inches')}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                      unit === 'inches'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    onClick={() => setUnit('cm')}
                    className={`flex-1 py-3 rounded-lg border-2 font-medium transition-all ${
                      unit === 'cm'
                        ? 'border-pink-500 bg-pink-50 text-pink-700'
                        : 'border-slate-200 hover:border-pink-300'
                    }`}
                  >
                    Centimeters
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Bust Size ({unit})
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={bustSize}
                  onChange={(e) => setBustSize(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="Measure around fullest part of bust"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Measure loosely around the fullest part of your bust
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Band Size / Under Bust ({unit})
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={bandSize}
                  onChange={(e) => setBandSize(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  placeholder="Measure directly under bust"
                />
                <p className="text-xs text-slate-500 mt-1">
                  Measure firmly (not tight) directly underneath your bust
                </p>
              </div>

              <button
                onClick={calculate}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Calculate Bra Size
              </button>
            </div>

            <div>
              {result && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white">
                    <p className="text-pink-100 text-sm mb-1">Your US Bra Size</p>
                    <p className="text-5xl font-bold mb-2">{result.us}</p>
                    <p className="text-pink-100 text-sm">
                      Band: {result.bandRounded}&quot; | Cup Difference: {result.cupDifference}&quot;
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">International Sizes</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between py-3 border-b border-slate-200">
                        <span className="text-slate-600">United States</span>
                        <span className="font-bold text-lg">{result.us}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-200">
                        <span className="text-slate-600">United Kingdom</span>
                        <span className="font-bold text-lg">{result.uk}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-200">
                        <span className="text-slate-600">European Union</span>
                        <span className="font-bold text-lg">{result.eu}</span>
                      </div>
                      <div className="flex justify-between py-3 border-b border-slate-200">
                        <span className="text-slate-600">Australia / NZ</span>
                        <span className="font-bold text-lg">{result.au}</span>
                      </div>
                      <div className="flex justify-between py-3">
                        <span className="text-slate-600">France / Belgium</span>
                        <span className="font-bold text-lg">{result.fr}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <p className="text-amber-800 text-sm">
                      <strong>Note:</strong> Bra sizes vary between manufacturers. Use this as a starting point and try different sizes for the best fit.
                    </p>
                  </div>
                </div>
              )}

              {!result && (
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">How to Measure</h3>
                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-800 mb-2">1. Bust Measurement</p>
                      <p>Stand straight with arms at your sides. Measure around the fullest part of your bust, keeping the tape parallel to the floor.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-800 mb-2">2. Band Measurement</p>
                      <p>Measure firmly (but not tight) directly underneath your bust, keeping the tape level all the way around.</p>
                    </div>
                    <div className="p-4 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium text-slate-800 mb-2">3. Cup Size</p>
                      <p>The cup size is determined by the difference between your bust and band measurements.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
