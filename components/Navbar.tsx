'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession, signOut } from 'next-auth/react';
import { Sun, Moon, Code2, MessageSquare, BookOpen, LogIn, LogOut, UserPlus, ChevronDown } from 'lucide-react';

export function Navbar() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | null;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute('data-theme', saved);
    }
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.setAttribute('data-theme', next);
  }

  const linkStyle = (href: string) => ({
    color: pathname.startsWith(href) ? 'var(--accent)' : 'var(--text-muted)',
    fontWeight: pathname.startsWith(href) ? 600 : 400,
  });

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-4"
      style={{
        background: 'var(--bg)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div className="flex items-center gap-6">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Code2 size={22} style={{ color: 'var(--accent)' }} />
          <span style={{ color: 'var(--text)' }}>
            Py<span style={{ color: 'var(--accent)' }}>Estudo</span>
          </span>
        </Link>

        <Link href="/materias" className="flex items-center gap-1.5 text-sm" style={linkStyle('/materias')}>
          <BookOpen size={15} />
          Matérias
        </Link>
        <Link href="/forum" className="flex items-center gap-1.5 text-sm" style={linkStyle('/forum')}>
          <MessageSquare size={15} />
          Fórum
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg transition-all"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
          aria-label="Alternar tema"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {session ? (
          <div className="relative">
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text)',
              }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'var(--accent)', color: '#0d0d0d' }}
              >
                {session.user.nome[0]}{session.user.sobrenome[0]}
              </div>
              <span className="hidden sm:inline">{session.user.nome}</span>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 top-full mt-2 w-48 rounded-xl overflow-hidden z-50"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
              >
                <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>
                    {session.user.nome} {session.user.sobrenome}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {session.user.turma} · {session.user.curso}
                  </p>
                </div>
                <button
                  onClick={() => { setMenuOpen(false); signOut({ callbackUrl: '/' }); }}
                  className="w-full flex items-center gap-2 px-4 py-3 text-sm text-left transition-all"
                  style={{ color: '#f87171' }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.background = 'rgba(248,113,113,0.08)')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
                >
                  <LogOut size={15} />
                  Sair
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all"
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
            >
              <LogIn size={15} />
              <span className="hidden sm:inline">Entrar</span>
            </Link>
            <Link
              href="/cadastro"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all"
              style={{ background: 'var(--accent)', color: '#0d0d0d' }}
            >
              <UserPlus size={15} />
              <span className="hidden sm:inline">Cadastrar</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
