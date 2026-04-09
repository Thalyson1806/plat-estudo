'use client';

import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import type { CodeExample } from '@/lib/types';

interface Props {
  example: CodeExample;
}

export function CodeBlock({ example }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(example.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl overflow-hidden my-4" style={{ border: '1px solid var(--border)' }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: '#1e1e2e', borderBottom: '1px solid #2d2d3d' }}
      >
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <span className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        </div>
        <span className="text-xs font-mono" style={{ color: '#888' }}>{example.language}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-all"
          style={{ color: copied ? '#4ade80' : '#888', background: 'transparent' }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copiado!' : 'Copiar'}
        </button>
      </div>

      <SyntaxHighlighter
        language={example.language === 'shell' ? 'bash' : example.language === 'text' ? 'plaintext' : example.language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: '1rem',
          fontSize: '0.875rem',
          lineHeight: '1.6',
          background: '#1e1e2e',
        }}
      >
        {example.code}
      </SyntaxHighlighter>

      {example.explanation && (
        <div
          className="px-4 py-3 text-sm"
          style={{
            background: 'rgba(75,139,190,0.08)',
            borderTop: '1px solid var(--border)',
            color: 'var(--text-muted)',
          }}
        >
          💡 {example.explanation}
        </div>
      )}
    </div>
  );
}
