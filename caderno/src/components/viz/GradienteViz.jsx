// Mostra: f(x,y) = x²+3y — as mesmas funções e ponto do texto
// Cita: "∂f/∂x = 2x  ∂f/∂y = 3  gradiente [4,3] no ponto (2,5)"
import { useState } from 'react';

const W = 280, H = 300;
const PAD = { top: 20, right: 20, bottom: 32, left: 36 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;
const xMin = -3, xMax = 3, yMin = -1, yMax = 6;

function sx(v) { return PAD.left + ((v - xMin) / (xMax - xMin)) * plotW; }
function sy(v) { return PAD.top  + plotH - ((v - yMin) / (yMax - yMin)) * plotH; }

// Clamp para manter dentro do SVG
const clampX = (v, pad = 4) => Math.max(PAD.left + pad, Math.min(W - PAD.right - pad, v));
const clampY = (v, pad = 4) => Math.max(PAD.top + pad,  Math.min(H - PAD.bottom - pad, v));

// f(x,y) = x² + 3y  →  curvas de nível: y = (c - x²)/3
const LEVELS = [3, 6, 9, 12, 15];
const COLORS  = ['#4caf50', '#81c784', '#4fc3f7', '#7c6af7', '#c06af7'];

function parabolaPath(c) {
  const pts = [];
  let pen = false;
  for (let i = 0; i <= 80; i++) {
    const x = xMin + (i / 80) * (xMax - xMin);
    const y = (c - x * x) / 3;
    if (y < yMin - 0.1 || y > yMax + 0.1) { pen = false; continue; }
    pts.push(`${pen ? 'L' : 'M'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
    pen = true;
  }
  return pts.join(' ');
}

export default function GradienteViz() {
  const [px, setPx] = useState(1);
  const [py, setPy] = useState(2);

  // f(x,y) = x² + 3y  →  ∂f/∂x = 2x,  ∂f/∂y = 3 (constante!)
  const gx = 2 * px;
  const gy = 3;
  const scale = 0.22;

  // Pontos de origem e ponta das setas — clamped ao plot
  const ox = sx(px), oy = sy(py);
  const gxTipX = clampX(sx(px + gx * scale));
  const gyTipY = clampY(sy(py + gy * scale));
  const gradTipX = clampX(sx(px + gx * scale));
  const gradTipY = clampY(sy(py + gy * scale));

  // Posição do label ∂f/∂x: centrado na seta, clamped
  const dxLabelX = clampX((ox + gxTipX) / 2, 30);

  // Posição do label ∂f/∂y: à direita se há espaço, senão à esquerda
  const dyNearEdge = ox > W - PAD.right - 58;
  const dyLabelX   = dyNearEdge ? ox - 6 : ox + 6;
  const dyAnchor   = dyNearEdge ? 'end' : 'start';

  // Posição do label ∇f: à direita da ponta, clamped
  const gradLabelX = clampX(gradTipX + 5, 20);
  const nearRight  = gradTipX > W - PAD.right - 20;

  // Label do ponto: à direita se há espaço, senão à esquerda
  const ptNearEdge = ox > W - PAD.right - 72;
  const ptLabelX   = ptNearEdge ? ox - 7 : ox + 7;
  const ptAnchor   = ptNearEdge ? 'end' : 'start';

  return (
    <div className="viz-card">
      <div className="viz-title">Derivadas Parciais e Gradiente</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          <marker id="mk-gx"   markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#4fc3f7"/>
          </marker>
          <marker id="mk-gy"   markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#f44336"/>
          </marker>
          <marker id="mk-grad" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#fff"/>
          </marker>
        </defs>

        {/* Curvas de nível — parábolas de f(x,y)=x²+3y */}
        {LEVELS.map((lv, i) => (
          <path key={lv} d={parabolaPath(lv)} fill="none"
            stroke={COLORS[i]} strokeWidth="1.2" opacity="0.5"/>
        ))}
        <text x={W - PAD.right - 2} y={PAD.top + 10} fill="#555" fontSize="8" textAnchor="end">
          cada curva = mesmo f(x,y)
        </text>

        {/* Label da função */}
        <text x={PAD.left + 2} y={PAD.top - 6} fill="#888" fontSize="9" fontFamily="monospace">
          f(x,y) = x² + 3y
        </text>

        {/* Eixos */}
        <line x1={PAD.left} x2={W-PAD.right} y1={sy(0)} y2={sy(0)} stroke="#333" strokeWidth="1.5"/>
        <line x1={sx(0)} x2={sx(0)} y1={PAD.top} y2={PAD.top+plotH} stroke="#333" strokeWidth="1.5"/>
        <text x={W-PAD.right+2} y={sy(0)+4} fill="#444" fontSize="9">x</text>
        <text x={sx(0)+4} y={PAD.top+8} fill="#444" fontSize="9">y</text>

        {/* Seta ∂f/∂x — move em x, comprimento proporcional a 2px */}
        <line x1={ox} y1={oy} x2={gxTipX} y2={oy}
          stroke="#4fc3f7" strokeWidth="2" markerEnd="url(#mk-gx)"/>
        <text x={dxLabelX} y={oy - 7}
          fill="#4fc3f7" fontSize="9" textAnchor="middle">∂f/∂x = {gx.toFixed(1)}</text>

        {/* Seta ∂f/∂y — move em y, comprimento = 3 (sempre igual!) */}
        <line x1={ox} y1={oy} x2={ox} y2={gyTipY}
          stroke="#f44336" strokeWidth="2" markerEnd="url(#mk-gy)"/>
        <text x={dyLabelX} y={(oy + gyTipY) / 2 + 4}
          fill="#f44336" fontSize="9" textAnchor={dyAnchor}>∂f/∂y = 3</text>

        {/* Seta do gradiente combinado */}
        <line x1={ox} y1={oy} x2={gradTipX} y2={gradTipY}
          stroke="#fff" strokeWidth="2.5" markerEnd="url(#mk-grad)" opacity="0.9"/>
        {!nearRight && (
          <text x={gradLabelX} y={gradTipY - 4}
            fill="#fff" fontSize="9" fontWeight="bold">∇f</text>
        )}

        {/* Ponto */}
        <circle cx={ox} cy={oy} r="5" fill="#fff" stroke="#0c0c0c" strokeWidth="2"/>
        <text x={ptLabelX} y={oy + 4} fill="#888" fontSize="8" textAnchor={ptAnchor}>
          ({px.toFixed(1)}, {py.toFixed(1)})
        </text>

        {/* Legenda — posição fixa no rodapé */}
        <rect x={PAD.left+1} y={H-PAD.bottom-42} width={180} height={40} rx="4" fill="#0c0c0c" opacity="0.92"/>
        <circle cx={PAD.left+10} cy={H-PAD.bottom-30} r="3" fill="#4fc3f7"/>
        <text x={PAD.left+16} y={H-PAD.bottom-26} fill="#4fc3f7" fontSize="8">∂f/∂x = 2x — muda com o ponto</text>
        <circle cx={PAD.left+10} cy={H-PAD.bottom-16} r="3" fill="#f44336"/>
        <text x={PAD.left+16} y={H-PAD.bottom-12} fill="#f44336" fontSize="8">∂f/∂y = 3 — sempre igual (constante)</text>
      </svg>

      <div style={{ padding: '4px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 11, color: '#555' }}>
          x = <strong style={{ color: '#4fc3f7' }}>{px.toFixed(1)}</strong>
          <span style={{ color: '#666', marginLeft: 8, fontSize: 10 }}>∂f/∂x = {(2*px).toFixed(1)}</span>
        </label>
        <input type="range" min={-2.5} max={2.5} step={0.1} value={px}
          onChange={e => setPx(+e.target.value)}
          style={{ width: '100%', accentColor: '#4fc3f7' }} />
        <label style={{ fontSize: 11, color: '#555' }}>
          y = <strong style={{ color: '#f44336' }}>{py.toFixed(1)}</strong>
          <span style={{ color: '#666', marginLeft: 8, fontSize: 10 }}>∂f/∂y = 3 (não importa y)</span>
        </label>
        <input type="range" min={-0.5} max={5.5} step={0.1} value={py}
          onChange={e => setPy(+e.target.value)}
          style={{ width: '100%', accentColor: '#f44336' }} />
      </div>
    </div>
  );
}
