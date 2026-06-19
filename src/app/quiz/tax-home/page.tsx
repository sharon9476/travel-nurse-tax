'use client'

import { useState } from 'react'
import type { QuizResult } from '@/types/tax'
import { QUIZ_QUESTIONS, evaluateQuiz } from '@/data/quizQuestions'
import QuizEngine from '@/components/tax-home-quiz/QuizEngine'
import QuizResultDisplay from '@/components/tax-home-quiz/QuizResult'
import TaxDisclaimer from '@/components/shared/TaxDisclaimer'

export default function TaxHomeQuizPage() {
  const [result, setResult] = useState<QuizResult | null>(null)

  function handleComplete(answers: Record<string, number>) {
    setResult(evaluateQuiz(answers))
  }

  function handleRetake() {
    setResult(null)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <header className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Tax Home Quiz</h1>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Eight questions based on the IRS three-factor test for tax home validity. Your results will
          tell you where you stand and what to do about it.
        </p>
      </header>

      <TaxDisclaimer />

      {result ? (
        <>
          <QuizResultDisplay result={result} />
          <div className="text-center pt-4">
            <button
              type="button"
              onClick={handleRetake}
              className="text-sm text-muted-foreground hover:text-foreground border border-white/15 px-4 py-2 rounded-md hover:bg-surface-raised transition-colors"
            >
              Retake the quiz
            </button>
          </div>
        </>
      ) : (
        <QuizEngine questions={QUIZ_QUESTIONS} onComplete={handleComplete} />
      )}
    </div>
  )
}
