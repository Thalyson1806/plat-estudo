import type { Topic } from '@/lib/types';
import { modeloOsi } from './01-modelo-osi';
import { protocoloTcpIp } from './02-protocolo-tcp-ip';
import { dns } from './03-dns';
import { httpHttps } from './04-http-https';
import { firewall } from './05-firewall';
import { criptografia } from './06-criptografia';
import { ataquesComuns } from './07-ataques-comuns';
import { vpnProxy } from './08-vpn-proxy';

export const redesTopics: Topic[] = [
  modeloOsi,
  protocoloTcpIp,
  dns,
  httpHttps,
  firewall,
  criptografia,
  ataquesComuns,
  vpnProxy,
];

export function getRedesTopicBySlug(slug: string): Topic | undefined {
  return redesTopics.find(t => t.slug === slug);
}

export function getRedesPrevNext(slug: string): { prev: Topic | null; next: Topic | null } {
  const idx = redesTopics.findIndex(t => t.slug === slug);
  return {
    prev: idx > 0 ? redesTopics[idx - 1] : null,
    next: idx < redesTopics.length - 1 ? redesTopics[idx + 1] : null,
  };
}
