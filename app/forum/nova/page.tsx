'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Send } from 'lucide-react';
import { allTopics } from '@/data/topics';

export default function NovaDiscussaoPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: '', body: '', topic_slug: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  function set(field: string, value: string) {
    setForm(f => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const res = await fetch('/api/threads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        topic_slug: form.topic_slug || null,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErro(data.error ?? 'Erro ao criar discussão.');
      return;
    }

    router.push(`/forum/${data.id}`);
  }

  const inputStyle = {
    background: 'var(--bg)',
    border: '1px solid var(--border)',
    color: 'var(--text)',
    width: '100%',
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <Link href="/forum" style={{ color: 'var(--text-muted)' }} className="hover:underline">
          Fórum
        </Link>
        <span>›</span>
        <span style={{ color: 'var(--text)' }}>Nova discussão</span>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>
        Nova discussão
      </h1>

      <div
        className="rounded-2xl p-6"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
              Tópico relacionado <span style={{ color: 'var(--text-muted)' }}>(opcional)</span>
            </label>
            <select
              value={form.topic_slug}
              onChange={e => set('topic_slug', e.target.value)}
              className="px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            >
              <option value="">Geral (sem tópico específico)</option>
              {allTopics.map(t => (
                <option key={t.slug} value={t.slug}>
                  {t.emoji} {t.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
              Título
            </label>
            <input
              type="text"
              required
              value={form.title}
              onChange={e => set('title', e.target.value)}
              placeholder="Resumo claro da sua dúvida ou assunto"
              className="px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
              Conteúdo
            </label>
            <textarea
              required
              rows={6}
              value={form.body}
              onChange={e => set('body', e.target.value)}
              placeholder="Descreva sua dúvida com detalhes. Se tiver código, cole aqui."
              className="px-3 py-2.5 rounded-xl text-sm outline-none transition-all resize-none"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
          </div>

          {erro && (
            <p
              className="text-sm px-3 py-2 rounded-lg"
              style={{
                background: 'rgba(248,113,113,0.1)',
                color: '#f87171',
                border: '1px solid rgba(248,113,113,0.3)',
              }}
            >
              {erro}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: 'var(--accent)',
                color: '#0d0d0d',
                opacity: loading ? 0.7 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              <Send size={15} />
              {loading ? 'Publicando...' : 'Publicar discussão'}
            </button>
            <Link
              href="/forum"
              className="px-5 py-2.5 rounded-lg text-sm font-medium"
              style={{
                background: 'var(--bg-card-hover)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
