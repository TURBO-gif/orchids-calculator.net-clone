'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Box, Circle, Triangle, Cylinder, Hexagon } from 'lucide-react';

type Shape = 'cube' | 'cuboid' | 'sphere' | 'cylinder' | 'cone' | 'pyramid' | 'prism' | 'capsule';

const shapes: { id: Shape; name: string; icon: any }[] = [
  { id: 'cube', name: 'Cube', icon: Box },
  { id: 'cuboid', name: 'Rectangular Box', icon: Box },
  { id: 'sphere', name: 'Sphere', icon: Circle },
  { id: 'cylinder', name: 'Cylinder', icon: Cylinder },
  { id: 'cone', name: 'Cone', icon: Triangle },
  { id: 'pyramid', name: 'Pyramid', icon: Triangle },
  { id: 'prism', name: 'Triangular Prism', icon: Hexagon },
  { id: 'capsule', name: 'Capsule', icon: Cylinder },
];

export default function VolumeCalculator() {
  const [shape, setShape] = useState<Shape>('cube');
  const [unit, setUnit] = useState('cm');
  const [inputs, setInputs] = useState({
    side: '10',
    length: '10',
    width: '5',
    height: '8',
    radius: '5',
    baseLength: '6',
    baseWidth: '6',
  });
  const [result, setResult] = useState<{
    volume: number;
    formula: string;
    calculation: string;
  } | null>(null);

  const unitCubed = `${unit}³`;

  const calculate = () => {
    let volume = 0;
    let formula = '';
    let calculation = '';

    const s = parseFloat(inputs.side) || 0;
    const l = parseFloat(inputs.length) || 0;
    const w = parseFloat(inputs.width) || 0;
    const h = parseFloat(inputs.height) || 0;
    const r = parseFloat(inputs.radius) || 0;
    const bl = parseFloat(inputs.baseLength) || 0;
    const bw = parseFloat(inputs.baseWidth) || 0;

    switch (shape) {
      case 'cube':
        volume = Math.pow(s, 3);
        formula = 'V = a³';
        calculation = `V = ${s}³ = ${volume.toFixed(4)}`;
        break;
      case 'cuboid':
        volume = l * w * h;
        formula = 'V = l × w × h';
        calculation = `V = ${l} × ${w} × ${h} = ${volume.toFixed(4)}`;
        break;
      case 'sphere':
        volume = (4 / 3) * Math.PI * Math.pow(r, 3);
        formula = 'V = (4/3)πr³';
        calculation = `V = (4/3) × π × ${r}³ = ${volume.toFixed(4)}`;
        break;
      case 'cylinder':
        volume = Math.PI * Math.pow(r, 2) * h;
        formula = 'V = πr²h';
        calculation = `V = π × ${r}² × ${h} = ${volume.toFixed(4)}`;
        break;
      case 'cone':
        volume = (1 / 3) * Math.PI * Math.pow(r, 2) * h;
        formula = 'V = (1/3)πr²h';
        calculation = `V = (1/3) × π × ${r}² × ${h} = ${volume.toFixed(4)}`;
        break;
      case 'pyramid':
        volume = (1 / 3) * bl * bw * h;
        formula = 'V = (1/3) × base area × h';
        calculation = `V = (1/3) × ${bl} × ${bw} × ${h} = ${volume.toFixed(4)}`;
        break;
      case 'prism':
        volume = 0.5 * bl * h * l;
        formula = 'V = (1/2) × base × height × length';
        calculation = `V = (1/2) × ${bl} × ${h} × ${l} = ${volume.toFixed(4)}`;
        break;
      case 'capsule':
        volume = Math.PI * Math.pow(r, 2) * ((4 / 3) * r + h);
        formula = 'V = πr²((4/3)r + h)';
        calculation = `V = π × ${r}² × ((4/3) × ${r} + ${h}) = ${volume.toFixed(4)}`;
        break;
    }

    setResult({ volume, formula, calculation });
  };

  const renderInputs = () => {
    switch (shape) {
      case 'cube':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Side Length (a)</label>
            <input
              type="number"
              value={inputs.side}
              onChange={(e) => setInputs({ ...inputs, side: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case 'cuboid':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Length (l)</label>
              <input
                type="number"
                value={inputs.length}
                onChange={(e) => setInputs({ ...inputs, length: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Width (w)</label>
              <input
                type="number"
                value={inputs.width}
                onChange={(e) => setInputs({ ...inputs, width: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height (h)</label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case 'sphere':
        return (
          <div>
            <label className="block text-sm font-medium mb-2">Radius (r)</label>
            <input
              type="number"
              value={inputs.radius}
              onChange={(e) => setInputs({ ...inputs, radius: e.target.value })}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
        );
      case 'cylinder':
      case 'capsule':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Radius (r)</label>
              <input
                type="number"
                value={inputs.radius}
                onChange={(e) => setInputs({ ...inputs, radius: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height (h)</label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case 'cone':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Base Radius (r)</label>
              <input
                type="number"
                value={inputs.radius}
                onChange={(e) => setInputs({ ...inputs, radius: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height (h)</label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case 'pyramid':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Base Length</label>
              <input
                type="number"
                value={inputs.baseLength}
                onChange={(e) => setInputs({ ...inputs, baseLength: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Base Width</label>
              <input
                type="number"
                value={inputs.baseWidth}
                onChange={(e) => setInputs({ ...inputs, baseWidth: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Height (h)</label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
      case 'prism':
        return (
          <>
            <div>
              <label className="block text-sm font-medium mb-2">Base Length</label>
              <input
                type="number"
                value={inputs.baseLength}
                onChange={(e) => setInputs({ ...inputs, baseLength: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Triangle Height</label>
              <input
                type="number"
                value={inputs.height}
                onChange={(e) => setInputs({ ...inputs, height: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Prism Length</label>
              <input
                type="number"
                value={inputs.length}
                onChange={(e) => setInputs({ ...inputs, length: e.target.value })}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        );
    }
  };

  const convertVolume = (volume: number, fromUnit: string) => {
    const toMm3 = {
      mm: 1,
      cm: 1000,
      m: 1e9,
      in: 16387.064,
      ft: 28316846.6,
    };
    const mm3 = volume * (toMm3[fromUnit as keyof typeof toMm3] || 1);
    return {
      mm3: mm3,
      cm3: mm3 / 1000,
      m3: mm3 / 1e9,
      in3: mm3 / 16387.064,
      ft3: mm3 / 28316846.6,
      liters: mm3 / 1e6,
      gallons: mm3 / 3785411.784,
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Calculators
        </Link>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
              <Box className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-800">Volume Calculator</h1>
              <p className="text-slate-600">Calculate volume for common 3D shapes</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Select Shape</label>
                <div className="grid grid-cols-4 gap-2">
                  {shapes.map((s) => {
                    const Icon = s.icon;
                    return (
                      <button
                        key={s.id}
                        onClick={() => { setShape(s.id); setResult(null); }}
                        className={`p-3 rounded-lg border-2 transition-all flex flex-col items-center gap-1 ${
                          shape === s.id
                            ? 'border-purple-500 bg-purple-50 text-purple-700'
                            : 'border-slate-200 hover:border-purple-300'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs font-medium">{s.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Unit</label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                >
                  <option value="mm">Millimeters (mm)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="m">Meters (m)</option>
                  <option value="in">Inches (in)</option>
                  <option value="ft">Feet (ft)</option>
                </select>
              </div>

              <div className="space-y-4">
                {renderInputs()}
              </div>

              <button
                onClick={calculate}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
              >
                Calculate Volume
              </button>
            </div>

            <div>
              {result && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-2xl p-6 text-white">
                    <p className="text-purple-100 text-sm mb-1">Volume</p>
                    <p className="text-4xl font-bold mb-4">
                      {result.volume.toLocaleString(undefined, { maximumFractionDigits: 4 })} {unitCubed}
                    </p>
                    <div className="bg-white/20 rounded-lg p-3">
                      <p className="text-sm font-medium">Formula: {result.formula}</p>
                      <p className="text-sm mt-1">{result.calculation}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Volume Conversions</h3>
                    <div className="space-y-2">
                      {Object.entries(convertVolume(result.volume, unit)).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-slate-200">
                          <span className="text-slate-600">{key.toUpperCase()}</span>
                          <span className="font-semibold">{value.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {!result && (
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-800 mb-4">Volume Formulas</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium">Cube</p>
                      <p className="text-slate-600">V = a³</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium">Rectangular Box</p>
                      <p className="text-slate-600">V = l × w × h</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium">Sphere</p>
                      <p className="text-slate-600">V = (4/3)πr³</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium">Cylinder</p>
                      <p className="text-slate-600">V = πr²h</p>
                    </div>
                    <div className="p-3 bg-white rounded-lg border border-slate-200">
                      <p className="font-medium">Cone</p>
                      <p className="text-slate-600">V = (1/3)πr²h</p>
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
