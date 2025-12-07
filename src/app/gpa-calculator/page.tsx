"use client";

import React, { useState } from 'react';
import { CalculatorLayout } from '@/components/calculator-layout';

interface Course {
  id: number;
  grade: string;
  credits: string;
}

export default function GPACalculatorPage() {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, grade: 'A', credits: '3' },
    { id: 2, grade: 'B', credits: '3' }
  ]);
  const [result, setResult] = useState<any>(null);

  const gradePoints: any = {
    'A+': 4.0, 'A': 4.0, 'A-': 3.7,
    'B+': 3.3, 'B': 3.0, 'B-': 2.7,
    'C+': 2.3, 'C': 2.0, 'C-': 1.7,
    'D+': 1.3, 'D': 1.0, 'D-': 0.7,
    'F': 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { id: Date.now(), grade: 'A', credits: '3' }]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(c => c.id !== id));
  };

  const updateCourse = (id: number, field: 'grade' | 'credits', value: string) => {
    setCourses(courses.map(c => c.id === id ? { ...c, [field]: value } : c));
  };

  const calculate = () => {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(course => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * credits;
      totalCredits += credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    setResult({
      gpa: gpa.toFixed(2),
      totalCredits: totalCredits.toFixed(1)
    });
  };

  return (
    <CalculatorLayout title="GPA Calculator" description="Calculate your Grade Point Average (GPA).">
      <div className="space-y-4">
        <div className="space-y-2">
          {courses.map((course, index) => (
            <div key={course.id} className="flex gap-2 items-center">
              <span className="text-sm font-bold w-20">Course {index + 1}</span>
              <select
                value={course.grade}
                onChange={(e) => updateCourse(course.id, 'grade', e.target.value)}
                className="border border-input rounded-[3px] px-3 py-2 text-sm flex-1"
              >
                {Object.keys(gradePoints).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <input
                type="number"
                value={course.credits}
                onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                placeholder="Credits"
                className="border border-input rounded-[3px] px-3 py-2 text-sm w-24"
              />
              {courses.length > 1 && (
                <button
                  onClick={() => removeCourse(course.id)}
                  className="text-destructive hover:underline text-sm"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        
        <button
          onClick={addCourse}
          className="text-link hover:underline text-sm font-bold"
        >
          + Add Course
        </button>

        <button
          onClick={calculate}
          className="bg-accent text-white px-6 py-2 rounded-[3px] hover:bg-[#406b88] transition-colors font-bold w-full"
        >
          Calculate GPA
        </button>

        {result && (
          <div className="mt-6 p-4 bg-muted rounded-[3px]">
            <h3 className="font-bold text-lg mb-3">Results:</h3>
            <div className="space-y-2">
              <p><strong>GPA:</strong> {result.gpa}</p>
              <p><strong>Total Credits:</strong> {result.totalCredits}</p>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
