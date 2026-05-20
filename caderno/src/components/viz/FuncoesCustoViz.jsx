import { useState } from 'react';

const W = 300, H = 260;
const PAD = { top: 20, right: 16, bottom: 32, left: 36 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;
const xMin = -3, xMax = 3;
const yMin = -1, yMax = 9;

function sx(x) { return PAD.left + ((x - xMin) / (xMax - xMin)) * plotW; }
function sy(y) { return PAD.top  + plotH - ((y - yMin) / (yMax - yMin)) * plotH; }

const FUNCS = [
  { id: 'quad',  label: 'f(x) = x²',      color: '#7c6af7', fn: x => x ** 2,           desc: 'Quadrática — curva em U' },
  { id: 'lin',   label: 'f(x) = x + 1',   color: '#4fc3f7', fn: x => x + 1,            desc: 'Linear — linha reta' },
  { id: 'exp',   label: 'f(x) = eˣ − 1',  color: '#f44336', fn: x => Math.E**x - 1,    desc: 'Exponencial — cresce cada vez mais rápido' },
  { id: 'abs',   label: 'f(x) = |x|',     color: '#4caf50', fn: x => Math.abs(x),       desc: 'Valor absoluto — V' },
];

function makePath(fn) {
  const pts = [];
  for (let i = 0; i <= 120; i++) {
    const x = xMin + (i / 120) * (xMax - xMin);
    const y = fn(x);
    if (y < yMin - 1 || y > yMax + 1) { pts.push(null); continue; }
    pts.push([sx(x), sy(Math.max(yMin, Math.min(yMax, y)))]);
  }
  let d = '', pen = false;
  for (const pt of pts) {
    if (!pt) { pen = false; continue; }
    d += (pen ? 'L' : 'M') + pt[0].toFixed(1) + ',' + pt[1].toFixed(1) + ' ';
    pen = true;
  }
  return d;
}

export default function FuncoesCustoViz() {
  const [active, setActive] = useState('quad');
  const cur = FUNCS.find(f => f.id === active);

  return (
    <div className="viz-card">
      <div className="viz-title">Gráfico de Funções</div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* Grid */}
        {[-1,0,1,2,3,4,5,6,7,8].filter(v => v >= yMin && v <= yMax).map(v => (
          <line key={v} x1={PAD.left} x2={W-PAD.right} y1={sy(v)} y2={sy(v)} stroke="#181818" strokeWidth="1"/>
        ))}
        {[-3,-2,-1,0,1,2,3].map(v => (
          <line key={v} x1={sx(v)} x2={sx(v)} y1={PAD.top} y2={PAD.top+plotH} stroke="#181818" strokeWidth="1"/>
        ))}

        {/* Eixos */}
        <line x1={PAD.left} x2={W-PAD.right} y1={sy(0)} y2={sy(0)} stroke="#333" strokeWidth="1.5"/>
        <line x1={sx(0)} x2={sx(0)} y1={PAD.top} y2={PAD.top+plotH} stroke="#333" strokeWidth="1.5"/>

        {/* Marcadores eixo x */}
        {[-2,-1,0,1,2].map(v => (
          <text key={v} x={sx(v)} y={sy(0)+14} fill="#444" fontSize="9" textAnchor="middle">{v}</text>
        ))}

        {/* Todas as curvas (opacas se não for a ativa) */}
        {FUNCS.map(f => (
          <path key={f.id} d={makePath(f.fn)}
            fill="none" stroke={f.color} strokeWidth={f.id === active ? 2.5 : 1}
            opacity={f.id === active ? 1 : 0.18}/>
        ))}

        {/* Label da função ativa */}
        <rect x={PAD.left+2} y={PAD.top+2} width={170} height={34}
          rx="5" fill="#0c0c0c" stroke={cur.color} strokeWidth="1.5"/>
        <text x={PAD.left+10} y={PAD.top+16} fill={cur.color} fontSize="12" fontWeight="bold">
          {cur.label}
        </text>
        <text x={PAD.left+10} y={PAD.top+29} fill="#555" fontSize="9">
          {cur.desc}
        </text>
      </svg>

      {/* Botões de seleção */}
      <div style={{ padding: '8px 12px 12px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {FUNCS.map(f => (
          <button key={f.id} onClick={() => setActive(f.id)}
            style={{
              fontSize: 11, border: `1px solid ${active === f.id ? f.color : '#2a2a2a'}`,
              background: active === f.id ? f.color + '22' : 'transparent',
              color: active === f.id ? f.color : '#555',
              borderRadius: 4, padding: '3px 8px', cursor: 'pointer',
            }}>
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}
