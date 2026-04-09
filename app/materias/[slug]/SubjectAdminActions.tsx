'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, X } from 'lucide-react';

const btnBase = 'flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all';

export function SubjectAdminActions({ slug }: { slug: string }) {
  const router = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(`/api/subjects/${slug}`, { method: 'DELETE' });
    setLoading(false);
    if (res.ok) router.push('/materias');
  }

  if (!confirm) {
    return (
      <button
        onClick={() => setConfirm(true)}
        className={btnBase}
        style={{ background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
      >
        <Trash2 size={13} /> Apagar matéria
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs" style={{ color: '#f87171' }}>Tem certeza? Todos os tópicos serão apagados.</span>
      <button
        onClick={handleDelete}
        disabled={loading}
        className={btnBase}
        style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.5)' }}
      >
        {loading ? 'Apagando...' : 'Sim, apagar'}
      </button>
      <button
        onClick={() => setConfirm(false)}
        className={btnBase}
        style={{ background: 'var(--bg-card-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
      >
        <X size={13} /> Não
      </button>
    </div>
  );
}
