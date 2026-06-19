'use client'

import { useState } from 'react'
import type { QuizQuestion } from '@/types/tax'

interface QuizEngineProps {
  questions: QuizQuestion[]
  onComplete: (answers: Record<string, number>) => void
}

export default function QuizEngine({ questions, onComplete }: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, number>>({})

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex) / questions.length) * 100

  function handleOptionSelect(score: number) {
    const newAnswers = { ...answers, [currentQuestion.id]: score }
    setAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      onComplete(newAnswers)
    }
  }

  function handleBack() {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="w-full bg-surface-raised rounded-full h-2 overflow-hidden">
          <div
            className="bg-teal h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentIndex + 1}
            aria-valuemin={1}
            aria-valuemax={questions.length}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-surface-raised rounded-xl border border-white/10 p-6 space-y-2">
        <h2 className="text-lg font-semibold text-foreground leading-snug">
          {currentQuestion.text}
        </h2>
        {currentQuestion.subtext && (
          <p className="text-sm text-muted-foreground">{currentQuestion.subtext}</p>
        )}
      </div>

      {/* Options */}
      <div className="space-y-3" role="radiogroup" aria-label={currentQuestion.text}>
        {currentQuestion.options.map((option) => {
          const isSelected = answers[currentQuestion.id] === option.score && answers[currentQuestion.id] !== undefined

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => handleOptionSelect(option.score)}
              className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${
                isSelected
                  ? 'border-teal bg-teal/10 text-foreground'
                  : 'border-white/15 bg-surface-raised text-muted-foreground hover:border-white/30 hover:text-foreground hover:bg-white/5'
              }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {/* Back button */}
      {currentIndex > 0 && (
        <button
          type="button"
          onClick={handleBack}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to previous question
        </button>
      )}
    </div>
  )
}
