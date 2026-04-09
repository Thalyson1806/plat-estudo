import type { Topic } from '@/lib/types';
import { fluxograma } from './01-fluxograma';
import { tiposDeDados } from './02-tipos-de-dados';
import { operacoesAritmeticas } from './03-operacoes-aritmeticas';
import { operacoesRelacionaisLogicas } from './04-operacoes-relacionais-logicas';
import { estruturasDeControle } from './05-estruturas-de-controle';
import { estruturasDeRepeticao } from './06-estruturas-de-repeticao';
import { acumuladoresContadores } from './07-acumuladores-contadores';
import { testeDeMesa } from './08-teste-de-mesa';
import { escalasEntradaProcessamentoSaida } from './09-escalas-entrada-processamento-saida';
import { listas } from './10-listas';
import { strings } from './11-strings';
import { boasPraticas } from './12-boas-praticas';

export const allTopics: Topic[] = [
  fluxograma,
  tiposDeDados,
  operacoesAritmeticas,
  operacoesRelacionaisLogicas,
  estruturasDeControle,
  estruturasDeRepeticao,
  acumuladoresContadores,
  testeDeMesa,
  escalasEntradaProcessamentoSaida,
  listas,
  strings,
  boasPraticas,
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return allTopics.find(t => t.slug === slug);
}

export function getPrevNext(slug: string): { prev: Topic | null; next: Topic | null } {
  const idx = allTopics.findIndex(t => t.slug === slug);
  return {
    prev: idx > 0 ? allTopics[idx - 1] : null,
    next: idx < allTopics.length - 1 ? allTopics[idx + 1] : null,
  };
}
