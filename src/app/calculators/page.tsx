"use client";

import React from 'react';
import Link from 'next/link';
import Header from '@/components/sections/header';
import Footer from '@/components/sections/footer';

const financialCalculators = {
  'Mortgage and Real Estate': [
    { name: 'Mortgage Calculator', href: '/mortgage-calculator' },
    { name: 'Amortization Calculator', href: '/amortization-calculator' },
    { name: 'Mortgage Payoff Calculator', href: '/mortgage-payoff-calculator' },
    { name: 'House Affordability Calculator', href: '/house-affordability-calculator' },
    { name: 'Rent Calculator', href: '/rent-calculator' },
    { name: 'Debt-to-Income Ratio Calculator', href: '/debt-to-income-calculator' },
    { name: 'Real Estate Calculator', href: '/real-estate-calculator' },
    { name: 'Refinance Calculator', href: '/refinance-calculator' },
    { name: 'Rental Property Calculator', href: '/rental-property-calculator' },
    { name: 'APR Calculator', href: '/apr-calculator' },
    { name: 'FHA Loan Calculator', href: '/fha-loan-calculator' },
    { name: 'VA Mortgage Calculator', href: '/va-mortgage-calculator' },
    { name: 'Home Equity Loan Calculator', href: '/home-equity-loan-calculator' },
    { name: 'HELOC Calculator', href: '/heloc-calculator' },
    { name: 'Down Payment Calculator', href: '/down-payment-calculator' },
    { name: 'Rent vs. Buy Calculator', href: '/rent-vs-buy-calculator' },
  ],
  'Retirement': [
    { name: 'Retirement Calculator', href: '/retirement-calculator' },
    { name: '401K Calculator', href: '/401k-calculator' },
    { name: 'Pension Calculator', href: '/pension-calculator' },
    { name: 'Social Security Calculator', href: '/social-security-calculator' },
    { name: 'Annuity Calculator', href: '/annuity-calculator' },
    { name: 'Annuity Payout Calculator', href: '/annuity-payout-calculator' },
    { name: 'Roth IRA Calculator', href: '/roth-ira-calculator' },
    { name: 'IRA Calculator', href: '/ira-calculator' },
    { name: 'RMD Calculator', href: '/rmd-calculator' },
  ],
  'Tax and Salary': [
    { name: 'Income Tax Calculator', href: '/income-tax-calculator' },
    { name: 'Salary Calculator', href: '/salary-calculator' },
    { name: 'Marriage Tax Calculator', href: '/marriage-tax-calculator' },
    { name: 'Estate Tax Calculator', href: '/estate-tax-calculator' },
    { name: 'Take-Home Paycheck Calculator', href: '/take-home-paycheck-calculator' },
    { name: 'Sales Tax Calculator', href: '/sales-tax-calculator' },
    { name: 'Tax Calculator', href: '/tax-calculator' },
  ],
  'Auto': [
    { name: 'Auto Loan Calculator', href: '/auto-loan-calculator' },
    { name: 'Auto Lease Calculator', href: '/auto-lease-calculator' },
  ],
  'Investment': [
    { name: 'Interest Calculator', href: '/interest-calculator' },
    { name: 'Investment Calculator', href: '/investment-calculator' },
    { name: 'Finance Calculator', href: '/finance-calculator' },
    { name: 'Compound Interest Calculator', href: '/compound-interest-calculator' },
    { name: 'Interest Rate Calculator', href: '/interest-rate-calculator' },
    { name: 'Savings Calculator', href: '/savings-calculator' },
    { name: 'Simple Interest Calculator', href: '/simple-interest-calculator' },
  ],
  'Other Financial': [
    { name: 'Loan Calculator', href: '/loan-calculator' },
    { name: 'Payment Calculator', href: '/payment-calculator' },
    { name: 'Currency Calculator', href: '/currency-calculator' },
    { name: 'Inflation Calculator', href: '/inflation-calculator' },
  ],
};

const otherCalculators = {
  'Fitness': [
    { name: 'BMI Calculator', href: '/bmi-calculator' },
    { name: 'Calorie Calculator', href: '/calorie-calculator' },
    { name: 'Body Fat Calculator', href: '/body-fat-calculator' },
    { name: 'BMR Calculator', href: '/bmr-calculator' },
    { name: 'Ideal Weight Calculator', href: '/ideal-weight-calculator' },
    { name: 'Pace Calculator', href: '/pace-calculator' },
    { name: 'Army Body Fat Calculator', href: '/army-body-fat-calculator' },
    { name: 'Lean Body Mass Calculator', href: '/lean-body-mass-calculator' },
    { name: 'Healthy Weight Calculator', href: '/healthy-weight-calculator' },
    { name: 'Calories Burned Calculator', href: '/calories-burned-calculator' },
    { name: 'One Rep Max Calculator', href: '/one-rep-max-calculator' },
    { name: 'Target Heart Rate Calculator', href: '/target-heart-rate-calculator' },
  ],
  'Pregnancy': [
    { name: 'Pregnancy Calculator', href: '/pregnancy-calculator' },
    { name: 'Pregnancy Weight Gain Calculator', href: '/pregnancy-weight-gain-calculator' },
    { name: 'Pregnancy Conception Calculator', href: '/pregnancy-conception-calculator' },
    { name: 'Due Date Calculator', href: '/due-date-calculator' },
    { name: 'Ovulation Calculator', href: '/ovulation-calculator' },
    { name: 'Conception Calculator', href: '/conception-calculator' },
    { name: 'Period Calculator', href: '/period-calculator' },
  ],
  'Other Health': [
    { name: 'Macro Calculator', href: '/macro-calculator' },
    { name: 'Carbohydrate Calculator', href: '/carbohydrate-calculator' },
    { name: 'Protein Calculator', href: '/protein-calculator' },
    { name: 'Fat Intake Calculator', href: '/fat-intake-calculator' },
    { name: 'TDEE Calculator', href: '/tdee-calculator' },
    { name: 'GFR Calculator', href: '/gfr-calculator' },
    { name: 'Body Type Calculator', href: '/body-type-calculator' },
    { name: 'Body Surface Area Calculator', href: '/body-surface-area-calculator' },
    { name: 'BAC Calculator', href: '/bac-calculator' },
  ],
  'Math': [
    { name: 'Scientific Calculator', href: '/scientific-calculator' },
    { name: 'Fraction Calculator', href: '/fraction-calculator' },
    { name: 'Percentage Calculator', href: '/percentage-calculator' },
    { name: 'Triangle Calculator', href: '/triangle-calculator' },
    { name: 'Volume Calculator', href: '/volume-calculator' },
    { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator' },
    { name: 'Random Number Generator', href: '/random-number-generator' },
  ],
  'Other': [
    { name: 'Age Calculator', href: '/age-calculator' },
    { name: 'Date Calculator', href: '/date-calculator' },
    { name: 'Time Calculator', href: '/time-calculator' },
    { name: 'Hours Calculator', href: '/hours-calculator' },
    { name: 'GPA Calculator', href: '/gpa-calculator' },
    { name: 'Grade Calculator', href: '/grade-calculator' },
    { name: 'Concrete Calculator', href: '/concrete-calculator' },
    { name: 'IP Subnet Calculator', href: '/ip-subnet-calculator' },
    { name: 'Bra Size Calculator', href: '/bra-size-calculator' },
    { name: 'Password Generator', href: '/password-generator' },
    { name: 'Dice Roller', href: '/dice-roller' },
    { name: 'Conversion Calculator', href: '/conversion-calculator' },
  ],
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[80px] pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">All Calculators</h1>
          <p className="text-muted-foreground text-center mb-12">Browse our complete collection of financial and utility calculators</p>
          
          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Financial Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(financialCalculators).map(([category, calcs]) => (
              <div key={category} className="bg-card rounded-lg border border-border p-5">
                <h3 className="font-bold text-lg mb-4 text-accent">{category}</h3>
                <ul className="space-y-2">
                  {calcs.map((calc) => (
                    <li key={calc.href}>
                      <Link href={calc.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                        {calc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Other Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(otherCalculators).map(([category, calcs]) => (
              <div key={category} className="bg-card rounded-lg border border-border p-5">
                <h3 className="font-bold text-lg mb-4 text-accent">{category}</h3>
                <ul className="space-y-2">
                  {calcs.map((calc) => (
                    <li key={calc.href}>
                      <Link href={calc.href} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-muted-foreground"></span>
                        {calc.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}