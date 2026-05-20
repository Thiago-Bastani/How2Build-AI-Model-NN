// Mostra: mapa de contorno de f(x,y)=x²+y², setas de ∂f/∂x e ∂f/∂y separadas, e o gradiente
// Cita: "derivada parcial — uma direção de cada vez"
import { useState } from 'react';

const W = 280, H = 280;
const PAD = { top: 20, right: 20, bottom: 32, left: 36 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;
const xMin = -3, xMax = 3, yMin = -3, yMax = 3;

function sx(v) { return PAD.left + ((v - xMin) / (xMax - xMin)) * plotW; }
function sy(v) { return PAD.top  + plotH - ((v - yMin) / (yMax - yMin)) * plotH; }

const LEVELS = [0.5, 1, 2, 4, 7];
const COLORS  = ['#4caf50','#81c784','#4fc3f7','#7c6af7','#c06af7'];

function circlePath(r) {
  const pts = [];
  for (let i = 0; i <= 72; i++) {
    const a = (i / 72) * 2 * Math.PI;
    const x = r * Math.cos(a), y = r * Math.sin(a);
    if (x < xMin || x > xMax || y < yMin || y > yMax) { pts.push(null); continue; }
    pts.push(`${sx(x).toFixed(1)},${sy(y).toFixed(1)}`);
  }
  let d = '', pen = false;
  for (const pt of pts) {
    if (!pt) { pen = false; continue; }
    d += (pen ? 'L' : 'M') + pt + ' '; pen = true;
  }
  return d;
}

export default function GradienteViz() {
  const [px, setPx] = useState(2);
  const [py, setPy] = useState(1.5);
  // f(x,y) = x² + y²  →  ∂f/∂x = 2x,  ∂f/∂y = 2y
  const gx = 2 * px;
  const gy = 2 * py;
  const scale = 0.3;

  return (
    <div className="viz-card">
      <div className="viz-title">Derivadas Parciais e Gradiente</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        <defs>
          {['gx','gy','grad'].map(id => (
            <marker key={id} id={id} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M0,0 L6,3 L0,6 Z" fill={id==='gx'?'#4fc3f7':id==='gy'?'#f44336':'#fff'}/>
            </marker>
          ))}
        </defs>

        {/* Anéis — cada anel = mesmo valor de f */}
        {LEVELS.map((lv, i) => (
          <path key={lv} d={circlePath(Math.sqrt(lv))} fill="none"
            stroke={COLORS[i]} strokeWidth="1.2" opacity="0.5"/>
        ))}

        {/* Label dos anéis */}
        <text x={sx(0.15)} y={sy(0.15)} fill="#4caf50" fontSize="8" textAnchor="middle">0</text>
        <text x={W-PAD.right-2} y={PAD.top+10} fill="#555" fontSize="8" textAnchor="end">cada anel = mesmo f(x,y)</text>

        {/* Eixos */}
        <line x1={PAD.left} x2={W-PAD.right} y1={sy(0)} y2={sy(0)} stroke="#333" strokeWidth="1.5"/>
        <line x1={sx(0)} x2={sx(0)} y1={PAD.top} y2={PAD.top+plotH} stroke="#333" strokeWidth="1.5"/>
        <text x={W-PAD.right+2} y={sy(0)+4} fill="#444" fontSize="9">x</text>
        <text x={sx(0)+4} y={PAD.top+8} fill="#444" fontSize="9">y</text>

        {/* Seta ∂f/∂x — só se move em x */}
        <line
          x1={sx(px)} y1={sy(py)}
          x2={sx(px + gx*scale)} y2={sy(py)}
          stroke="#4fc3f7" strokeWidth="2" markerEnd="url(#gx)"/>
        <text x={sx(px + gx*scale/2)} y={sy(py)-7}
          fill="#4fc3f7" fontSize="9" textAnchor="middle">∂f/∂x={gx.toFixed(1)}</text>

        {/* Seta ∂f/∂y — só se move em y */}
        <line
          x1={sx(px)} y1={sy(py)}
          x2={sx(px)} y2={sy(py + gy*scale)}
          stroke="#f44336" strokeWidth="2" markerEnd="url(#gy)"/>
        <text x={sx(px)+6} y={sy(py + gy*scale/2)}
          fill="#f44336" fontSize="9">∂f/∂y={gy.toFixed(1)}</text>

        {/* Seta do gradiente combinado */}
        <line
          x1={sx(px)} y1={sy(py)}
          x2={sx(px + gx*scale)} y2={sy(py + gy*scale)}
          stroke="#fff" strokeWidth="2.5" markerEnd="url(#grad)" opacity="0.9"/>
        <text x={sx(px + gx*scale)+4} y={sy(py + gy*scale)-4}
          fill="#fff" fontSize="9" fontWeight="bold">∇f</text>

        {/* Ponto */}
        <circle cx={sx(px)} cy={sy(py)} r="5" fill="#fff" stroke="#0c0c0c" strokeWidth="2"/>

        {/* Legenda */}
        <rect x={PAD.left+1} y={H-PAD.bottom-30} width={162} height={28} rx="4" fill="#0c0c0c" opacity="0.9"/>
        <circle cx={PAD.left+10} cy={H-PAD.bottom-20} r="3" fill="#4fc3f7"/>
        <text x={PAD.left+16} y={H-PAD.bottom-16} fill="#4fc3f7" fontSize="8">∂f/∂x — só x muda</text>
        <circle cx={PAD.left+10} cy={H-PAD.bottom-8} r="3" fill="#f44336"/>
        <text x={PAD.left+16} y={H-PAD.bottom-4} fill="#f44336" fontSize="8">∂f/∂y — só y muda</text>
      </svg>

      <div style={{ padding: '4px 12px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 11, color: '#555' }}>
          x = <strong style={{ color: '#4fc3f7' }}>{px.toFixed(1)}</strong>
        </label>
        <input type="range" min={-2.5} max={2.5} step={0.1} value={px}
          onChange={e => setPx(+e.target.value)}
          style={{ width: '100%', accentColor: '#4fc3f7' }} />
        <label style={{ fontSize: 11, color: '#555' }}>
          y = <strong style={{ color: '#f44336' }}>{py.toFixed(1)}</strong>
        </label>
        <input type="range" min={-2.5} max={2.5} step={0.1} value={py}
          onChange={e => setPy(+e.target.value)}
          style={{ width: '100%', accentColor: '#f44336' }} />
      </div>
    </div>
  );
}
