'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, UserPlus } from 'lucide-react';

const CURSOS = [
  'Engenharia de Software',
  'Ciência da Computação',
  'Sistemas de Informação',
  'Análise e Desenvolvimento de Sistemas',
  'Engenharia de Computação',
  'Outro',
];

const inputCls = 'w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all';
const inputStyle = {
  background: 'var(--bg)',
  border: '1px solid var(--border)',
  color: 'var(--text)',
};
const labelStyle = { color: 'var(--text)' };

function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = 'var(--accent)';
}
function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
  e.target.style.borderColor = 'var(--border)';
}

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [turma, setTurma] = useState('');
  const [curso, setCurso] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, sobrenome, email, senha, turma, curso }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErro(data.error ?? 'Erro ao criar conta.');
      return;
    }

    router.push('/login?cadastro=ok');
  }

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div
        className="w-full max-w-md rounded-2xl p-8"
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
      >
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
          Criar conta
        </h1>
        <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
          Preencha os dados abaixo para acessar a plataforma.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={labelStyle}>Nome</label>
              <input
                type="text"
                required
                value={nome}
                onChange={e => setNome(e.target.value)}
                className={inputCls}
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={labelStyle}>Sobrenome</label>
              <input
                type="text"
                required
                value={sobrenome}
                onChange={e => setSobrenome(e.target.value)}
                className={inputCls}
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={labelStyle}>E-mail</label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className={inputCls}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={labelStyle}>Senha</label>
            <div className="relative">
              <input
                type={showSenha ? 'text' : 'password'}
                required
                autoComplete="new-password"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                className={`${inputCls} pr-10`}
                style={inputStyle}
                onFocus={onFocus}
                onBlur={onBlur}
              />
              <button
                type="button"
                onClick={() => setShowSenha(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
                style={{ color: 'var(--text-muted)' }}
              >
                {showSenha ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
              Mínimo 8 caracteres, uma maiúscula e um número.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={labelStyle}>Turma</label>
            <input
              type="text"
              required
              placeholder="Ex: ES-3A, CC-2B..."
              value={turma}
              onChange={e => setTurma(e.target.value)}
              className={inputCls}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5" style={labelStyle}>Curso</label>
            <select
              required
              value={curso}
              onChange={e => setCurso(e.target.value)}
              className={inputCls}
              style={inputStyle}
              onFocus={onFocus}
              onBlur={onBlur}
            >
              <option value="">Selecione o curso</option>
              {CURSOS.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
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

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg font-semibold text-sm transition-all"
            style={{
              background: 'var(--accent)',
              color: '#0d0d0d',
              opacity: loading ? 0.7 : 1,
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            <UserPlus size={16} />
            {loading ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
          Já tem conta?{' '}
          <Link href="/login" className="font-medium" style={{ color: 'var(--accent)' }}>
            Entrar
          </Link>
        </p>
      </div>
    </div>
  );
}
