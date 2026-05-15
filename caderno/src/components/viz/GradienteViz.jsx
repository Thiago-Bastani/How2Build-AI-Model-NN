// Visualização: contour map de (w1-3)² + (w2-7)² com gradient descent
import { useState, useEffect, useRef } from 'react';

const W = 300, H = 280;
const PAD = 36;
const w1Min = 0, w1Max = 6;
const w2Min = 4, w2Max = 10;

function sw1(v) { return PAD + ((v - w1Min) / (w1Max - w1Min)) * (W - PAD * 2); }
function sw2(v) { return H - PAD - ((v - w2Min) / (w2Max - w2Min)) * (H - PAD * 2); }

const f  = (w1, w2) => (w1 - 3) ** 2 + (w2 - 7) ** 2;
const gw1 = (w1) => 2 * (w1 - 3);
const gw2 = (w2) => 2 * (w2 - 7);

const LEVELS = [0.1, 0.5, 1, 2, 4, 7, 11, 16];
const COLORS  = ['#4caf50','#66bb6a','#81c784','#4fc3f7','#29b6f6','#7c6af7','#9c6af7','#c06af7'];

function ellipsePath(level) {
  const pts = [];
  for (let i = 0; i <= 72; i++) {
    const angle = (i / 72) * 2 * Math.PI;
    const r = Math.sqrt(level);
    const w1 = 3 + r * Math.cos(angle);
    const w2 = 7 + r * Math.sin(angle);
    if (w1 < w1Min || w1 > w1Max || w2 < w2Min || w2 > w2Max) {
      pts.push(null);
    } else {
      pts.push(`${sw1(w1).toFixed(1)},${sw2(w2).toFixed(1)}`);
    }
  }
  // Split at nulls into M L sequences
  let d = '';
  let inPath = false;
  for (const pt of pts) {
    if (pt === null) { inPath = false; continue; }
    d += (inPath ? 'L' : 'M') + pt + ' ';
    inPath = true;
  }
  return d;
}

export default function GradienteViz() {
  const [pos, setPos] = useState({ w1: 0.5, w2: 4.5 });
  const [trail, setTrail] = useState([{ w1: 0.5, w2: 4.5 }]);
  const [running, setRunning] = useState(false);
  const runRef = useRef(false);
  const posRef = useRef(pos);

  function startDescent() {
    const start = { w1: 0.5, w2: 4.5 };
    posRef.current = start;
    setPos(start);
    setTrail([start]);
    runRef.current = true;
    setRunning(true);
  }

  useEffect(() => {
    if (!running) return;
    let cur = { ...posRef.current };
    const lr = 0.18;
    const step = () => {
      if (!runRef.current) return;
      const g1 = gw1(cur.w1);
      const g2 = gw2(cur.w2);
      cur = { w1: cur.w1 - lr * g1, w2: cur.w2 - lr * g2 };
      posRef.current = cur;
      setPos({ ...cur });
      setTrail(t => [...t, { ...cur }]);
      if (Math.abs(g1) > 0.08 || Math.abs(g2) > 0.08) {
        setTimeout(step, 120);
      } else {
        runRef.current = false;
        setRunning(false);
      }
    };
    setTimeout(step, 120);
    return () => { runRef.current = false; };
  }, [running]);

  const erro = f(pos.w1, pos.w2);

  return (
    <div className="viz-card">
      <div className="viz-title">Gradiente — mapa de contorno</div>
      <svg width={W} height={H}>
        {/* Contour lines */}
        {LEVELS.map((lv, i) => (
          <path key={lv} d={ellipsePath(lv)} fill="none"
            stroke={COLORS[i]} strokeWidth="1" opacity="0.5"/>
        ))}

        {/* Eixos */}
        <line x1={PAD} x2={W-PAD} y1={H-PAD} y2={H-PAD} stroke="#444" strokeWidth="1.5"/>
        <line x1={PAD} x2={PAD} y1={PAD} y2={H-PAD} stroke="#444" strokeWidth="1.5"/>
        {[0,2,4,6].map(v => (
          <text key={v} x={sw1(v)} y={H-PAD+15} fill="#555" fontSize="10" textAnchor="middle">{v}</text>
        ))}
        {[4,6,8,10].map(v => (
          <text key={v} x={PAD-6} y={sw2(v)+4} fill="#555" fontSize="10" textAnchor="end">{v}</text>
        ))}
        <text x={W/2} y={H-4} fill="#555" fontSize="10" textAnchor="middle">w₁</text>
        <text x={10} y={H/2} fill="#555" fontSize="10" textAnchor="middle" transform={`rotate(-90,10,${H/2})`}>w₂</text>

        {/* Trail */}
        {trail.length > 1 && (
          <polyline
            points={trail.map(p => `${sw1(p.w1).toFixed(1)},${sw2(p.w2).toFixed(1)}`).join(' ')}
            fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.7"
          />
        )}

        {/* Gradiente arrow */}
        {(() => {
          const g1 = gw1(pos.w1), g2 = gw2(pos.w2);
          const norm = Math.sqrt(g1**2 + g2**2) + 0.001;
          const scale = 0.5;
          const x1 = sw1(pos.w1), y1 = sw2(pos.w2);
          const x2 = sw1(pos.w1 + g1 * scale), y2 = sw2(pos.w2 + g2 * scale);
          return (
            <g>
              <defs>
                <marker id="arr" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L6,3 L0,6 Z" fill="#f44336"/>
                </marker>
              </defs>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f44336" strokeWidth="2" markerEnd="url(#arr)" opacity="0.8"/>
            </g>
          );
        })()}

        {/* Mínimo */}
        <circle cx={sw1(3)} cy={sw2(7)} r="5" fill="#4caf50" stroke="#0c0c0c" strokeWidth="2"/>
        <text x={sw1(3)+8} y={sw2(7)-4} fill="#4caf50" fontSize="10">mínimo</text>

        {/* Posição atual */}
        <circle cx={sw1(pos.w1)} cy={sw2(pos.w2)} r="5" fill="#fff" stroke="#7c6af7" strokeWidth="2"/>

        <text x={W-PAD} y={PAD+14} fill="#aaa" fontSize="11" textAnchor="end">
          erro = {erro.toFixed(3)}
        </text>
        <text x={W-PAD} y={PAD+27} fill="#666" fontSize="10" textAnchor="end">
          w1={pos.w1.toFixed(2)}, w2={pos.w2.toFixed(2)}
        </text>
      </svg>

      <div style={{ padding: '4px 12px 12px' }}>
        <button onClick={startDescent} disabled={running}
          style={{ fontSize: 12, background: '#7c6af7', border: 'none', color: '#fff', borderRadius: 5, padding: '4px 12px', cursor: 'pointer', opacity: running ? 0.5 : 1 }}>
          {running ? '▶ descendo...' : '▶ animar gradient descent'}
        </button>
        <span style={{ fontSize: 11, color: '#555', marginLeft: 8 }}>alvo: w1=3, w2=7</span>
      </div>
    </div>
  );
}
