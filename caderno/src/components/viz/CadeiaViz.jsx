// Visualização: fluxo do backpropagation pela regra da cadeia
import { useState } from 'react';

const STEPS = [
  { id: 'x',    label: 'x',      desc: 'entrada',                color: '#4fc3f7', val: '2.0' },
  { id: 'z',    label: 'z=wx+b', desc: 'combinação linear',      color: '#7c6af7', val: '1.1' },
  { id: 'y_hat',label: 'ŷ=σ(z)', desc: 'ativação (sigmoid)',    color: '#9c6af7', val: '0.75' },
  { id: 'L',    label: 'L=(ŷ−y)²', desc: 'função de custo',    color: '#f44336', val: '0.56' },
];

const GRADS = [
  { from: 'L',     to: 'y_hat', label: '∂L/∂ŷ',   val: '−0.50', color: '#f44336' },
  { from: 'y_hat', to: 'z',     label: '∂ŷ/∂z',   val: '0.187',  color: '#c06af7' },
  { from: 'z',     to: 'w',     label: '∂z/∂w = x', val: '2.0',  color: '#7c6af7' },
];

export default function CadeiaViz() {
  const [activeStep, setActiveStep] = useState(null);
  const [showBack, setShowBack] = useState(false);

  const W = 300, H = 320;
  const nodeW = 80, nodeH = 40;
  const cx = W / 2;
  const ys = [40, 110, 190, 270];

  return (
    <div className="viz-card">
      <div className="viz-title">Regra da Cadeia — backpropagation</div>
      <svg width={W} height={H}>
        {/* Forward arrows */}
        {STEPS.slice(0, -1).map((s, i) => (
          <line key={i}
            x1={cx} y1={ys[i] + nodeH}
            x2={cx} y2={ys[i+1]}
            stroke="#2a2a2a" strokeWidth="2"
            markerEnd="url(#fwd)"
          />
        ))}

        <defs>
          <marker id="fwd" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
            <path d="M0,0 L8,4 L0,8 Z" fill="#2a2a2a"/>
          </marker>
          <marker id="bwd" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto-start-reverse">
            <path d="M0,0 L8,4 L0,8 Z" fill="#f44336"/>
          </marker>
        </defs>

        {/* Backward arrows */}
        {showBack && GRADS.map((g, i) => {
          const fromIdx = STEPS.findIndex(s => s.id === g.from);
          const toIdx   = STEPS.findIndex(s => s.id === g.to);
          const yFrom   = ys[fromIdx] + nodeH / 2;
          const yTo     = ys[toIdx]   + nodeH / 2;
          const xOff    = cx + nodeW / 2 + 18;
          return (
            <g key={i}>
              <line x1={xOff} y1={yFrom} x2={xOff} y2={yTo}
                stroke={g.color} strokeWidth="2" opacity="0.8"
                markerEnd="url(#bwd)"
              />
              <rect x={xOff + 4} y={(yFrom + yTo) / 2 - 10} width={62} height={20}
                rx="4" fill="#111" stroke={g.color} strokeWidth="1" opacity="0.9"/>
              <text x={xOff + 35} y={(yFrom + yTo) / 2 + 4}
                fill={g.color} fontSize="10" textAnchor="middle">{g.label} = {g.val}</text>
            </g>
          );
        })}

        {/* Nodes */}
        {STEPS.map((s, i) => (
          <g key={s.id} style={{ cursor: 'pointer' }} onClick={() => setActiveStep(activeStep === s.id ? null : s.id)}>
            <rect x={cx - nodeW/2} y={ys[i]} width={nodeW} height={nodeH}
              rx="8" fill={activeStep === s.id ? s.color : '#1a1a1a'}
              stroke={s.color} strokeWidth="2"
            />
            <text x={cx} y={ys[i] + 15} fill={activeStep === s.id ? '#fff' : s.color}
              fontSize="12" textAnchor="middle" fontFamily="monospace" fontWeight="bold">
              {s.label}
            </text>
            <text x={cx} y={ys[i] + 29} fill={activeStep === s.id ? '#fff' : '#555'}
              fontSize="9" textAnchor="middle">
              {s.desc}
            </text>
          </g>
        ))}

        {/* Labels do lado esquerdo */}
        {STEPS.map((s, i) => (
          <text key={s.id} x={cx - nodeW/2 - 8} y={ys[i] + 24}
            fill="#333" fontSize="10" textAnchor="end">
            = {s.val}
          </text>
        ))}

        {/* Label "backward" */}
        {showBack && (
          <text x={cx + nodeW/2 + 100} y={H/2} fill="#f44336" fontSize="10"
            textAnchor="middle" transform={`rotate(-90, ${cx + nodeW/2 + 100}, ${H/2})`}>
            ← backward pass
          </text>
        )}
      </svg>

      <div style={{ padding: '0 16px 12px', display: 'flex', gap: 8 }}>
        <button onClick={() => setShowBack(!showBack)}
          style={{ fontSize: 12, background: showBack ? '#f44336' : '#1a1a1a', border: `1px solid ${showBack ? '#f44336' : '#333'}`, color: showBack ? '#fff' : '#888', borderRadius: 5, padding: '4px 12px', cursor: 'pointer' }}>
          {showBack ? '← backward pass ativo' : 'mostrar backward pass'}
        </button>
      </div>

      {activeStep && (() => {
        const s = STEPS.find(x => x.id === activeStep);
        return (
          <div style={{ margin: '0 16px 12px', padding: '8px 12px', background: '#111', borderRadius: 6, fontSize: 12, color: '#aaa', borderLeft: `3px solid ${s.color}` }}>
            <strong style={{ color: s.color }}>{s.label}</strong> — {s.desc}
          </div>
        );
      })()}
    </div>
  );
}
