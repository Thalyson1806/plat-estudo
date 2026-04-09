import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { soTopics } from '@/data/sistemas-operacionais';
import { StaticModuleTopicCard } from '@/components/StaticModuleTopicCard';

const BASE = '/materias/sistemas-operacionais/topico';

export default function SoTopicosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/materias" className="flex items-center gap-1 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <ChevronLeft size={16} /> Matérias
      </Link>

      <div className="flex items-start gap-4 mb-10">
        <span className="text-5xl">🖥️</span>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Sistemas Operacionais</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {soTopics.length} tópicos — Processos, Threads, Escalonamento, Memória, Deadlock e mais.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {soTopics.map(topic => (
          <StaticModuleTopicCard key={topic.slug} topic={topic} basePath={BASE} />
        ))}
      </div>
    </div>
  );
}
