"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function AutoLeaseCalculatorPage() {
  const [msrp, setMsrp] = useState('35000');
  const [negotiatedPrice, setNegotiatedPrice] = useState('33000');
  const [downPayment, setDownPayment] = useState('2000');
  const [residualPercent, setResidualPercent] = useState('55');
  const [moneyFactor, setMoneyFactor] = useState('0.00125');
  const [leaseTerm, setLeaseTerm] = useState('36');
  const [salesTax, setSalesTax] = useState('8');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(negotiatedPrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const residual = (parseFloat(residualPercent) || 55) / 100 * parseFloat(msrp);
    const mf = parseFloat(moneyFactor) || 0;
    const term = parseFloat(leaseTerm) || 36;
    const tax = (parseFloat(salesTax) || 0) / 100;

    const capCost = price - down;
    const depreciation = (capCost - residual) / term;
    const financeCharge = (capCost + residual) * mf;
    const basePayment = depreciation + financeCharge;
    const monthlyTax = basePayment * tax;
    const monthlyPayment = basePayment + monthlyTax;
    const totalCost = down + monthlyPayment * term;
    const apr = mf * 2400;

    setResult({ capCost, residual, depreciation, financeCharge, basePayment, monthlyTax, monthlyPayment, totalCost, apr: apr.toFixed(2), term });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Auto Lease Calculator" description="Calculate your monthly auto lease payment.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Vehicle Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">MSRP</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={msrp} onChange={(e) => setMsrp(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Negotiated Price</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={negotiatedPrice} onChange={(e) => setNegotiatedPrice(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Down Payment</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
            </div>
          </div>
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Lease Terms</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Residual Value (%)</label><div className="flex items-center gap-2"><input type="number" value={residualPercent} onChange={(e) => setResidualPercent(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
              <div><label className="block text-sm font-bold mb-1">Money Factor</label><input type="number" step="0.00001" value={moneyFactor} onChange={(e) => setMoneyFactor(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm" /></div>
              <div><label className="block text-sm font-bold mb-1">Lease Term</label><select value={leaseTerm} onChange={(e) => setLeaseTerm(e.target.value)} className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"><option value="24">24 months</option><option value="36">36 months</option><option value="48">48 months</option></select></div>
              <div><label className="block text-sm font-bold mb-1">Sales Tax Rate</label><div className="flex items-center gap-2"><input type="number" step="0.1" value={salesTax} onChange={(e) => setSalesTax(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /><span className="text-sm">%</span></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Monthly Lease Payment</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.monthlyPayment)}</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Payment Breakdown</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Depreciation:</span><span className="font-semibold">{formatCurrency(result.depreciation)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Finance Charge:</span><span className="font-semibold">{formatCurrency(result.financeCharge)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Sales Tax:</span><span className="font-semibold">{formatCurrency(result.monthlyTax)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Equivalent APR:</span><span className="font-semibold">{result.apr}%</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Total Lease Cost:</span><span className="font-bold text-accent">{formatCurrency(result.totalCost)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter lease details to calculate payment</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
