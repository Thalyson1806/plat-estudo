import type { Topic } from '@/lib/types';
import { oQueESo } from './01-o-que-e-so';
import { processos } from './02-processos';
import { threads } from './03-threads';
import { escalonamento } from './04-escalonamento';
import { memoria } from './05-memoria';
import { sistemasArquivos } from './06-sistemas-arquivos';
import { deadlock } from './07-deadlock';
import { entradaSaida } from './08-entrada-saida';

export const soTopics: Topic[] = [
  oQueESo,
  processos,
  threads,
  escalonamento,
  memoria,
  sistemasArquivos,
  deadlock,
  entradaSaida,
];

export function getSoTopicBySlug(slug: string): Topic | undefined {
  return soTopics.find(t => t.slug === slug);
}

export function getSoPrevNext(slug: string): { prev: Topic | null; next: Topic | null } {
  const idx = soTopics.findIndex(t => t.slug === slug);
  return {
    prev: idx > 0 ? soTopics[idx - 1] : null,
    next: idx < soTopics.length - 1 ? soTopics[idx + 1] : null,
  };
}
