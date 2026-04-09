'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus } from 'lucide-react';

const EMOJIS = ['📚', '💻', '🌐', '🔒', '⚙️', '🗄️', '📡', '🧮', '🔧', '📊', '🧠', '⚡', '🖥️', '🔬', '📐'];

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

const inputCls = 'w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all';
const inputStyle = { background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' };
const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = 'var(--accent)');
const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = 'var(--border)');

export default function NovaMateria() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugManual, setSlugManual] = useState(false);
  const [description, setDescription] = useState('');
  const [emoji, setEmoji] = useState('📚');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  function handleTitle(v: string) {
    setTitle(v);
    if (!slugManual) setSlug(slugify(v));
  }

  function handleSlug(v: string) {
    setSlugManual(true);
    setSlug(slugify(v));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const res = await fetch('/api/subjects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, slug, description, emoji }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErro(data.error ?? 'Erro ao criar matéria.');
      return;
    }

    router.push(`/materias/${data.slug}`);
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="flex items-center gap-2 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        <Link href="/materias" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Matérias</Link>
        <span>›</span>
        <span style={{ color: 'var(--text)' }}>Nova matéria</span>
      </div>

      <h1 className="text-2xl font-bold mb-6" style={{ color: 'var(--text)' }}>Nova matéria</h1>

      <div className="rounded-2xl p-6" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Emoji */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>Ícone</label>
            <div className="flex flex-wrap gap-2">
              {EMOJIS.map(e => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className="w-9 h-9 rounded-lg text-lg flex items-center justify-center transition-all"
                  style={{
                    background: emoji === e ? 'rgba(255,212,59,0.15)' : 'var(--bg)',
                    border: `1px solid ${emoji === e ? 'var(--accent)' : 'var(--border)'}`,
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Título */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Título</label>
            <input
              type="text"
              required
              value={title}
              onChange={e => handleTitle(e.target.value)}
              placeholder="Ex: Redes e Segurança"
              className={inputCls}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
              Slug <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(URL da matéria)</span>
            </label>
            <div className="flex items-center gap-0 rounded-lg overflow-hidden" style={{ border: '1px solid var(--border)' }}>
              <span className="px-3 py-2.5 text-sm shrink-0" style={{ background: 'var(--border)', color: 'var(--text-muted)' }}>
                /materias/
              </span>
              <input
                type="text"
                required
                value={slug}
                onChange={e => handleSlug(e.target.value)}
                className="flex-1 px-3 py-2.5 text-sm outline-none"
                style={{ background: 'var(--bg)', color: 'var(--text)' }}
              />
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Só letras minúsculas, números e hífens.
            </p>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>Descrição curta</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Uma frase sobre o que esta matéria cobre..."
              className={`${inputCls} resize-none`}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
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
              disabled={loading || !slug || !title}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                background: 'var(--accent)',
                color: '#0d0d0d',
                opacity: (loading || !slug || !title) ? 0.6 : 1,
                cursor: (loading || !slug || !title) ? 'not-allowed' : 'pointer',
              }}
            >
              <Plus size={15} />
              {loading ? 'Criando...' : 'Criar matéria'}
            </button>
            <Link href="/materias" className="px-5 py-2.5 rounded-lg text-sm font-medium flex items-center"
              style={{ background: 'var(--bg-card-hover)', border: '1px solid var(--border)', color: 'var(--text-muted)' }}>
              Cancelar
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
