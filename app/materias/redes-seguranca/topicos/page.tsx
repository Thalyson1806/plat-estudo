import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import { redesTopics } from '@/data/redes-seguranca';
import { StaticModuleTopicCard } from '@/components/StaticModuleTopicCard';

const BASE = '/materias/redes-seguranca/topico';

export default function RedesTopicosPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/materias" className="flex items-center gap-1 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <ChevronLeft size={16} /> Matérias
      </Link>

      <div className="flex items-start gap-4 mb-10">
        <span className="text-5xl">🔒</span>
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text)' }}>Redes e Segurança</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>
            {redesTopics.length} tópicos — Modelo OSI, TCP/IP, DNS, HTTP, Criptografia e mais.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {redesTopics.map(topic => (
          <StaticModuleTopicCard key={topic.slug} topic={topic} basePath={BASE} />
        ))}
      </div>
    </div>
  );
}
