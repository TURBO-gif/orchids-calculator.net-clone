"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
  type: 'regular' | 'honors' | 'ap';
}

interface Semester {
  id: number;
  name: string;
  courses: Course[];
}

export default function GPACalculatorPage() {
  const [semesters, setSemesters] = useState<Semester[]>([
    {
      id: 1,
      name: 'Semester 1',
      courses: [
        { id: 1, name: 'Course 1', grade: 'A', credits: '3', type: 'regular' },
        { id: 2, name: 'Course 2', grade: 'B', credits: '3', type: 'regular' }
      ]
    }
  ]);
  const [result, setResult] = useState<any>(null);
  const [cumulativeGPA, setCumulativeGPA] = useState('');
  const [cumulativeCredits, setCumulativeCredits] = useState('');

  const gradePoints: { [key: string]: number } = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const typeBonus: { [key: string]: number } = {
    'regular': 0,
    'honors': 0.5,
    'ap': 1.0
  };

  const addSemester = () => {
    setSemesters([...semesters, {
      id: Date.now(),
      name: `Semester ${semesters.length + 1}`,
      courses: [{ id: Date.now(), name: 'Course 1', grade: 'A', credits: '3', type: 'regular' }]
    }]);
  };

  const removeSemester = (semesterId: number) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== semesterId));
    }
  };

  const addCourse = (semesterId: number) => {
    setSemesters(semesters.map(s =>
      s.id === semesterId
        ? { ...s, courses: [...s.courses, { id: Date.now(), name: `Course ${s.courses.length + 1}`, grade: 'A', credits: '3', type: 'regular' as const }] }
        : s
    ));
  };

  const removeCourse = (semesterId: number, courseId: number) => {
    setSemesters(semesters.map(s =>
      s.id === semesterId
        ? { ...s, courses: s.courses.filter(c => c.id !== courseId) }
        : s
    ));
  };

  const updateCourse = (semesterId: number, courseId: number, field: keyof Course, value: string) => {
    setSemesters(semesters.map(s =>
      s.id === semesterId
        ? {
            ...s,
            courses: s.courses.map(c =>
              c.id === courseId ? { ...c, [field]: value } : c
            )
          }
        : s
    ));
  };

  const updateSemesterName = (semesterId: number, name: string) => {
    setSemesters(semesters.map(s =>
      s.id === semesterId ? { ...s, name } : s
    ));
  };

  const calculate = () => {
    const semesterResults = semesters.map(semester => {
      let totalUnweightedPoints = 0;
      let totalWeightedPoints = 0;
      let totalCredits = 0;

      semester.courses.forEach(course => {
        const credits = parseFloat(course.credits) || 0;
        const unweightedPoints = gradePoints[course.grade] || 0;
        const weightedPoints = Math.min(unweightedPoints + typeBonus[course.type], 5.0);
        
        totalUnweightedPoints += unweightedPoints * credits;
        totalWeightedPoints += weightedPoints * credits;
        totalCredits += credits;
      });

      return {
        semesterName: semester.name,
        unweightedGPA: totalCredits > 0 ? totalUnweightedPoints / totalCredits : 0,
        weightedGPA: totalCredits > 0 ? totalWeightedPoints / totalCredits : 0,
        credits: totalCredits,
        totalUnweightedPoints,
        totalWeightedPoints
      };
    });

    const totalUnweightedPoints = semesterResults.reduce((sum, s) => sum + s.totalUnweightedPoints, 0);
    const totalWeightedPoints = semesterResults.reduce((sum, s) => sum + s.totalWeightedPoints, 0);
    const totalCredits = semesterResults.reduce((sum, s) => sum + s.credits, 0);

    let cumulativeUnweighted = totalCredits > 0 ? totalUnweightedPoints / totalCredits : 0;
    let cumulativeWeighted = totalCredits > 0 ? totalWeightedPoints / totalCredits : 0;

    if (cumulativeGPA && cumulativeCredits) {
      const prevGPA = parseFloat(cumulativeGPA) || 0;
      const prevCredits = parseFloat(cumulativeCredits) || 0;
      const prevPoints = prevGPA * prevCredits;
      cumulativeUnweighted = (prevPoints + totalUnweightedPoints) / (prevCredits + totalCredits);
      cumulativeWeighted = (prevPoints + totalWeightedPoints) / (prevCredits + totalCredits);
    }

    setResult({
      semesterResults,
      overallUnweighted: cumulativeUnweighted,
      overallWeighted: cumulativeWeighted,
      totalCredits
    });
  };

  return (
    <CalculatorLayout title="GPA Calculator" description="Calculate your unweighted and weighted GPA with support for Honors and AP/IB courses.">
      <div className="space-y-6">
        <div className="bg-card p-4 rounded-[3px] border border-border">
          <h3 className="font-bold text-base mb-3">Previous Cumulative GPA (Optional)</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold mb-1">Previous GPA</label>
              <input
                type="number"
                step="0.01"
                value={cumulativeGPA}
                onChange={(e) => setCumulativeGPA(e.target.value)}
                placeholder="e.g., 3.5"
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-1">Previous Credits</label>
              <input
                type="number"
                value={cumulativeCredits}
                onChange={(e) => setCumulativeCredits(e.target.value)}
                placeholder="e.g., 60"
                className="w-full border border-input rounded-[3px] px-3 py-2 text-sm"
              />
            </div>
          </div>
        </div>

        {semesters.map((semester, semIdx) => (
          <div key={semester.id} className="bg-card p-4 rounded-[3px] border border-border">
            <div className="flex items-center justify-between mb-3">
              <input
                type="text"
                value={semester.name}
                onChange={(e) => updateSemesterName(semester.id, e.target.value)}
                className="font-bold text-base border-0 bg-transparent focus:outline-none focus:ring-1 focus:ring-accent px-1 rounded"
              />
              {semesters.length > 1 && (
                <button
                  onClick={() => removeSemester(semester.id)}
                  className="text-destructive hover:underline text-sm"
                >
                  Remove Semester
                </button>
              )}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[#4a7c9e] text-white">
                  <tr>
                    <th className="text-left p-2 font-bold">Course Name</th>
                    <th className="text-left p-2 font-bold">Type</th>
                    <th className="text-left p-2 font-bold">Grade</th>
                    <th className="text-left p-2 font-bold">Credits</th>
                    <th className="text-left p-2 font-bold"></th>
                  </tr>
                </thead>
                <tbody>
                  {semester.courses.map((course) => (
                    <tr key={course.id} className="border-b border-border">
                      <td className="p-2">
                        <input
                          type="text"
                          value={course.name}
                          onChange={(e) => updateCourse(semester.id, course.id, 'name', e.target.value)}
                          className="w-full border border-input rounded-[3px] px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="p-2">
                        <select
                          value={course.type}
                          onChange={(e) => updateCourse(semester.id, course.id, 'type', e.target.value)}
                          className="border border-input rounded-[3px] px-2 py-1 text-sm"
                        >
                          <option value="regular">Regular</option>
                          <option value="honors">Honors (+0.5)</option>
                          <option value="ap">AP/IB (+1.0)</option>
                        </select>
                      </td>
                      <td className="p-2">
                        <select
                          value={course.grade}
                          onChange={(e) => updateCourse(semester.id, course.id, 'grade', e.target.value)}
                          className="border border-input rounded-[3px] px-2 py-1 text-sm"
                        >
                          {Object.keys(gradePoints).map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                      </td>
                      <td className="p-2">
                        <input
                          type="number"
                          value={course.credits}
                          onChange={(e) => updateCourse(semester.id, course.id, 'credits', e.target.value)}
                          className="w-16 border border-input rounded-[3px] px-2 py-1 text-sm"
                        />
                      </td>
                      <td className="p-2">
                        {semester.courses.length > 1 && (
                          <button
                            onClick={() => removeCourse(semester.id, course.id)}
                            className="text-destructive hover:underline text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <button
              onClick={() => addCourse(semester.id)}
              className="mt-2 text-[#4a7c9e] hover:underline text-sm font-bold"
            >
              + Add Course
            </button>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            onClick={addSemester}
            className="text-[#4a7c9e] hover:underline font-bold"
          >
            + Add Semester
          </button>
          <button
            onClick={calculate}
            className="flex-1 bg-[#5f8d4e] text-white px-6 py-3 rounded-[3px] hover:bg-[#4d7a3c] transition-colors font-bold"
          >
            Calculate GPA
          </button>
        </div>

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#4a7c9e] text-white p-5 rounded-[3px]">
                <div className="text-center">
                  <div className="text-sm mb-1 opacity-90">Unweighted GPA</div>
                  <div className="text-4xl font-bold">{result.overallUnweighted.toFixed(2)}</div>
                  <div className="text-sm opacity-90 mt-1">4.0 Scale</div>
                </div>
              </div>
              <div className="bg-[#5f8d4e] text-white p-5 rounded-[3px]">
                <div className="text-center">
                  <div className="text-sm mb-1 opacity-90">Weighted GPA</div>
                  <div className="text-4xl font-bold">{result.overallWeighted.toFixed(2)}</div>
                  <div className="text-sm opacity-90 mt-1">5.0 Scale</div>
                </div>
              </div>
            </div>

            <div className="bg-card p-4 rounded-[3px] border border-border">
              <h3 className="font-bold text-base mb-3">GPA by Semester</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-[#4a7c9e] text-white">
                    <tr>
                      <th className="text-left p-2 font-bold">Semester</th>
                      <th className="text-right p-2 font-bold">Credits</th>
                      <th className="text-right p-2 font-bold">Unweighted GPA</th>
                      <th className="text-right p-2 font-bold">Weighted GPA</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.semesterResults.map((sem: any, idx: number) => (
                      <tr key={idx} className="border-b border-border hover:bg-muted/50">
                        <td className="p-2">{sem.semesterName}</td>
                        <td className="p-2 text-right">{sem.credits}</td>
                        <td className="p-2 text-right font-semibold">{sem.unweightedGPA.toFixed(2)}</td>
                        <td className="p-2 text-right font-semibold text-[#2e7d32]">{sem.weightedGPA.toFixed(2)}</td>
                      </tr>
                    ))}
                    <tr className="bg-[#e8f5e9]">
                      <td className="p-2 font-bold">Cumulative</td>
                      <td className="p-2 text-right font-bold">{result.totalCredits}</td>
                      <td className="p-2 text-right font-bold">{result.overallUnweighted.toFixed(2)}</td>
                      <td className="p-2 text-right font-bold text-[#2e7d32]">{result.overallWeighted.toFixed(2)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-card p-4 rounded-[3px] border border-border">
              <h3 className="font-bold text-base mb-3">Grade Point Scale</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                {Object.entries(gradePoints).map(([grade, points]) => (
                  <div key={grade} className="flex justify-between p-2 bg-muted rounded-[3px]">
                    <span className="font-semibold">{grade}</span>
                    <span>{points.toFixed(1)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
