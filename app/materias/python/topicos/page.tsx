import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { allTopics } from '@/data/topics';
import { TopicCard } from '@/components/TopicCard';
import { ProgressBar } from '@/components/ProgressBar';

export default function PythonPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/materias" className="flex items-center gap-1 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <ChevronLeft size={16} /> Matérias
      </Link>

      <div className="flex items-start gap-4 mb-8">
        <span className="text-5xl">🐍</span>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Python</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            12 tópicos de revisão para Engenharia de Software.
          </p>
        </div>
      </div>

      <div className="mb-8">
        <ProgressBar />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {allTopics.map(topic => (
          <TopicCard key={topic.slug} topic={topic} />
        ))}
      </div>
    </div>
  );
}
