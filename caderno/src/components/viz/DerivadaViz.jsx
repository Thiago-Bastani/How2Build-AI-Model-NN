// Visualização: parábola (x-4)² com tangente animada + gradient descent
import { useState, useEffect, useRef } from 'react';

const W = 300, H = 220;
const PAD = 36;
const xMin = 0, xMax = 8;
const yMin = -1, yMax = 17;

function sx(x) { return PAD + ((x - xMin) / (xMax - xMin)) * (W - PAD * 2); }
function sy(y) { return H - PAD - ((y - yMin) / (yMax - yMin)) * (H - PAD * 2); }

const f  = x => (x - 4) ** 2;
const df = x => 2 * (x - 4);

function curvePath() {
  return Array.from({ length: 101 }, (_, i) => {
    const x = xMin + (i / 100) * (xMax - xMin);
    const y = f(x);
    return `${i === 0 ? 'M' : 'L'}${sx(x).toFixed(1)},${sy(Math.min(y, yMax)).toFixed(1)}`;
  }).join(' ');
}

function tangentPoints(x) {
  const y  = f(x);
  const m  = df(x);
  const dx = 1.8;
  return {
    x1: sx(x - dx), y1: sy(y - m * dx),
    x2: sx(x + dx), y2: sy(y + m * dx),
  };
}

export default function DerivadaViz() {
  const [x, setX] = useState(1);
  const [running, setRunning] = useState(false);
  const [path, setPath] = useState([]);
  const rafRef = useRef(null);
  const xRef  = useRef(x);

  const slope  = df(x);
  const tang   = tangentPoints(x);
  const slopeColor = slope > 0.3 ? '#f44336' : slope < -0.3 ? '#4fc3f7' : '#4caf50';

  function startDescent() {
    const start = 0.5;
    setX(start);
    xRef.current = start;
    setPath([start]);
    setRunning(true);
  }

  useEffect(() => {
    if (!running) return;
    let cur = xRef.current;
    const step = () => {
      const grad = df(cur);
      cur = cur - 0.05 * grad;
      if (cur < xMin) cur = xMin;
      if (cur > xMax) cur = xMax;
      xRef.current = cur;
      setX(cur);
      setPath(p => [...p.slice(-60), cur]);
      if (Math.abs(grad) > 0.05 && cur > xMin && cur < xMax) {
        rafRef.current = setTimeout(step, 80);
      } else {
        setRunning(false);
      }
    };
    rafRef.current = setTimeout(step, 80);
    return () => clearTimeout(rafRef.current);
  }, [running]);

  return (
    <div className="viz-card">
      <div className="viz-title">Derivada — tangente e inclinação</div>
      <svg width={W} height={H}>
        {/* Grid */}
        {[0, 4, 8, 12, 16].map(v => (
          <line key={v} x1={PAD} x2={W-PAD} y1={sy(v)} y2={sy(v)} stroke="#1a1a1a" strokeWidth="1"/>
        ))}
        {[0,2,4,6,8].map(v => (
          <line key={v} x1={sx(v)} x2={sx(v)} y1={PAD} y2={H-PAD} stroke="#1a1a1a" strokeWidth="1"/>
        ))}

        {/* Eixos */}
        <line x1={PAD} x2={W-PAD} y1={H-PAD} y2={H-PAD} stroke="#444" strokeWidth="1.5"/>
        <line x1={PAD} x2={PAD} y1={PAD} y2={H-PAD} stroke="#444" strokeWidth="1.5"/>
        {[0,2,4,6,8].map(v => (
          <text key={v} x={sx(v)} y={H-PAD+15} fill="#555" fontSize="10" textAnchor="middle">{v}</text>
        ))}

        {/* Caminho percorrido pelo descent */}
        {path.length > 1 && (
          <polyline
            points={path.map(px => `${sx(px).toFixed(1)},${sy(f(px)).toFixed(1)}`).join(' ')}
            fill="none" stroke="#7c6af7" strokeWidth="1.5" opacity="0.5"
          />
        )}

        {/* Curva */}
        <path d={curvePath()} fill="none" stroke="#7c6af7" strokeWidth="2.5"/>

        {/* Mínimo */}
        <line x1={sx(4)} x2={sx(4)} y1={sy(0)} y2={sy(16)} stroke="#4caf50" strokeWidth="1" strokeDasharray="3 3"/>
        <text x={sx(4)} y={PAD-6} fill="#4caf50" fontSize="10" textAnchor="middle">mínimo (x=4)</text>

        {/* Tangente */}
        {f(x) < yMax && (
          <line x1={tang.x1} y1={tang.y1} x2={tang.x2} y2={tang.y2}
            stroke={slopeColor} strokeWidth="2" strokeDasharray="5 3"/>
        )}

        {/* Ponto */}
        <circle cx={sx(x)} cy={sy(Math.min(f(x), yMax))} r="6"
          fill={slopeColor} stroke="#0c0c0c" strokeWidth="2"/>

        {/* Inclinação */}
        <text x={W-PAD} y={PAD+14} fill={slopeColor} fontSize="12" textAnchor="end" fontWeight="bold">
          inclinação = {slope.toFixed(2)}
        </text>
        <text x={W-PAD} y={PAD+28} fill="#555" fontSize="10" textAnchor="end">
          {Math.abs(slope) < 0.1 ? '→ mínimo!' : slope > 0 ? '↗ diminuir x' : '↙ aumentar x'}
        </text>
      </svg>

      <div style={{ padding: '0 12px 4px' }}>
        <input type="range" min={xMin} max={xMax} step={0.05} value={x}
          onChange={e => { setX(+e.target.value); setPath([]); setRunning(false); clearTimeout(rafRef.current); }}
          style={{ width: '100%', accentColor: '#7c6af7' }} />
      </div>
      <div style={{ padding: '0 12px 12px' }}>
        <button onClick={startDescent} disabled={running}
          style={{ fontSize: 12, background: '#7c6af7', border: 'none', color: '#fff', borderRadius: 5, padding: '4px 12px', cursor: 'pointer', opacity: running ? 0.5 : 1 }}>
          {running ? '▶ descendo...' : '▶ animar gradient descent'}
        </button>
      </div>
    </div>
  );
}
