// Mostra: a regra da cadeia como multiplicação de derivadas
// Cita: "derive o exterior (como se o interior fosse x) e multiplique pela derivada do interior"
import { useState } from 'react';

const EXEMPLOS = [
  {
    id: 'pot',
    label: '(x²+1)⁵',
    interior:  { fn: 'x² + 1',    deriv: "g'(x) = 2x",     cor: '#7c6af7' },
    exterior:  { fn: '(u)⁵',      deriv: "f'(u) = 5u⁴",    cor: '#4fc3f7' },
    linha1: "f'(g(x)) × g'(x)",
    linha2: '= 5(x²+1)⁴  ×  2x',
    resultado: '= 10x(x²+1)⁴',
    corRes: '#7c6af7',
  },
  {
    id: 'sin',
    label: 'sin(3x)',
    interior:  { fn: '3x',        deriv: "g'(x) = 3",       cor: '#4fc3f7' },
    exterior:  { fn: 'sin(u)',    deriv: "f'(u) = cos(u)",  cor: '#f44336' },
    linha1: "f'(g(x)) × g'(x)",
    linha2: '= cos(3x)  ×  3',
    resultado: '= 3·cos(3x)',
    corRes: '#4fc3f7',
  },
  {
    id: 'exp',
    label: 'e^(x²)',
    interior:  { fn: 'x²',        deriv: "g'(x) = 2x",     cor: '#f44336' },
    exterior:  { fn: 'e^(u)',      deriv: "f'(u) = e^(u)",  cor: '#4caf50' },
    linha1: "f'(g(x)) × g'(x)",
    linha2: '= e^(x²)  ×  2x',
    resultado: '= 2x·e^(x²)',
    corRes: '#f44336',
  },
];

const W = 300, H = 240;

export default function CadeiaViz() {
  const [sel, setSel] = useState('pot');
  const ex = EXEMPLOS.find(e => e.id === sel);

  const bw = 118, bh = 56;
  const b1x = 10,  b1y = 52;
  const b2x = 172, b2y = 52;
  const resY = 162;
  const midX = W / 2;

  return (
    <div className="viz-card">
      <div className="viz-title">Regra da Cadeia — exterior × interior</div>

      <div style={{ padding: '6px 12px 0', display: 'flex', gap: 6 }}>
        {EXEMPLOS.map(e => (
          <button key={e.id} onClick={() => setSel(e.id)}
            style={{
              fontSize: 10, border: `1px solid ${sel === e.id ? e.interior.cor : '#2a2a2a'}`,
              background: sel === e.id ? e.interior.cor + '22' : 'transparent',
              color: sel === e.id ? e.interior.cor : '#444',
              borderRadius: 4, padding: '2px 7px', cursor: 'pointer', fontFamily: 'monospace',
            }}>
            {e.label}
          </button>
        ))}
      </div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <marker id="arr-c" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto">
            <path d="M0,0 L7,3.5 L0,7 Z" fill="#444"/>
          </marker>
        </defs>

        {/* Bloco interior g(x) */}
        <rect x={b1x} y={b1y} width={bw} height={bh} rx="7"
          fill="#111" stroke={ex.interior.cor} strokeWidth="2"/>
        <text x={b1x + 6} y={b1y + 13} fill="#555" fontSize="8.5">interior  g(x) =</text>
        <text x={b1x + bw/2} y={b1y + 34} fill={ex.interior.cor}
          fontSize="14" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
          {ex.interior.fn}
        </text>
        <text x={b1x + 6} y={b1y + 50} fill="#555" fontSize="8.5">{ex.interior.deriv}</text>

        {/* Seta interior → exterior */}
        <line x1={b1x + bw + 2} y1={b1y + bh/2} x2={b2x - 4} y2={b1y + bh/2}
          stroke="#444" strokeWidth="1.5" markerEnd="url(#arr-c)"/>
        <text x={(b1x + bw + b2x) / 2} y={b1y + bh/2 - 6}
          fill="#333" fontSize="8" textAnchor="middle">entra como u</text>

        {/* Bloco exterior f(u) */}
        <rect x={b2x} y={b2y} width={bw} height={bh} rx="7"
          fill="#111" stroke={ex.exterior.cor} strokeWidth="2"/>
        <text x={b2x + 6} y={b2y + 13} fill="#555" fontSize="8.5">exterior  f(u) =</text>
        <text x={b2x + bw/2} y={b2y + 34} fill={ex.exterior.cor}
          fontSize="14" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
          {ex.exterior.fn}
        </text>
        <text x={b2x + 6} y={b2y + 50} fill="#555" fontSize="8.5">{ex.exterior.deriv}</text>

        {/* Seta para bloco resultado */}
        <line x1={midX} y1={b1y + bh + 4} x2={midX} y2={resY - 4}
          stroke="#444" strokeWidth="1.5" markerEnd="url(#arr-c)"/>
        <text x={midX} y={b1y + bh + 16} fill="#333" fontSize="8" textAnchor="middle">
          deriva exterior × deriva interior
        </text>

        {/* Bloco resultado */}
        <rect x={10} y={resY} width={W - 20} height={70} rx="7"
          fill="#111" stroke={ex.corRes} strokeWidth="2"/>
        <text x={midX} y={resY + 16} fill="#555" fontSize="9" textAnchor="middle">
          d/dx [{ex.label}]  =  {ex.linha1}
        </text>
        <text x={midX} y={resY + 38} fill="#aaa"
          fontSize="11" textAnchor="middle" fontFamily="monospace">
          {ex.linha2}
        </text>
        <text x={midX} y={resY + 58} fill={ex.corRes}
          fontSize="13" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
          {ex.resultado}
        </text>
      </svg>
    </div>
  );
}
