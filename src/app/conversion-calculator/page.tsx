"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function ConversionCalculatorPage() {
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState<any>(null);

  const conversions: any = {
    length: {
      meters: 1,
      kilometers: 0.001,
      centimeters: 100,
      millimeters: 1000,
      miles: 0.000621371,
      yards: 1.09361,
      feet: 3.28084,
      inches: 39.3701
    },
    weight: {
      kilograms: 1,
      grams: 1000,
      milligrams: 1000000,
      pounds: 2.20462,
      ounces: 35.274,
      tons: 0.001
    },
    temperature: {
      celsius: { offset: 0, factor: 1 },
      fahrenheit: { formula: (c: number) => (c * 9/5) + 32, reverse: (f: number) => (f - 32) * 5/9 },
      kelvin: { offset: 273.15, factor: 1 }
    },
    volume: {
      liters: 1,
      milliliters: 1000,
      gallons: 0.264172,
      quarts: 1.05669,
      pints: 2.11338,
      cups: 4.22675,
      fluid_ounces: 33.814
    },
    area: {
      square_meters: 1,
      square_kilometers: 0.000001,
      square_feet: 10.7639,
      square_yards: 1.19599,
      acres: 0.000247105,
      hectares: 0.0001
    },
    speed: {
      meters_per_second: 1,
      kilometers_per_hour: 3.6,
      miles_per_hour: 2.23694,
      feet_per_second: 3.28084,
      knots: 1.94384
    }
  };

  const unitLabels: any = {
    meters: 'Meters', kilometers: 'Kilometers', centimeters: 'Centimeters', millimeters: 'Millimeters',
    miles: 'Miles', yards: 'Yards', feet: 'Feet', inches: 'Inches',
    kilograms: 'Kilograms', grams: 'Grams', milligrams: 'Milligrams', pounds: 'Pounds', ounces: 'Ounces', tons: 'Metric Tons',
    celsius: 'Celsius', fahrenheit: 'Fahrenheit', kelvin: 'Kelvin',
    liters: 'Liters', milliliters: 'Milliliters', gallons: 'Gallons (US)', quarts: 'Quarts', pints: 'Pints',
    cups: 'Cups', fluid_ounces: 'Fluid Ounces',
    square_meters: 'Square Meters', square_kilometers: 'Square Kilometers', square_feet: 'Square Feet',
    square_yards: 'Square Yards', acres: 'Acres', hectares: 'Hectares',
    meters_per_second: 'Meters/Second', kilometers_per_hour: 'Kilometers/Hour', miles_per_hour: 'Miles/Hour',
    feet_per_second: 'Feet/Second', knots: 'Knots'
  };

  const calculate = () => {
    const val = parseFloat(value) || 0;
    let convertedValue = 0;

    if (category === 'temperature') {
      // Special handling for temperature
      if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
        convertedValue = conversions.temperature.fahrenheit.formula(val);
      } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
        convertedValue = conversions.temperature.fahrenheit.reverse(val);
      } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
        convertedValue = val + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
        convertedValue = val - 273.15;
      } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
        convertedValue = conversions.temperature.fahrenheit.reverse(val) + 273.15;
      } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
        convertedValue = conversions.temperature.fahrenheit.formula(val - 273.15);
      } else {
        convertedValue = val;
      }
    } else {
      // Standard conversion
      const baseValue = val / conversions[category][fromUnit];
      convertedValue = baseValue * conversions[category][toUnit];
    }

    setResult({
      value: val,
      convertedValue: convertedValue.toFixed(6),
      fromUnit: unitLabels[fromUnit],
      toUnit: unitLabels[toUnit]
    });
  };

  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    const units = Object.keys(conversions[newCategory]);
    setFromUnit(units[0]);
    setToUnit(units[1] || units[0]);
  };

  return (
    <CalculatorLayout title="Conversion Calculator" description="Convert between different units of measurement.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="length">Length</option>
            <option value="weight">Weight/Mass</option>
            <option value="temperature">Temperature</option>
            <option value="volume">Volume</option>
            <option value="area">Area</option>
            <option value="speed">Speed</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Value</label>
          <input
            type="number"
            step="any"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">From</label>
          <select
            value={fromUnit}
            onChange={(e) => setFromUnit(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            {Object.keys(conversions[category]).map(unit => (
              <option key={unit} value={unit}>{unitLabels[unit]}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">To</label>
          <select
            value={toUnit}
            onChange={(e) => setToUnit(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            {Object.keys(conversions[category]).map(unit => (
              <option key={unit} value={unit}>{unitLabels[unit]}</option>
            ))}
          </select>
        </div>
        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
        >
          Convert
        </button>
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Result:</h3>
            <p className="text-xl"><strong>{result.value} {result.fromUnit} = {result.convertedValue} {result.toUnit}</strong></p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
