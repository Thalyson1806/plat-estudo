'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2, X, Check } from 'lucide-react';

const btnBase = 'flex items-center gap-1 text-xs px-2 py-1 rounded-lg transition-all';

// ─── Thread Actions ───────────────────────────────────────────────────────────

export function ThreadActions({
  threadId,
  initialTitle,
  initialBody,
}: {
  threadId: string;
  initialTitle: string;
  initialBody: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSave() {
    setLoading(true);
    const res = await fetch(`/api/threads/${threadId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body }),
    });
    setLoading(false);
    if (res.ok) { setEditing(false); router.refresh(); }
  }

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(`/api/threads/${threadId}`, { method: 'DELETE' });
    setLoading(false);
    if (res.ok) router.push('/forum');
  }

  if (editing) {
    return (
      <div className="mt-4 space-y-3">
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none"
          style={{ background: 'var(--bg)', border: '1px solid var(--accent)', color: 'var(--text)' }}
        />
        <textarea
          rows={5}
          value={body}
          onChange={e => setBody(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
          style={{ background: 'var(--bg)', border: '1px solid var(--accent)', color: 'var(--text)' }}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className={btnBase}
            style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}
          >
            <Check size={13} /> Salvar
          </button>
          <button
            onClick={() => { setEditing(false); setTitle(initialTitle); setBody(initialBody); }}
            className={btnBase}
            style={{ background: 'var(--bg-card-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            <X size={13} /> Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={() => setEditing(true)}
        className={btnBase}
        style={{ background: 'var(--bg-card-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
      >
        <Pencil size={13} /> Editar
      </button>

      {!confirmDelete ? (
        <button
          onClick={() => setConfirmDelete(true)}
          className={btnBase}
          style={{ background: 'rgba(248,113,113,0.08)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
        >
          <Trash2 size={13} /> Apagar
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#f87171' }}>Tem certeza?</span>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={btnBase}
            style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.5)' }}
          >
            {loading ? 'Apagando...' : 'Sim, apagar'}
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className={btnBase}
            style={{ background: 'var(--bg-card-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            <X size={13} /> Não
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Reply Actions ────────────────────────────────────────────────────────────

export function ReplyActions({
  threadId,
  replyId,
  initialBody,
}: {
  threadId: string;
  replyId: string;
  initialBody: string;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [body, setBody] = useState(initialBody);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function handleSave() {
    setLoading(true);
    const res = await fetch(`/api/threads/${threadId}/replies/${replyId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body }),
    });
    setLoading(false);
    if (res.ok) { setEditing(false); router.refresh(); }
  }

  async function handleDelete() {
    setLoading(true);
    const res = await fetch(`/api/threads/${threadId}/replies/${replyId}`, { method: 'DELETE' });
    setLoading(false);
    if (res.ok) router.refresh();
  }

  if (editing) {
    return (
      <div className="mt-3 space-y-2">
        <textarea
          rows={3}
          value={body}
          onChange={e => setBody(e.target.value)}
          className="w-full px-3 py-2 rounded-lg text-sm outline-none resize-none"
          style={{ background: 'var(--bg)', border: '1px solid var(--accent)', color: 'var(--text)' }}
        />
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className={btnBase}
            style={{ background: 'rgba(74,222,128,0.1)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}
          >
            <Check size={13} /> Salvar
          </button>
          <button
            onClick={() => { setEditing(false); setBody(initialBody); }}
            className={btnBase}
            style={{ background: 'var(--bg-card-hover)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            <X size={13} /> Cancelar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-2 mt-2">
      <button
        onClick={() => setEditing(true)}
        className={btnBase}
        style={{ background: 'transparent', color: 'var(--text-muted)' }}
      >
        <Pencil size={12} /> Editar
      </button>

      {!confirmDelete ? (
        <button
          onClick={() => setConfirmDelete(true)}
          className={btnBase}
          style={{ background: 'transparent', color: '#f87171' }}
        >
          <Trash2 size={12} /> Apagar
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#f87171' }}>Tem certeza?</span>
          <button
            onClick={handleDelete}
            disabled={loading}
            className={btnBase}
            style={{ background: 'rgba(248,113,113,0.15)', color: '#f87171', border: '1px solid rgba(248,113,113,0.5)' }}
          >
            {loading ? '...' : 'Sim'}
          </button>
          <button
            onClick={() => setConfirmDelete(false)}
            className={btnBase}
            style={{ background: 'transparent', color: 'var(--text-muted)' }}
          >
            <X size={12} /> Não
          </button>
        </div>
      )}
    </div>
  );
}
