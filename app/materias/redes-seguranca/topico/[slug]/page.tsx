'use client';

import { use, useState } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getRedesTopicBySlug, getRedesPrevNext } from '@/data/redes-seguranca';
import { CodeBlock } from '@/components/CodeBlock';
import { QuizCard } from '@/components/QuizCard';

const MODULE = '/materias/redes-seguranca';

export default function RedesTopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const topic = getRedesTopicBySlug(slug);
  if (!topic) notFound();

  const { prev, next } = getRedesPrevNext(slug);
  const [quizDone, setQuizDone] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <Link href="/materias" style={{ color: 'var(--text-muted)' }}>Matérias</Link>
        <ChevronRight size={14} />
        <Link href={`${MODULE}/topicos`} style={{ color: 'var(--text-muted)' }}>Redes e Segurança</Link>
        <ChevronRight size={14} />
        <span style={{ color: 'var(--text)' }}>{topic.title}</span>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-5xl">{topic.emoji}</span>
          <div>
            <span
              className="text-xs font-mono font-bold px-2 py-0.5 rounded mb-1 inline-block"
              style={{ background: 'var(--border)', color: 'var(--text-muted)' }}
            >
              #{String(topic.number).padStart(2, '0')}
            </span>
            <h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>{topic.title}</h1>
          </div>
        </div>
        <p className="text-lg mt-2" style={{ color: 'var(--text-muted)' }}>{topic.shortDescription}</p>
      </header>

      {/* Seções */}
      <div className="space-y-10 mb-16">
        {topic.sections.map((section, idx) => (
          <section key={idx}>
            <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text)' }}>{section.title}</h2>

            {section.content && (
              <div className="text-base leading-7 whitespace-pre-wrap mb-4 font-mono text-sm" style={{ color: 'var(--text-muted)' }}>
                {section.content.split('\n').map((line, i) => (
                  <span key={i}>
                    {line.startsWith('•') ? (
                      <span><span style={{ color: 'var(--accent)' }}>•</span>{line.slice(1)}</span>
                    ) : line}
                    {'\n'}
                  </span>
                ))}
              </div>
            )}

            {section.codeExample && <CodeBlock example={section.codeExample} />}

            {section.tip && (
              <div
                className="flex gap-3 p-4 rounded-xl text-sm"
                style={{ background: 'rgba(255,212,59,0.08)', border: '1px solid rgba(255,212,59,0.4)', color: 'var(--text)' }}
              >
                <span className="text-xl shrink-0">💡</span>
                <p>{section.tip}</p>
              </div>
            )}
          </section>
        ))}
      </div>

      <hr style={{ borderColor: 'var(--border)', marginBottom: '2rem' }} />

      {/* Quiz */}
      <div className="mb-10">
        <QuizCard questions={topic.quiz} onComplete={() => setQuizDone(true)} />
      </div>

      {/* Navegação */}
      <div className="flex justify-between gap-4">
        {prev ? (
          <Link
            href={`${MODULE}/topico/${prev.slug}`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl flex-1 text-left"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            <ChevronLeft size={18} style={{ color: 'var(--accent)' }} />
            <div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Anterior</div>
              <div className="font-medium text-sm">{prev.emoji} {prev.title}</div>
            </div>
          </Link>
        ) : (
          <Link
            href={`${MODULE}/topicos`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl flex-1 text-left"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            <ChevronLeft size={18} style={{ color: 'var(--accent)' }} />
            <div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Voltar</div>
              <div className="font-medium text-sm">🔒 Redes e Segurança</div>
            </div>
          </Link>
        )}

        {next ? (
          <Link
            href={`${MODULE}/topico/${next.slug}`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl flex-1 text-right justify-end"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            <div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Próximo</div>
              <div className="font-medium text-sm">{next.emoji} {next.title}</div>
            </div>
            <ChevronRight size={18} style={{ color: 'var(--accent)' }} />
          </Link>
        ) : (
          <Link
            href={`${MODULE}/topicos`}
            className="flex items-center gap-2 px-4 py-3 rounded-xl flex-1 text-right justify-end"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', color: 'var(--text)' }}
          >
            <div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>Concluído!</div>
              <div className="font-medium text-sm">🔒 Ver todos os tópicos</div>
            </div>
            <ChevronRight size={18} style={{ color: 'var(--accent)' }} />
          </Link>
        )}
      </div>
    </div>
  );
}
