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

const fitnessHealthCalculators = {
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
};

const mathCalculators = {
  'Math': [
    { name: 'Scientific Calculator', href: '/scientific-calculator' },
    { name: 'Fraction Calculator', href: '/fraction-calculator' },
    { name: 'Percentage Calculator', href: '/percentage-calculator' },
    { name: 'Random Number Generator', href: '/random-number-generator' },
    { name: 'Percent Error Calculator', href: '/percent-error-calculator' },
    { name: 'Exponent Calculator', href: '/exponent-calculator' },
    { name: 'Binary Calculator', href: '/binary-calculator' },
    { name: 'Hex Calculator', href: '/hex-calculator' },
    { name: 'Half-Life Calculator', href: '/half-life-calculator' },
    { name: 'Quadratic Formula Calculator', href: '/quadratic-formula-calculator' },
    { name: 'Log Calculator', href: '/log-calculator' },
    { name: 'Ratio Calculator', href: '/ratio-calculator' },
    { name: 'Root Calculator', href: '/root-calculator' },
    { name: 'LCM Calculator', href: '/lcm-calculator' },
    { name: 'GCF Calculator', href: '/gcf-calculator' },
    { name: 'Factor Calculator', href: '/factor-calculator' },
    { name: 'Rounding Calculator', href: '/rounding-calculator' },
    { name: 'Matrix Calculator', href: '/matrix-calculator' },
    { name: 'Scientific Notation Calculator', href: '/scientific-notation-calculator' },
    { name: 'Big Number Calculator', href: '/big-number-calculator' },
  ],
  'Statistics': [
    { name: 'Standard Deviation Calculator', href: '/standard-deviation-calculator' },
    { name: 'Number Sequence Calculator', href: '/number-sequence-calculator' },
    { name: 'Sample Size Calculator', href: '/sample-size-calculator' },
    { name: 'Probability Calculator', href: '/probability-calculator' },
    { name: 'Statistics Calculator', href: '/statistics-calculator' },
    { name: 'Mean, Median, Mode, Range Calculator', href: '/mean-median-mode-range-calculator' },
    { name: 'Permutation and Combination Calculator', href: '/permutation-combination-calculator' },
    { name: 'Z-score Calculator', href: '/z-score-calculator' },
    { name: 'Confidence Interval Calculator', href: '/confidence-interval-calculator' },
  ],
  'Geometry': [
    { name: 'Triangle Calculator', href: '/triangle-calculator' },
    { name: 'Volume Calculator', href: '/volume-calculator' },
    { name: 'Slope Calculator', href: '/slope-calculator' },
    { name: 'Area Calculator', href: '/area-calculator' },
    { name: 'Distance Calculator', href: '/distance-calculator' },
    { name: 'Circle Calculator', href: '/circle-calculator' },
    { name: 'Surface Area Calculator', href: '/surface-area-calculator' },
    { name: 'Pythagorean Theorem Calculator', href: '/pythagorean-theorem-calculator' },
    { name: 'Right Triangle Calculator', href: '/right-triangle-calculator' },
  ],
};

const otherCalculators = {
  'Date and Time': [
    { name: 'Age Calculator', href: '/age-calculator' },
    { name: 'Date Calculator', href: '/date-calculator' },
    { name: 'Time Calculator', href: '/time-calculator' },
    { name: 'Hours Calculator', href: '/hours-calculator' },
    { name: 'Time Card Calculator', href: '/time-card-calculator' },
    { name: 'Time Zone Calculator', href: '/time-zone-calculator' },
    { name: 'Time Duration Calculator', href: '/time-duration-calculator' },
    { name: 'Day Counter', href: '/day-counter' },
    { name: 'Day of the Week Calculator', href: '/day-of-the-week-calculator' },
  ],
  'Housing/Building': [
    { name: 'Concrete Calculator', href: '/concrete-calculator' },
    { name: 'BTU Calculator', href: '/btu-calculator' },
    { name: 'Square Footage Calculator', href: '/square-footage-calculator' },
    { name: 'Stair Calculator', href: '/stair-calculator' },
    { name: 'Roofing Calculator', href: '/roofing-calculator' },
    { name: 'Tile Calculator', href: '/tile-calculator' },
    { name: 'Mulch Calculator', href: '/mulch-calculator' },
    { name: 'Gravel Calculator', href: '/gravel-calculator' },
  ],
  'Internet': [
    { name: 'IP Subnet Calculator', href: '/ip-subnet-calculator' },
    { name: 'Password Generator', href: '/password-generator' },
    { name: 'Bandwidth Calculator', href: '/bandwidth-calculator' },
  ],
  'Everyday Utility': [
    { name: 'GPA Calculator', href: '/gpa-calculator' },
    { name: 'Grade Calculator', href: '/grade-calculator' },
    { name: 'Bra Size Calculator', href: '/bra-size-calculator' },
    { name: 'Shoe Size Conversion', href: '/shoe-size-conversion' },
    { name: 'Tip Calculator', href: '/tip-calculator' },
    { name: 'Golf Handicap Calculator', href: '/golf-handicap-calculator' },
    { name: 'Sleep Calculator', href: '/sleep-calculator' },
  ],
  'Weather': [
    { name: 'Wind Chill Calculator', href: '/wind-chill-calculator' },
    { name: 'Heat Index Calculator', href: '/heat-index-calculator' },
    { name: 'Dew Point Calculator', href: '/dew-point-calculator' },
  ],
  'Various Measurements/Units': [
    { name: 'Height Calculator', href: '/height-calculator' },
    { name: 'Conversion Calculator', href: '/conversion-calculator' },
    { name: 'GDP Calculator', href: '/gdp-calculator' },
    { name: 'Density Calculator', href: '/density-calculator' },
    { name: 'Mass Calculator', href: '/mass-calculator' },
    { name: 'Weight Calculator', href: '/weight-calculator' },
    { name: 'Speed Calculator', href: '/speed-calculator' },
    { name: 'Molarity Calculator', href: '/molarity-calculator' },
    { name: 'Molecular Weight Calculator', href: '/molecular-weight-calculator' },
    { name: 'Roman Numeral Converter', href: '/roman-numeral-converter' },
  ],
  'Electronics/Circuits': [
    { name: 'Voltage Drop Calculator', href: '/voltage-drop-calculator' },
    { name: 'Resistor Calculator', href: '/resistor-calculator' },
    { name: 'Ohms Law Calculator', href: '/ohms-law-calculator' },
    { name: 'Electricity Calculator', href: '/electricity-calculator' },
  ],
  'Transportation': [
    { name: 'Fuel Cost Calculator', href: '/fuel-cost-calculator' },
    { name: 'Gas Mileage Calculator', href: '/gas-mileage-calculator' },
    { name: 'Horsepower Calculator', href: '/horsepower-calculator' },
    { name: 'Engine Horsepower Calculator', href: '/engine-horsepower-calculator' },
    { name: 'Mileage Calculator', href: '/mileage-calculator' },
    { name: 'Tire Size Calculator', href: '/tire-size-calculator' },
  ],
  'Entertainment/Anecdotes': [
    { name: 'Dice Roller', href: '/dice-roller' },
    { name: 'Love Calculator', href: '/love-calculator' },
  ],
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-[80px] pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-center">All Calculators</h1>
          <p className="text-muted-foreground text-center mb-12">Browse our complete collection of calculators</p>
          
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

          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Fitness & Health Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(fitnessHealthCalculators).map(([category, calcs]) => (
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

          <h2 className="text-2xl font-bold mb-6 border-b border-border pb-2">Math Calculators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {Object.entries(mathCalculators).map(([category, calcs]) => (
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