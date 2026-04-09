'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Send } from 'lucide-react';

export function ReplyForm({ threadId }: { threadId: string }) {
  const router = useRouter();
  const [body, setBody] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const res = await fetch(`/api/threads/${threadId}/replies`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErro(data.error ?? 'Erro ao enviar resposta.');
      return;
    }

    setBody('');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
        Sua resposta
      </label>
      <textarea
        required
        rows={4}
        value={body}
        onChange={e => setBody(e.target.value)}
        placeholder="Escreva sua resposta..."
        className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all resize-none mb-3"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          color: 'var(--text)',
        }}
        onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
        onBlur={e => (e.target.style.borderColor = 'var(--border)')}
      />

      {erro && (
        <p className="text-sm mb-3 px-3 py-2 rounded-lg"
          style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}>
          {erro}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || body.trim().length < 3}
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
        style={{
          background: 'var(--accent)',
          color: '#0d0d0d',
          opacity: (loading || body.trim().length < 3) ? 0.6 : 1,
          cursor: (loading || body.trim().length < 3) ? 'not-allowed' : 'pointer',
        }}
      >
        <Send size={15} />
        {loading ? 'Enviando...' : 'Responder'}
      </button>
    </form>
  );
}
