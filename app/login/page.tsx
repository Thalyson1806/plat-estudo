'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') ?? '/';

  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSenha, setShowSenha] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro('');
    setLoading(true);

    const res = await signIn('credentials', {
      email: form.email,
      senha: form.senha,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setErro('E-mail ou senha incorretos.');
    } else {
      router.push(callbackUrl);
      router.refresh();
    }
  }

  return (
    <div
      className="w-full max-w-md rounded-2xl p-8"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--text)' }}>
        Entrar
      </h1>
      <p className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
        Acesse sua conta para continuar estudando.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
            E-mail
          </label>
          <input
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all"
            style={{
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              color: 'var(--text)',
            }}
            onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
            onBlur={e => (e.target.style.borderColor = 'var(--border)')}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5" style={{ color: 'var(--text)' }}>
            Senha
          </label>
          <div className="relative">
            <input
              type={showSenha ? 'text' : 'password'}
              required
              autoComplete="current-password"
              value={form.senha}
              onChange={e => setForm(f => ({ ...f, senha: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-lg text-sm outline-none transition-all pr-10"
              style={{
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
              onFocus={e => (e.target.style.borderColor = 'var(--accent)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
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
        </div>

        {erro && (
          <p
            className="text-sm px-3 py-2 rounded-lg"
            style={{ background: 'rgba(248,113,113,0.1)', color: '#f87171', border: '1px solid rgba(248,113,113,0.3)' }}
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
          <LogIn size={16} />
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
        Não tem conta?{' '}
        <Link href="/cadastro" className="font-medium" style={{ color: 'var(--accent)' }}>
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
