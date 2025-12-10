"use client";
import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

export default function EstateTaxCalculatorPage() {
  const [estateValue, setEstateValue] = useState('15000000');
  const [debts, setDebts] = useState('200000');
  const [funeralCosts, setFuneralCosts] = useState('15000');
  const [charitableGifts, setCharitableGifts] = useState('0');
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const estate = parseFloat(estateValue) || 0;
    const debt = parseFloat(debts) || 0;
    const funeral = parseFloat(funeralCosts) || 0;
    const charity = parseFloat(charitableGifts) || 0;

    const grossEstate = estate;
    const deductions = debt + funeral + charity;
    const netEstate = grossEstate - deductions;
    const exemption = 13610000;
    const taxableEstate = Math.max(0, netEstate - exemption);
    const estateTax = taxableEstate * 0.40;
    const effectiveRate = netEstate > 0 ? (estateTax / netEstate) * 100 : 0;

    setResult({ grossEstate, deductions, netEstate, exemption, taxableEstate, estateTax, effectiveRate: effectiveRate.toFixed(1) });
  };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);

  return (
    <CalculatorLayout title="Estate Tax Calculator" description="Calculate federal estate tax on your estate value.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Estate Details</h3>
            <div className="space-y-3">
              <div><label className="block text-sm font-bold mb-1">Total Estate Value</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={estateValue} onChange={(e) => setEstateValue(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Outstanding Debts</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={debts} onChange={(e) => setDebts(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Funeral Costs</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={funeralCosts} onChange={(e) => setFuneralCosts(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
              <div><label className="block text-sm font-bold mb-1">Charitable Gifts</label><div className="flex items-center gap-2"><span className="text-sm">$</span><input type="number" value={charitableGifts} onChange={(e) => setCharitableGifts(e.target.value)} className="flex-1 border border-input rounded-[3px] px-3 py-2 text-sm" /></div></div>
            </div>
          </div>
          <button onClick={calculate} className="w-full bg-accent text-white px-6 py-3 rounded-[3px] hover:bg-[#7c4ee4] transition-colors font-bold">Calculate</button>
        </div>
        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-card p-5 rounded-[3px] border-2 border-accent">
                <h3 className="font-bold text-lg mb-2 text-accent">Federal Estate Tax</h3>
                <div className="text-4xl font-bold text-foreground">{formatCurrency(result.estateTax)}</div>
                <div className="text-sm text-muted-foreground">Effective Rate: {result.effectiveRate}%</div>
              </div>
              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Estate Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Gross Estate:</span><span className="font-semibold">{formatCurrency(result.grossEstate)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Deductions:</span><span className="font-semibold text-green-600">-{formatCurrency(result.deductions)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">Net Estate:</span><span className="font-semibold">{formatCurrency(result.netEstate)}</span></div>
                  <div className="flex justify-between py-1"><span className="text-muted-foreground">2024 Exemption:</span><span className="font-semibold text-green-600">-{formatCurrency(result.exemption)}</span></div>
                  <div className="flex justify-between py-1 border-t border-border pt-2"><span className="font-bold">Taxable Estate:</span><span className="font-bold">{formatCurrency(result.taxableEstate)}</span></div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground"><p>Enter estate details to calculate tax</p></div>
          )}
        </div>
      </div>
    </CalculatorLayout>
  );
}
