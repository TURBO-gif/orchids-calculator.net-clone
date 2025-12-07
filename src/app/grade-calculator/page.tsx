"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

interface Assignment {
  id: number;
  name: string;
  grade: string;
  weight: string;
}

export default function GradeCalculatorPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: 'Homework', grade: '85', weight: '20' },
    { id: 2, name: 'Midterm', grade: '90', weight: '30' },
    { id: 3, name: 'Final', grade: '88', weight: '50' }
  ]);
  const [result, setResult] = useState<any>(null);

  const addAssignment = () => {
    setAssignments([...assignments, { id: Date.now(), name: 'Assignment', grade: '0', weight: '10' }]);
  };

  const removeAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const updateAssignment = (id: number, field: keyof Assignment, value: string) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const calculate = () => {
    let totalWeightedGrade = 0;
    let totalWeight = 0;

    assignments.forEach(assignment => {
      const grade = parseFloat(assignment.grade) || 0;
      const weight = parseFloat(assignment.weight) || 0;
      totalWeightedGrade += grade * weight;
      totalWeight += weight;
    });

    const finalGrade = totalWeight > 0 ? totalWeightedGrade / totalWeight : 0;

    let letterGrade = 'F';
    if (finalGrade >= 90) letterGrade = 'A';
    else if (finalGrade >= 80) letterGrade = 'B';
    else if (finalGrade >= 70) letterGrade = 'C';
    else if (finalGrade >= 60) letterGrade = 'D';

    setResult({
      finalGrade: finalGrade.toFixed(2),
      letterGrade
    });
  };

  return (
    <CalculatorLayout title="Grade Calculator" description="Calculate weighted grade from multiple assignments.">
      <div className="space-y-4">
        <div className="space-y-2">
          {assignments.map((assignment, index) => (
            <div key={assignment.id} className="grid grid-cols-12 gap-2 items-center">
              <input
                type="text"
                value={assignment.name}
                onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                placeholder="Assignment name"
                className="col-span-4 border border-input rounded-[3px] px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={assignment.grade}
                onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                placeholder="Grade"
                className="col-span-3 border border-input rounded-[3px] px-3 py-2 text-sm"
              />
              <input
                type="number"
                value={assignment.weight}
                onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                placeholder="Weight %"
                className="col-span-3 border border-input rounded-[3px] px-3 py-2 text-sm"
              />
              {assignments.length > 1 && (
                <button
                  onClick={() => removeAssignment(assignment.id)}
                  className="col-span-2 text-destructive hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button
          onClick={addAssignment}
          className="text-link hover:underline text-sm font-bold"
        >
          + Add Assignment
        </button>

        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold w-full"
        >
          Calculate Grade
        </button>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            <div className="space-y-2">
              <p className="text-2xl font-bold">{result.finalGrade}% ({result.letterGrade})</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
