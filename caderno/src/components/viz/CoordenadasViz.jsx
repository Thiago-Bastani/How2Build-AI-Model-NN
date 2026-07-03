const W = 300, H = 260;
const PAD = { top: 20, right: 20, bottom: 32, left: 36 };
const plotW = W - PAD.left - PAD.right;
const plotH = H - PAD.top - PAD.bottom;
const min = -2, max = 7;

function sx(x) { return PAD.left + ((x - min) / (max - min)) * plotW; }
function sy(y) { return PAD.top  + plotH - ((y - min) / (max - min)) * plotH; }

const PONTOS = [
  { x: 5, y: 3, color: '#7c6af7', label: '(5, 3)' },
  { x: 0, y: 0, color: '#4fc3f7', label: '(0, 0) — origem' },
];

export default function CoordenadasViz() {
  return (
    <div className="viz-card">
      <div className="viz-title">Plano Cartesiano</div>

      <svg width="100%" viewBox={`0 0 ${W} ${H}`}>
        {[-2,-1,0,1,2,3,4,5,6,7].map(v => (
          <line key={'h'+v} x1={PAD.left} x2={W-PAD.right} y1={sy(v)} y2={sy(v)} stroke="#181818" strokeWidth="1"/>
        ))}
        {[-2,-1,0,1,2,3,4,5,6,7].map(v => (
          <line key={'v'+v} x1={sx(v)} x2={sx(v)} y1={PAD.top} y2={PAD.top+plotH} stroke="#181818" strokeWidth="1"/>
        ))}

        <line x1={PAD.left} x2={W-PAD.right} y1={sy(0)} y2={sy(0)} stroke="#333" strokeWidth="1.5"/>
        <line x1={sx(0)} x2={sx(0)} y1={PAD.top} y2={PAD.top+plotH} stroke="#333" strokeWidth="1.5"/>
        <text x={W-PAD.right} y={sy(0)-6} fill="#555" fontSize="10" textAnchor="end">eixo x</text>
        <text x={sx(0)+6} y={PAD.top+8} fill="#555" fontSize="10">eixo y</text>

        {[1,2,3,4,5,6].map(v => (
          <text key={v} x={sx(v)} y={sy(0)+14} fill="#444" fontSize="9" textAnchor="middle">{v}</text>
        ))}
        {[1,2,3,4,5,6].map(v => (
          <text key={v} x={sx(0)-8} y={sy(v)+3} fill="#444" fontSize="9" textAnchor="end">{v}</text>
        ))}

        {/* Linhas guia até o ponto (5,3) */}
        <line x1={sx(5)} y1={sy(0)} x2={sx(5)} y2={sy(3)} stroke="#7c6af7" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
        <line x1={sx(0)} y1={sy(3)} x2={sx(5)} y2={sy(3)} stroke="#7c6af7" strokeWidth="1" strokeDasharray="3 2" opacity="0.5"/>
        <text x={sx(5)} y={sy(0)+24} fill="#7c6af7" fontSize="9" textAnchor="middle">5 no eixo x</text>
        <text x={sx(0)-8} y={sy(3)-8} fill="#7c6af7" fontSize="9" textAnchor="end">3 no eixo y</text>

        {PONTOS.map((p, i) => (
          <g key={i}>
            <circle cx={sx(p.x)} cy={sy(p.y)} r="5" fill={p.color} />
            <text x={sx(p.x) + 8} y={sy(p.y) - 8} fill={p.color} fontSize="11" fontWeight="bold">{p.label}</text>
          </g>
        ))}
      </svg>

      <div style={{ padding: '0 14px 14px', fontSize: 12, color: '#666' }}>
        ⬤ o ponto (5, 3) está 5 passos no eixo x e 3 passos no eixo y — as linhas tracejadas mostram de onde cada número vem.
      </div>
    </div>
  );
}
