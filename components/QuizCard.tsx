'use client';

import { useState } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import type { QuizQuestion } from '@/lib/types';

interface Props {
  questions: QuizQuestion[];
  onComplete?: (score: number) => void;
}

export function QuizCard({ questions, onComplete }: Props) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [finished, setFinished] = useState(false);

  function handleAnswer(qIdx: number, optIdx: number) {
    if (answers[qIdx] !== null) return;
    const next = [...answers];
    next[qIdx] = optIdx;
    setAnswers(next);

    const allAnswered = next.every(a => a !== null);
    if (allAnswered) {
      const score = next.filter((a, i) => a === questions[i].correctIndex).length;
      onComplete?.(score);
      setFinished(true);
    }
  }

  const score = answers.filter((a, i) => a !== null && a === questions[i].correctIndex).length;
  const answered = answers.filter(a => a !== null).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
          Quiz
        </h2>
        {answered > 0 && (
          <span className="text-sm font-mono" style={{ color: 'var(--accent)' }}>
            {score}/{answered} corretas
          </span>
        )}
      </div>

      {questions.map((q, qIdx) => {
        const selected = answers[qIdx];
        const isAnswered = selected !== null;

        return (
          <div
            key={qIdx}
            className="rounded-xl p-5"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
            }}
          >
            <p className="font-medium mb-4" style={{ color: 'var(--text)' }}>
              <span style={{ color: 'var(--accent)' }}>{qIdx + 1}. </span>
              {q.question}
            </p>

            <div className="space-y-2">
              {q.options.map((opt, oIdx) => {
                let bg = 'var(--bg-card-hover)';
                let border = 'var(--border)';
                let textColor = 'var(--text)';

                if (isAnswered) {
                  if (oIdx === q.correctIndex) {
                    bg = 'rgba(74,222,128,0.1)';
                    border = '#4ade80';
                    textColor = '#4ade80';
                  } else if (oIdx === selected) {
                    bg = 'rgba(248,113,113,0.1)';
                    border = '#f87171';
                    textColor = '#f87171';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleAnswer(qIdx, oIdx)}
                    disabled={isAnswered}
                    className="w-full text-left px-4 py-3 rounded-lg transition-all text-sm flex items-center gap-2"
                    style={{
                      background: bg,
                      border: `1px solid ${border}`,
                      color: textColor,
                      cursor: isAnswered ? 'default' : 'pointer',
                    }}
                  >
                    {isAnswered && oIdx === q.correctIndex && (
                      <CheckCircle2 size={16} className="shrink-0" />
                    )}
                    {isAnswered && oIdx === selected && oIdx !== q.correctIndex && (
                      <XCircle size={16} className="shrink-0" />
                    )}
                    {(!isAnswered || (oIdx !== q.correctIndex && oIdx !== selected)) && (
                      <span
                        className="shrink-0 w-4 h-4 rounded-full border text-xs flex items-center justify-center font-mono"
                        style={{ borderColor: 'var(--text-muted)', color: 'var(--text-muted)' }}
                      >
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                    )}
                    {opt}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div
                className="mt-4 p-3 rounded-lg text-sm"
                style={{
                  background: 'rgba(255,212,59,0.08)',
                  border: '1px solid rgba(255,212,59,0.3)',
                  color: 'var(--text-muted)',
                }}
              >
                <span style={{ color: 'var(--accent)', fontWeight: 600 }}>Explicação: </span>
                {q.explanation}
              </div>
            )}
          </div>
        );
      })}

      {finished && (
        <div
          className="text-center py-6 rounded-xl"
          style={{
            background: score === questions.length
              ? 'rgba(74,222,128,0.08)'
              : 'rgba(255,212,59,0.08)',
            border: `1px solid ${score === questions.length ? '#4ade80' : 'rgba(255,212,59,0.4)'}`,
          }}
        >
          <p className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
            {score === questions.length ? '🎉' : score >= questions.length / 2 ? '👍' : '😅'}{' '}
            {score}/{questions.length}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {score === questions.length
              ? 'Perfeito! Você acertou tudo!'
              : score >= questions.length / 2
              ? 'Bom trabalho! Continue praticando.'
              : 'Revise o conteúdo e tente de novo!'}
          </p>
        </div>
      )}
    </div>
  );
}
