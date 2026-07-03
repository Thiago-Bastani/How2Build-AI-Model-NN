// Mostra: a curva f(x)=x², a reta tangente naquele ponto, e a inclinação
import { useState } from 'react';

const W = 280, H = 240;
const PAD = { top: 20, right: 16, bottom: 28, left: 32 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;
const xMin = -3, xMax = 3, yMin = -1, yMax = 9;

function sx(x) { return PAD.left + ((x - xMin) / (xMax - xMin)) * plotW; }
function sy(y) { return PAD.top  + plotH - ((y - yMin) / (yMax - yMin)) * plotH; }

const f  = x => x * x;
const df = x => 2 * x;

function curvePath() {
  return Array.from({ length: 101 }, (_, i) => {
    const x = xMin + (i / 100) * (xMax - xMin);
    const y = Math.min(f(x), yMax);
    return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`;
  }).join(' ');
}

export default function DerivadaViz() {
  const [x, setX] = useState(1.5);
  const slope = df(x);
  const y0 = f(x);

  // Reta tangente: de x-1.5 a x+1.5, clampando em y
  const ext = 1.5;
  const tx1 = x - ext, ty1 = y0 - slope * ext;
  const tx2 = x + ext, ty2 = y0 + slope * ext;

  // Triângulo run/rise
  const runU  = 1;
  const riseU = slope * runU;
  // Só mostra quando cabe: cabe em x e em y, e a inclinação é visível
  const triangleVisible =
    y0 < yMax - 1 &&
    Math.abs(riseU) > 0.1 &&
    x + runU < xMax &&
    Math.abs(riseU) < yMax - y0 - 0.1;

  // Label do rise: se ponta da linha vertical está perto da borda direita → flip esquerda
  const riseLineX = sx(x + runU);
  const riseLabelRight = riseLineX < W - PAD.right - 58;
  const riseLabelX     = riseLabelRight ? riseLineX + 7 : riseLineX - 7;
  const riseLabelAnchor = riseLabelRight ? 'start' : 'end';

  return (
    <div className="viz-card">
      <div className="viz-title">Reta Tangente = a Derivada</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* Eixos */}
        <line x1={PAD.left} x2={W-PAD.right} y1={sy(0)} y2={sy(0)} stroke="#2a2a2a" strokeWidth="1.5"/>
        <line x1={sx(0)}    x2={sx(0)}    y1={PAD.top} y2={PAD.top+plotH} stroke="#2a2a2a" strokeWidth="1.5"/>

        {/* Marcadores eixo x */}
        {[-2,-1,0,1,2].map(v => (
          <text key={v} x={sx(v)} y={sy(0)+13} fill="#3a3a3a" fontSize="9" textAnchor="middle">{v}</text>
        ))}

        {/* f(x) = x² */}
        <path d={curvePath()} fill="none" stroke="#7c6af7" strokeWidth="2.5"/>
        <text x={sx(-2.6)} y={sy(f(-2.6))-8} fill="#7c6af7" fontSize="10" fontWeight="bold">f(x) = x²</text>

        {/* Reta tangente */}
        <line
          x1={sx(Math.max(xMin, tx1))} y1={sy(Math.max(yMin, Math.min(yMax, ty1)))}
          x2={sx(Math.min(xMax, tx2))} y2={sy(Math.max(yMin, Math.min(yMax, ty2)))}
          stroke="#e66767" strokeWidth="2" strokeDasharray="5 3"/>

        {/* Triângulo mostrando a inclinação */}
        {triangleVisible && (
          <g>
            {/* Linha horizontal (run = 1) */}
            <line x1={sx(x)} y1={sy(y0)} x2={sx(x+runU)} y2={sy(y0)}
              stroke="#aaa" strokeWidth="1.5"/>
            <text x={sx(x + runU/2)} y={sy(y0)+13} fill="#666" fontSize="9" textAnchor="middle">andou 1</text>
            {/* Linha vertical (rise) */}
            <line x1={sx(x+runU)} y1={sy(y0)} x2={sx(x+runU)} y2={sy(y0+riseU)}
              stroke="#e66767" strokeWidth="2.5"/>
            <text
              x={riseLabelX} y={(sy(y0)+sy(y0+riseU))/2+4}
              fill="#e66767" fontSize="9" fontWeight="bold" textAnchor={riseLabelAnchor}>
              {riseU > 0 ? `↑ subiu ${riseU.toFixed(1)}` : `↓ desceu ${Math.abs(riseU).toFixed(1)}`}
            </text>
          </g>
        )}

        {/* Ponto */}
        <circle cx={sx(x)} cy={sy(y0)} r="5" fill="#e66767" stroke="#0c0c0c" strokeWidth="2"/>

        {/* Label da derivada — caixa com largura generosa */}
        <rect x={PAD.left+1} y={PAD.top+1} width={148} height={38} rx="5"
          fill="#0c0c0c" stroke="#e66767" strokeWidth="1.5"/>
        <text x={PAD.left+9} y={PAD.top+15} fill="#888" fontSize="9">inclinação da tangente:</text>
        <text x={PAD.left+9} y={PAD.top+30} fill="#e66767" fontSize="12" fontWeight="bold">
          f'({x.toFixed(1)}) = {slope.toFixed(2)}
        </text>
      </svg>

      <div style={{ padding: '4px 12px 12px' }}>
        <label style={{ fontSize: 11, color: '#555' }}>
          arraste o ponto → x = <strong style={{ color: '#e66767' }}>{x.toFixed(2)}</strong>
        </label>
        <input type="range" min={-2.8} max={2.8} step={0.05} value={x}
          onChange={e => setX(+e.target.value)}
          style={{ width: '100%', accentColor: '#7c6af7' }} />
      </div>
    </div>
  );
}
