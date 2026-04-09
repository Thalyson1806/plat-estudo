'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Send } from 'lucide-react';

const inputStyle = { background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' };
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = 'var(--accent)');
const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = 'var(--border)');

export default function NovoTopicoPage() {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const res = await fetch(`/api/subjects/${slug}/topics`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErro(data.error ?? 'Erro ao adicionar tópico.');
      return;
    }

    router.push(`/materias/${slug}`);
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <Link href="/materias" style={{ color: 'var(--text-muted)' }} className="hover:underline">Matérias</Link>
        <span>›</span>
        <Link href={`/materias/${slug}`} style={{ color: 'var(--text-muted)' }} className="hover:underline">{slug}</Link>
        <span>›</span>
        <span style={{ color: 'var(--text)' }}>Novo tópico</span>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Adicionar tópico</h1>

      <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Título do tópico</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Modelo OSI, Protocolos TCP/IP..."
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
              Conteúdo
            </label>
            <textarea
              required
              rows={14}
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder={`Explique o tópico de forma clara e direta.\n\nVocê pode usar:\n• Listas com bullet points\n• Exemplos práticos\n• Trechos de código entre crases\n\nFoco em ajudar quem está estudando para prova.`}
              className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all resize-none font-mono"
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              {content.length} caracteres · mínimo 20
            </p>
          </div>

          {erro && (
            <p className="text-sm px-3 py-2 rounded-lg"
              style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}>
              {erro}
            </p>
          )}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading || content.length < 20 || !title}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: 'var(--accent)',
                color: '#0d0d0d',
                opacity: (loading || content.length < 20 || !title) ? 0.6 : 1,
                cursor: (loading || content.length < 20 || !title) ? 'not-allowed' : 'pointer',
              }}
            >
              <Send size={15} />
              {loading ? 'Publicando...' : 'Publicar tópico'}
            </button>
            <Link
              href={`/materias/${slug}`}
              className="px-5 py-2.5 rounded-lg text-sm font-medium flex items-center"
              style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}
            >
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
