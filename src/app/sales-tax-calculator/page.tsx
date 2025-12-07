"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function SalesTaxCalculatorPage() {
  const [price, setPrice] = useState('100');
  const [taxRate, setTaxRate] = useState('8.5');
  const [calculateType, setCalculateType] = useState('add');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const amount = parseFloat(price) || 0;
    const rate = (parseFloat(taxRate) || 0) / 100;

    let taxAmount = 0;
    let totalAmount = 0;
    let beforeTax = 0;

    if (calculateType === 'add') {
      // Add tax to price
      taxAmount = amount * rate;
      totalAmount = amount + taxAmount;
      beforeTax = amount;
    } else {
      // Remove tax from price (price includes tax)
      beforeTax = amount / (1 + rate);
      taxAmount = amount - beforeTax;
      totalAmount = amount;
    }

    setResult({
      beforeTax: beforeTax.toFixed(2),
      taxAmount: taxAmount.toFixed(2),
      totalAmount: totalAmount.toFixed(2),
      taxRate: (rate * 100).toFixed(2)
    });
  };

  return (
    <CalculatorLayout title="Sales Tax Calculator" description="Calculate sales tax and total price.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold mb-1">Calculation Type</label>
          <select
            value={calculateType}
            onChange={(e) => setCalculateType(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          >
            <option value="add">Add tax to price</option>
            <option value="remove">Remove tax from price</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">
            {calculateType === 'add' ? 'Price Before Tax ($)' : 'Price Including Tax ($)'}
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-bold mb-1">Sales Tax Rate (%)</label>
          <input
            type="number"
            step="0.01"
            value={taxRate}
            onChange={(e) => setTaxRate(e.target.value)}
            className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
          />
        </div>
        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold"
        >
          Calculate
        </button>
        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            <div className="space-y-2">
              <p><strong>Price Before Tax:</strong> ${result.beforeTax}</p>
              <p><strong>Sales Tax ({result.taxRate}%):</strong> ${result.taxAmount}</p>
              <p><strong>Total Price:</strong> ${result.totalAmount}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
