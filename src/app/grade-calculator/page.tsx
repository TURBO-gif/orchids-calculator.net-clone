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
  const [mode, setMode] = useState<'calculate' | 'final'>('calculate');
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: 1, name: 'Homework', grade: '85', weight: '20' },
    { id: 2, name: 'Midterm', grade: '90', weight: '30' },
    { id: 3, name: 'Final Exam', grade: '', weight: '50' }
  ]);
  const [targetGrade, setTargetGrade] = useState('90');
  const [result, setResult] = useState<any>(null);

  const addAssignment = () => {
    setAssignments([...assignments, { id: Date.now(), name: `Category ${assignments.length + 1}`, grade: '', weight: '10' }]);
  };

  const removeAssignment = (id: number) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  const updateAssignment = (id: number, field: keyof Assignment, value: string) => {
    setAssignments(assignments.map(a => a.id === id ? { ...a, [field]: value } : a));
  };

  const calculate = () => {
    const completedAssignments = assignments.filter(a => a.grade !== '');
    const incompleteAssignments = assignments.filter(a => a.grade === '');
    
    let totalWeightedGrade = 0;
    let completedWeight = 0;
    let totalWeight = 0;

    assignments.forEach(assignment => {
      const weight = parseFloat(assignment.weight) || 0;
      totalWeight += weight;
      
      if (assignment.grade !== '') {
        const grade = parseFloat(assignment.grade) || 0;
        totalWeightedGrade += grade * weight;
        completedWeight += weight;
      }
    });

    const currentGrade = completedWeight > 0 ? totalWeightedGrade / completedWeight : 0;
    const projectedGrade = totalWeight > 0 ? totalWeightedGrade / totalWeight : 0;

    const remainingWeight = totalWeight - completedWeight;
    const target = parseFloat(targetGrade) || 0;
    let neededGrade = 0;
    if (remainingWeight > 0) {
      neededGrade = ((target * totalWeight) - totalWeightedGrade) / remainingWeight;
    }

    let letterGrade = 'F';
    if (currentGrade >= 93) letterGrade = 'A';
    else if (currentGrade >= 90) letterGrade = 'A-';
    else if (currentGrade >= 87) letterGrade = 'B+';
    else if (currentGrade >= 83) letterGrade = 'B';
    else if (currentGrade >= 80) letterGrade = 'B-';
    else if (currentGrade >= 77) letterGrade = 'C+';
    else if (currentGrade >= 73) letterGrade = 'C';
    else if (currentGrade >= 70) letterGrade = 'C-';
    else if (currentGrade >= 67) letterGrade = 'D+';
    else if (currentGrade >= 63) letterGrade = 'D';
    else if (currentGrade >= 60) letterGrade = 'D-';

    const gradeTargets = [
      { target: 'A (93%)', needed: remainingWeight > 0 ? ((93 * totalWeight) - totalWeightedGrade) / remainingWeight : null },
      { target: 'A- (90%)', needed: remainingWeight > 0 ? ((90 * totalWeight) - totalWeightedGrade) / remainingWeight : null },
      { target: 'B+ (87%)', needed: remainingWeight > 0 ? ((87 * totalWeight) - totalWeightedGrade) / remainingWeight : null },
      { target: 'B (83%)', needed: remainingWeight > 0 ? ((83 * totalWeight) - totalWeightedGrade) / remainingWeight : null },
      { target: 'B- (80%)', needed: remainingWeight > 0 ? ((80 * totalWeight) - totalWeightedGrade) / remainingWeight : null },
      { target: 'C (73%)', needed: remainingWeight > 0 ? ((73 * totalWeight) - totalWeightedGrade) / remainingWeight : null }
    ];

    setResult({
      currentGrade: currentGrade.toFixed(2),
      projectedGrade: projectedGrade.toFixed(2),
      letterGrade,
      totalWeight: totalWeight.toFixed(0),
      completedWeight: completedWeight.toFixed(0),
      remainingWeight: remainingWeight.toFixed(0),
      neededGrade: neededGrade.toFixed(2),
      gradeTargets,
      isPossible: neededGrade <= 100,
      assignments: assignments.map(a => ({
        ...a,
        contribution: a.grade !== '' ? ((parseFloat(a.grade) * parseFloat(a.weight)) / totalWeight).toFixed(2) : '-'
      }))
    });
  };

  return (
    <CalculatorLayout title="Grade Calculator" description="Calculate weighted grade from multiple categories and find what you need on remaining assignments.">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-4">Grade Categories</h3>
            
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-2 text-xs font-bold text-muted-foreground pb-2 border-b border-border">
                <div className="col-span-4">Category</div>
                <div className="col-span-3">Grade (%)</div>
                <div className="col-span-3">Weight (%)</div>
                <div className="col-span-2"></div>
              </div>
              
              {assignments.map((assignment) => (
                <div key={assignment.id} className="grid grid-cols-12 gap-2 items-center">
                  <input
                    type="text"
                    value={assignment.name}
                    onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                    className="col-span-4 border border-input rounded-[3px] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="number"
                    value={assignment.grade}
                    onChange={(e) => updateAssignment(assignment.id, 'grade', e.target.value)}
                    placeholder="—"
                    className="col-span-3 border border-input rounded-[3px] px-2 py-1.5 text-sm"
                  />
                  <input
                    type="number"
                    value={assignment.weight}
                    onChange={(e) => updateAssignment(assignment.id, 'weight', e.target.value)}
                    className="col-span-3 border border-input rounded-[3px] px-2 py-1.5 text-sm"
                  />
                  <div className="col-span-2">
                    {assignments.length > 1 && (
                      <button onClick={() => removeAssignment(assignment.id)} className="text-red-500 text-sm hover:underline">X</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <button onClick={addAssignment} className="mt-3 text-[#4a7c9e] text-sm font-semibold hover:underline">+ Add Category</button>
          </div>

          <div className="bg-card p-4 rounded-[3px] border border-border">
            <h3 className="font-bold text-base mb-3">Target Grade</h3>
            <div className="flex items-center gap-2">
              <span className="text-sm">I want at least</span>
              <input
                type="number"
                value={targetGrade}
                onChange={(e) => setTargetGrade(e.target.value)}
                className="w-20 border border-input rounded-[3px] px-3 py-2 text-sm text-center"
              />
              <span className="text-sm">% in the class</span>
            </div>
          </div>

          <button onClick={calculate} className="w-full bg-[#4a7c9e] text-white px-6 py-3 rounded-[3px] hover:bg-[#3d6a8a] transition-colors font-bold">Calculate</button>
        </div>

        <div className="space-y-4">
          {result ? (
            <>
              <div className="bg-[#e8f4e8] p-5 rounded-[3px] border-2 border-[#008137]">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-1">Current Grade</div>
                  <div className="text-5xl font-bold text-[#008137] mb-1">{result.currentGrade}%</div>
                  <div className="text-lg font-semibold text-[#008137]">{result.letterGrade}</div>
                </div>
              </div>

              {parseFloat(result.remainingWeight) > 0 && (
                <div className={`p-4 rounded-[3px] border ${result.isPossible && parseFloat(result.neededGrade) <= 100 ? 'bg-[#e8f0f4] border-[#4a7c9e]' : 'bg-red-50 border-red-300'}`}>
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">To get {targetGrade}%, you need</div>
                    <div className={`text-3xl font-bold ${parseFloat(result.neededGrade) <= 100 ? 'text-[#4a7c9e]' : 'text-red-600'}`}>
                      {parseFloat(result.neededGrade) <= 100 ? `${result.neededGrade}%` : 'Not Possible'}
                    </div>
                    <div className="text-sm text-muted-foreground">on remaining {result.remainingWeight}% of grade</div>
                  </div>
                </div>
              )}

              <div className="bg-card p-4 rounded-[3px] border border-border">
                <h3 className="font-bold text-base mb-3">Grade Summary</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Current Grade:</span>
                    <span className="font-semibold">{result.currentGrade}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Completed Weight:</span>
                    <span className="font-semibold">{result.completedWeight}%</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border">
                    <span className="text-muted-foreground">Remaining Weight:</span>
                    <span className="font-semibold">{result.remainingWeight}%</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-muted-foreground">Total Weight:</span>
                    <span className="font-semibold">{result.totalWeight}%</span>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-muted p-8 rounded-[3px] text-center text-muted-foreground">
              <p>Enter grades and click Calculate</p>
            </div>
          )}
        </div>
      </div>

      {result && parseFloat(result.remainingWeight) > 0 && (
        <div className="mt-8 bg-card rounded-[3px] border border-border overflow-hidden">
          <h3 className="font-bold text-lg p-4 border-b border-border">Grade Needed for Each Target</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#4a7c9e] text-white">
                <tr>
                  <th className="text-left p-3 font-bold">Target Grade</th>
                  <th className="text-right p-3 font-bold">Needed on Remaining ({result.remainingWeight}%)</th>
                </tr>
              </thead>
              <tbody>
                {result.gradeTargets.map((t: any, index: number) => (
                  <tr key={index} className="border-t border-border hover:bg-muted/50">
                    <td className="p-3 font-semibold">{t.target}</td>
                    <td className="p-3 text-right">
                      <span className={`font-bold ${t.needed !== null && t.needed <= 100 ? 'text-[#008137]' : t.needed !== null && t.needed <= 110 ? 'text-amber-600' : 'text-red-600'}`}>
                        {t.needed !== null ? (t.needed <= 0 ? 'Already achieved!' : t.needed > 100 ? 'Not possible' : `${t.needed.toFixed(1)}%`) : 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {result && (
        <div className="mt-6 bg-card rounded-[3px] border border-border overflow-hidden">
          <h3 className="font-bold text-lg p-4 border-b border-border">Category Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#4a7c9e] text-white">
                <tr>
                  <th className="text-left p-3 font-bold">Category</th>
                  <th className="text-right p-3 font-bold">Grade</th>
                  <th className="text-right p-3 font-bold">Weight</th>
                  <th className="text-right p-3 font-bold">Contribution</th>
                </tr>
              </thead>
              <tbody>
                {result.assignments.map((a: any, index: number) => (
                  <tr key={index} className="border-t border-border hover:bg-muted/50">
                    <td className="p-3">{a.name}</td>
                    <td className="p-3 text-right">{a.grade ? `${a.grade}%` : '—'}</td>
                    <td className="p-3 text-right">{a.weight}%</td>
                    <td className="p-3 text-right font-semibold">{a.contribution !== '-' ? `${a.contribution}%` : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8 bg-card rounded-[3px] border border-border overflow-hidden">
        <h3 className="font-bold text-lg p-4 border-b border-border">Letter Grade Scale</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4 text-sm">
          {[
            { letter: 'A', range: '93-100%' },
            { letter: 'A-', range: '90-92%' },
            { letter: 'B+', range: '87-89%' },
            { letter: 'B', range: '83-86%' },
            { letter: 'B-', range: '80-82%' },
            { letter: 'C+', range: '77-79%' },
            { letter: 'C', range: '73-76%' },
            { letter: 'C-', range: '70-72%' },
            { letter: 'D+', range: '67-69%' },
            { letter: 'D', range: '63-66%' },
            { letter: 'D-', range: '60-62%' },
            { letter: 'F', range: '0-59%' }
          ].map(g => (
            <div key={g.letter} className="flex justify-between">
              <span className="font-semibold">{g.letter}</span>
              <span className="text-muted-foreground">{g.range}</span>
            </div>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
}
