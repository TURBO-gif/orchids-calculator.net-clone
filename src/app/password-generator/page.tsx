"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState('16');
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generate = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let chars = '';
    if (includeUppercase) chars += uppercase;
    if (includeLowercase) chars += lowercase;
    if (includeNumbers) chars += numbers;
    if (includeSymbols) chars += symbols;

    if (chars === '') {
      setPassword('Please select at least one character type');
      return;
    }

    const len = parseInt(length) || 16;
    let result = '';
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    setPassword(result);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <CalculatorLayout title="Password Generator" description="Generate secure random passwords.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Password Length</label>
          <input
            type="number"
            value={length}
            onChange={(e) => setLength(e.target.value)}
            min="4"
            max="128"
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeUppercase}
              onChange={(e) => setIncludeUppercase(e.target.checked)}
            />
            <span className="text-sm">Include Uppercase Letters (A-Z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            <span className="text-sm">Include Lowercase Letters (a-z)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeNumbers}
              onChange={(e) => setIncludeNumbers(e.target.checked)}
            />
            <span className="text-sm">Include Numbers (0-9)</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            <span className="text-sm">Include Symbols (!@#$%...)</span>
          </label>
        </div>

        <button
          onClick={generate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold w-full"
        >
          Generate Password
        </button>

        {password && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Generated Password:</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={password}
                readOnly
                className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm font-mono"
              />
              <button
                onClick={copyToClipboard}
                className="bg-accent text-white px-4 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors text-sm"
              >
                Copy
              </button>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
