// Visualização: L(ŷ) = (ŷ - y)²  →  parábola do custo
import { useState } from 'react';

const W = 300, H = 240;
const PAD = 36;
const real = 5; // valor real fixo

const xMin = 0, xMax = 10;
const yMin = 0, yMax = 25;

function sx(x) { return PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2); }
function sy(y) { return H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2); }

function parabolaPath() {
  const pts = [];
  for (let i = 0; i <= 100; i++) {
    const x = xMin + (i / 100) * (xMax - xMin);
    const y = (x - real) ** 2;
    if (y > yMax) continue;
    pts.push(`${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  return pts.join(' ');
}

export default function FuncoesCustoViz() {
  const [guess, setGuess] = useState(2);
  const loss = (guess - real) ** 2;

  return (
    <div className="viz-card">
      <div className="viz-title">Função de Custo  L(ŷ) = (ŷ − y)²</div>
      <svg width={W} height={H} style={{ display: 'block' }}>
        {/* Grid */}
        {[0, 5, 10, 15, 20, 25].map(v => (
          <line key={v} x1={PAD} x2={W - PAD} y1={sy(v)} y2={sy(v)} stroke="#1e1e1e" strokeWidth="1" />
        ))}
        {[0, 2, 4, 6, 8, 10].map(v => (
          <line key={v} x1={sx(v)} x2={sx(v)} y1={PAD} y2={H - PAD} stroke="#1e1e1e" strokeWidth="1" />
        ))}

        {/* Eixos */}
        <line x1={PAD} x2={W - PAD} y1={H - PAD} y2={H - PAD} stroke="#444" strokeWidth="1.5" />
        <line x1={PAD} x2={PAD} y1={PAD} y2={H - PAD} stroke="#444" strokeWidth="1.5" />

        {/* Labels eixo x */}
        {[0, 5, 10].map(v => (
          <text key={v} x={sx(v)} y={H - PAD + 16} fill="#555" fontSize="10" textAnchor="middle">{v}</text>
        ))}
        <text x={W / 2} y={H - 4} fill="#555" fontSize="10" textAnchor="middle">ŷ (previsão)</text>

        {/* Labels eixo y */}
        {[0, 10, 20].map(v => (
          <text key={v} x={PAD - 6} y={sy(v) + 4} fill="#555" fontSize="10" textAnchor="end">{v}</text>
        ))}

        {/* Curva */}
        <path d={parabolaPath()} fill="none" stroke="#7c6af7" strokeWidth="2.5" />

        {/* Linha vertical do mínimo */}
        <line x1={sx(real)} x2={sx(real)} y1={sy(0)} y2={sy(25)} stroke="#4fc3f7" strokeWidth="1" strokeDasharray="4 3" />
        <text x={sx(real)} y={PAD - 6} fill="#4fc3f7" fontSize="10" textAnchor="middle">y = {real} (real)</text>

        {/* Ponto da previsão */}
        <line x1={sx(guess)} x2={sx(guess)} y1={sy(loss)} y2={sy(0)} stroke="#f44336" strokeWidth="1" strokeDasharray="3 3" />
        <line x1={sx(real)} x2={sx(guess)} y1={H - PAD} y2={H - PAD} stroke="#f44336" strokeWidth="2" />
        <circle cx={sx(guess)} cy={sy(loss)} r="5" fill="#f44336" />

        {/* Label do erro */}
        {guess !== real && (
          <text x={(sx(real) + sx(guess)) / 2} y={H - PAD - 6} fill="#f44336" fontSize="10" textAnchor="middle">
            erro = {(guess - real).toFixed(1)}
          </text>
        )}
        <text x={sx(guess) + 8} y={sy(loss) - 8} fill="#f44336" fontSize="11" fontWeight="bold">
          L = {loss.toFixed(1)}
        </text>

        {/* Mínimo */}
        <circle cx={sx(real)} cy={sy(0)} r="4" fill="#4caf50" />
        <text x={sx(real)} y={sy(0) - 8} fill="#4caf50" fontSize="10" textAnchor="middle">L = 0 (perfeito)</text>
      </svg>

      <div style={{ padding: '0 12px 12px' }}>
        <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>
          Mova a previsão ŷ = <strong style={{ color: '#f44336' }}>{guess.toFixed(1)}</strong>
        </label>
        <input type="range" min={0} max={10} step={0.1} value={guess}
          onChange={e => setGuess(+e.target.value)}
          style={{ width: '100%', accentColor: '#7c6af7' }} />
      </div>
    </div>
  );
}
