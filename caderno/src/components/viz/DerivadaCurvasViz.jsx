// Mostra: f(x)=x² em cima e f'(x)=2x embaixo — mesma posição x, valores diferentes
// Cita o texto: "o expoente desce — x² vira 2x"

const W = 280, H = 260;
const PAD = { top: 16, right: 16, bottom: 20, left: 32 };
const plotW = W - PAD.left - PAD.right;
const halfH = (H - PAD.top - PAD.bottom) / 2 - 8;

const xMin = -3, xMax = 3;

function sxFn(x) { return PAD.left + ((x - xMin) / (xMax - xMin)) * plotW; }
function syTop(y, yMin, yMax) { return PAD.top + halfH - ((y - yMin) / (yMax - yMin)) * halfH; }
function syBot(y, yMin, yMax) { return PAD.top + halfH + 24 + halfH - ((y - yMin) / (yMax - yMin)) * halfH; }

function makePath(fn, syFn, yMin, yMax) {
  return Array.from({ length: 101 }, (_, i) => {
    const x = xMin + (i / 100) * (xMax - xMin);
    const y = Math.max(yMin, Math.min(yMax, fn(x)));
    return `${i === 0 ? 'M' : 'L'}${sxFn(x).toFixed(1)},${syFn(y, yMin, yMax).toFixed(1)}`;
  }).join(' ');
}

export default function DerivadaCurvasViz() {
  const fPath  = makePath(x => x*x,  syTop, 0, 9);
  const dfPath = makePath(x => 2*x,  syBot, -7, 7);

  const midY = PAD.top + halfH + 12;

  return (
    <div className="viz-card">
      <div className="viz-title">x² e sua derivada 2x</div>
      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {/* ── TOPO: f(x) = x² ── */}
        <line x1={PAD.left} x2={W-PAD.right} y1={syTop(0,0,9)} y2={syTop(0,0,9)} stroke="#2a2a2a" strokeWidth="1"/>
        <line x1={sxFn(0)} x2={sxFn(0)} y1={PAD.top} y2={PAD.top+halfH} stroke="#2a2a2a" strokeWidth="1"/>
        <path d={fPath} fill="none" stroke="#7c6af7" strokeWidth="2.5"/>
        <text x={PAD.left+4} y={PAD.top+13} fill="#7c6af7" fontSize="10" fontWeight="bold">f(x) = x²</text>
        <text x={PAD.left+4} y={PAD.top+24} fill="#555" fontSize="9">a curva original</text>

        {/* Separador */}
        <line x1={PAD.left} x2={W-PAD.right} y1={midY} y2={midY} stroke="#1e1e1e" strokeWidth="1" strokeDasharray="4 3"/>
        <text x={W/2} y={midY+10} fill="#333" fontSize="9" textAnchor="middle">↓ derivada (x² → 2x)</text>

        {/* ── BAIXO: f'(x) = 2x ── */}
        <line x1={PAD.left} x2={W-PAD.right} y1={syBot(0,-7,7)} y2={syBot(0,-7,7)} stroke="#2a2a2a" strokeWidth="1"/>
        <line x1={sxFn(0)} x2={sxFn(0)} y1={midY+18} y2={H-PAD.bottom} stroke="#2a2a2a" strokeWidth="1"/>
        <path d={dfPath} fill="none" stroke="#f44336" strokeWidth="2.5"/>
        <text x={PAD.left+4} y={midY+30} fill="#f44336" fontSize="10" fontWeight="bold">f'(x) = 2x</text>
        <text x={PAD.left+4} y={midY+41} fill="#555" fontSize="9">a derivada — uma reta</text>

        {/* Labels eixo x (somente na curva de baixo) */}
        {[-2,-1,0,1,2].map(v => (
          <text key={v} x={sxFn(v)} y={H-PAD.bottom+12} fill="#3a3a3a" fontSize="9" textAnchor="middle">{v}</text>
        ))}

        {/* Linha vertical em x=2 mostrando correspondência */}
        <line x1={sxFn(2)} x2={sxFn(2)} y1={PAD.top} y2={H-PAD.bottom}
          stroke="#4caf50" strokeWidth="1" strokeDasharray="3 2" opacity="0.6"/>
        <circle cx={sxFn(2)} cy={syTop(4,0,9)} r="4" fill="#4caf50"/>
        <circle cx={sxFn(2)} cy={syBot(4,-7,7)} r="4" fill="#4caf50"/>
        <text x={sxFn(2)-6} y={syTop(4,0,9)-6} fill="#4caf50" fontSize="9" textAnchor="end">x=2: inclinação=4</text>
        <text x={sxFn(2)-6} y={syBot(4,-7,7)+4} fill="#4caf50" fontSize="9" textAnchor="end">f'(2)=4 ✓</text>
      </svg>
    </div>
  );
}
